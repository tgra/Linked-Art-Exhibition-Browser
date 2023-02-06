
const fs = require('fs')

const data_dir = "/Users/tanya/Documents/Code/exhibition-browser-2023/data"


export async function GetExsStartdateNonmoma() {


    let file =  data_dir + "/summary/activity/events_nonmoma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result) 
    return exList
}
export async function GetExsStartdateMoma() {


    let file =  data_dir + "/summary/activity/events_moma_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result) 
    return exList
}

export async function GetExsOrganisation() {

    let file =  data_dir + "/summary/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    return (result)
}

export async function GetExsSelectedOrganisation(org) {

   
    let file =  data_dir + "/summary/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let events = result.events[org]

    
   


    return ({"events":events})
}

export async function GetExsOrganisationAll() {

    let file =  data_dir + "/summary/events_all_org.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    let orgs = Object.keys(result.counter)

    return (orgs)
}



export async function GetExsStartDate() {

    let file =  data_dir + "/summary/events_all_startdate.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    return (result)
}

export async function GetExs() {
    let file =  data_dir + "/summary/events_all.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exList = (result.events)
    return exList
}

export async function GetEx(id) {
    let file = data_dir + "/activity/" + id + ".json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const exData = (result) 
    return exData
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