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
    let file = data_dir + "/summary/events_all.json"
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

    let file = data_dir + "/summary/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    return (result)
}

export async function GetExsSelectedOrganisation(org) {


    let file = data_dir + "/summary/events_all_org.json"
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

    let file = data_dir + "/summary/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    let orgs = Object.keys(result.counter)

    return (orgs)
}



export async function GetExsStartDate() {

    let file = data_dir + "/summary/events_all_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    return (result)
}


/*

export async function GetEx(id) {
    let file = data_dir + "/activity/" + id + ".json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exData: ExData = (result) as ExData
    return exData
}

export async function GetExs() {
    let file =  data_dir + "/summary/events_all.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result.events)
    return exList
}

export async function GetExsStartdateNonmoma() {

   
    let file =  data_dir +c"/summary/events_nonmoma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExData[] = (result) as ExData[]
    return exList
}

export async function GetExsStartdate(dataset): Promise<ExData[]> {

    let file = "../data/summary/events_" + dataset + "_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExData[] = (result) as ExData[]
    return exList
}




export async function GetExsStartdate2(): Promise<ExData[]> {

    
    let file = "../data/summary/events_all_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExData[] = (result) as ExData[]
    return exList
}



export async function GetExsTitleAsc(): Promise<ExSummaryData[]> {
    let file = "../data/summary/events_title_asc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExSummaryData[] = (result.events) as ExSummaryData[]
    return exList
}

export async function GetExsTitleDsc(): Promise<ExSummaryData[]> {
    let file = "../data/summary/events_title_dsc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExSummaryData[] = (result.events) as ExSummaryData[]
    return exList
}


export async function GetExsStartDateByYearMonth( year:string, month:string): Promise<ExSummaryData[]> {

   // let file = "../data/summary/events_" + year + "_" + month + "_" + order + ".json"

    let file = "../data/summary/events_all.json"
    let rawdata = fs.readFileSync(file)
    let result = JSON.parse(rawdata)
    let events = result.events

    let list_events = []
    for (var i = 0; i < events.length; i++){
        var event = events[i];
        let start = event.start
        let year_event = start.split("-")[0]
        let month_event = start.split("-")[1]
        if (year_event == year && month_event == month){ 
            list_events.push(event)
         }      

    }

    const exList: ExSummaryData[] = (list_events) as ExSummaryData[]
    return exList
}


export async function GetExsStartDateByYear(year:string): Promise<ExSummaryData[]> {

     let file = "../data/summary/events_all.json"
     let rawdata = fs.readFileSync(file)
     let result = JSON.parse(rawdata)
     let events = result.events
     let list_events = []

     for (var i = 0; i < events.length; i++){
         if (events[i].start.split("-")[0] == year){ 
             list_events.push(events[i])
          }}

    
 
     const exList: ExSummaryData[] = (list_events) as ExSummaryData[]
     return exList
 }
 


export async function GetExhibitionStartDateYears(): Promise<any[]> {
        let file = "../data/summary/events_all.json"
        let rawdata = fs.readFileSync(file);
        let result = JSON.parse(rawdata);
 
        let years = []
        for (var i = 0; i < result.events.length; i++){
            var event = result.events[i];
            let start = event.start
            let year = start.split("-")[0]
            if (years.includes(year) == false){ years.push(year) }      
    }
        return years 
    }

    export async function GetExhibitionStartDateYearMonths(): Promise<any[]> {
        let file = "../data/summary/events_all.json"
        let rawdata = fs.readFileSync(file);
        let result = JSON.parse(rawdata);
 
       
        const uniqueMonths = new Set();
        result.events.start.forEach((timestamp) => {
            const date = new Date(parseInt(timestamp));  
            uniqueMonths.add(`${date.getFullYear()}-${date.getMonth()}`);
            });
        let uniqueMonthsArray = Array.from(uniqueMonths)
        return uniqueMonthsArray
     
    }   

export async function GetExsStartAsc(): Promise<ExSummaryData[]> {
    let file = "../data/summary/events_start_asc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExSummaryData[] = (result.events) as ExSummaryData[]
    return exList
}


export async function GetExsStartDsc(): Promise<ExSummaryData[]> {
    let file = "../data/summary/events_start_dsc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExSummaryData[] = (result.events) as ExSummaryData[]
    return exList
}



export async function GetExsNonMomaStartAsc(): Promise<ExSummaryData[]> {
    let file = "../data/summary/events_nonmoma_start_asc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExSummaryData[] = (result.events) as ExSummaryData[]
    return exList
}

export async function GetExsNonMomaStartDsc(): Promise<ExSummaryData[]> {
    let file = "../data/summary/events_nonmoma_start_dsc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList: ExSummaryData[] = (result.events) as ExSummaryData[]
    return exList
}
*/