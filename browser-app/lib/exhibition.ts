const fs = require('fs')

// directory that contains the data files inc original jsonld files and summary files generated with jupyter notebooks


const data_dir = "../data"

const ex_file_dir = data_dir + "/activity/"
const summary_dir = data_dir + "/summary"
const person_dir = summary_dir + "/persons/"
const person_file_prefix = person_dir + "persons_"
const persons_all = person_file_prefix + "all.json"

const activity_dir = summary_dir + "/activity/"
const activity_file_prefix = activity_dir + "events_"
const activity_all = activity_file_prefix + "all.json"



// return jsonld file for exhibition using selected exhibition id
export async function GetEx(id) {

    // file is located in an activity sub-directory and has a filename == exhibition identifer 
    // that has been extracted from @id property
    let filepath = ex_file_dir + id + ".json"

    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);

    } catch (err) {
        console.error(err);
        return {}
    }
}

export async function GetExs() {
    
    let rawdata = fs.readFileSync(activity_all);
    let result = JSON.parse(rawdata);
    const exList = (result.events)
    return exList
}


export async function GetExInfluencers(id) {

    let filepath = ex_file_dir + id + ".json"

    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let exData = JSON.parse(data);

        let person_list = exData.influenced_by

        person_list = person_list.sort(function (first, second) {
            let a = second._label.split(" ").pop()
            let b = first._label.split(" ").pop()
            if (a > b) { return -1; }
            if (b > a) { return 1; }
            return 0;
        })

        let person_list_letter = {}

        person_list.forEach(function (person) {
            let person_letter = person._label.split(" ").pop().split("")[0]

            if (person_list_letter[person_letter] == undefined) {
                person_list_letter[person_letter] = []
            }
            person_list_letter[person_letter].push(person)
        })

        return person_list_letter

    } catch (err) {
        console.error(err);
        return {"persons": []}
    }

}


/**
 * 
 * @param id 
 * @returns list of people who influenced an exhibition eg artist
 */

export async function GetExInfluencersIds(id) {

    let filepath = ex_file_dir + id + ".json"

    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let exData = JSON.parse(data);

        let person_list = exData.influenced_by
        let id_list = []

        person_list.forEach(function (person) {  
            id_list.push(person.id.toLowerCase())
        })

        return id_list

    } catch (err) {
        console.error(err);
        return []
    }

}




/**
 * 
 * @returns exhibitions run by non-moma orgs grouped by start date
 * 
 */

export async function GetExsStartdateNonmoma() {

    let file = activity_file_prefix + "nonmoma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result)
    return exList
}

/**
 * 
 * @returns exhibitions organised by moma grouped by start date
 * 
 */
export async function GetExsStartdateMoma() {

    let file = activity_file_prefix + "moma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result)
    return exList
}

/**
 * 
 * @returns return exhibition list for all organisations
 * 
 */
export async function GetExsOrganisation() {

    let file = activity_file_prefix + "all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    return (result)
}

/**
 * 
 * @param org 
 * 
 * @returns exhibition list for a selected organisation
 */
export async function GetExsSelectedOrganisation(org) {

    let file = activity_file_prefix + "all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let events = result.events[org]

    return ({ "events": events })
}


/**
 * 
 * @param event_id - uri - exhibition identifer
 * 
 * @returns dictionary of exhibitions grouped by location that were running at time that overlapped with selected exhibition
 */
export async function GetExsSameDate(event_id) {

    let file = activity_file_prefix + "co.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    for (var i = 0; i < result.length; i++) {
        var event_list = Object.entries(result[i])
        var ev_id = Object.keys(result[i]).toString().split("/").pop();

        if (event_id == ev_id) {

            var return_dict = {}

            var events = Object.values(event_list)[0][1]
            for (var j = 0; j < events.length; j++) {
                let location = events[j].location

                if (return_dict[location] == undefined) {
                    return_dict[location] = []
                }
                return_dict[location].push(events[j])
            }
            return return_dict
        }

    }

    return []
}


/**
 * 
 * @returns list of organisation names
 * 
 */
export async function GetExsOrganisationAll() {

    let file = activity_file_prefix + "all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    let orgs = Object.keys(result.counter)
    return (orgs)
}



export async function GetExsStartDate() {

    let file = activity_file_prefix + "all_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    return (result)
}

