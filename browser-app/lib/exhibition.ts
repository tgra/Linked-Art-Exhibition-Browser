const fs = require('fs')

// directory that contains the data files inc original jsonld files and summary files generated with jupyter notebooks
const data_dir = "../data"


// return jsonld file for exhibition using selected exhibition id
export async function GetEx(id) {

    // file is located in an activity sub-directory and has a filename == exhibition identifer 
    // that has been extracted from @id property
    let filepath = data_dir + "/activity/" + id + ".json"

    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);

    } catch (err) {
        console.error(err);
        return {}
    }
}

export async function GetExs() {
    let file = data_dir + "/summary/activity/events_all.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result.events)
    return exList
}


export async function GetExInfluencers(id) {

    let filepath = data_dir + "/activity/" + id + ".json"

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


export async function GetExInfluencersIds(id) {

    let filepath = data_dir + "/activity/" + id + ".json"

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










export async function GetExsStartdateNonmoma() {

    let file = data_dir + "/summary/activity/events_nonmoma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result)
    return exList
}
export async function GetExsStartdateMoma() {


    let file = data_dir + "/summary/activity/events_moma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result)
    return exList
}

export async function GetExsOrganisation() {

    let file = data_dir + "/summary/activity/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    return (result)
}

export async function GetExsSelectedOrganisation(org) {


    let file = data_dir + "/summary/activity/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let events = result.events[org]

    return ({ "events": events })
}

export async function GetExsSameDate(event_id) {

    let file = data_dir + "/summary/activity/ex_co.json"
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



export async function GetExsOrganisationAll() {

    let file = data_dir + "/summary/activity/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    let orgs = Object.keys(result.counter)

    return (orgs)
}



export async function GetExsStartDate() {

    let file = data_dir + "/summary/activity/events_all_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    return (result)
}

