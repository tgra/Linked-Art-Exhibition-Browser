import { eventNames } from 'process';

const fs = require('fs')

const data_dir = "../data"



const persons_all = data_dir + "/summary/persons/persons_all.json"


const summary_dir = "/summary/"

const person_dir = "/persons"

const persons_all_born = data_dir + "/summary/persons/persons_all_born.json"

export async function GetPersons() {
    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList = (result.persons)
    return personList
}


export async function GetExInfluencersSummaryData(id_list ) {

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const person_list_all = (result.persons)

    let person_list_selected = {}
   
    person_list_all.forEach(function(person) {
        let person_id = person.id

        let letter = person.name.split("")[0]

        if (person_list_selected[letter] == undefined){
            person_list_selected[letter] = []
        }
        
        if (id_list.includes(person_id)){
            person_list_selected[letter].push(person)
            }
        })
    return person_list_selected


}

export async function GetPersonsByEx(exid) {

    let person_list = []
    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    result.persons.forEach(function (person) {
        
        if ("exhibitions" in person) {
            person.exhibitions.forEach(function (ex) {
                let id = ex.id.split("/").pop()
                if (id == exid) { person_list.push(person) }
            })
        }
    })

    person_list = person_list.sort(function (first, second) {
        let a = second.name
        let b = first.name
        if (a > b) { return -1; }
        if (b > a) { return 1; }
        return 0;
    })

    let person_list_letter = {}

    person_list.forEach(function (person) {
        let person_letter = person.name.split("")[0]

        if (person_list_letter[person_letter] == undefined){
            person_list_letter[person_letter] = []
        }
        person_list_letter[person_letter].push(person)
        

    })
    



    return person_list_letter
}


export async function GetPersonsByBirthYear(year) {
    let file = persons_all_born
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    if (year == "") {
        return result.count
    }

    if (result.persons[year] == undefined) {
        return {}
    }

    return result.persons[year]
}


// return list of all birth years in dataset

export async function GetPersonsBirthYearAll() {
    let file = persons_all_born
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


   
    return Object.keys(result.count)

    

}
    


// GetPersonsByNationalityBirthYear
export async function GetPersonsByNationalityBirthYear(nationality) {
    let file = data_dir + "/summary/persons/persons_" + nationality.toLowerCase() + "_born.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    return (result)


}



export async function GetPersonsByDatasetBirthYear(dataset) {
    let file = data_dir + "/summary/persons/persons_" + dataset + "_born.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    return (result)


}

// GetPersonSummary, GetPerson, GetPersonIDs





export async function GetPerson(id) {

    let file = data_dir + "/person/" + id + ".json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    return (result)
}



export async function GetPersonSummary(id) {

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    result.persons.forEach(function (person) {
        if (person["id"].split("/").pop().toUpperCase() == id.toUpperCase()) {
            return person
        }
    })
    return {}
}

export async function GetPersonIDs() {
    var ids = []

    let fpath = persons_all
    let rawdata = fs.readFileSync(fpath)
    let result = JSON.parse(rawdata)

    result.persons.forEach(function (person) {
        if ("id" in person) {
            let id = person.id.split("/").pop()
            if (id != "") {
                ids.push(id)
            }
        }
    })


    return (ids)
}



export async function GetPersonsByNationalitySelected(nationality_selected) {

    let nationality_list = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let count = {}

    for (var idx in result.persons) {
        let person = result.persons[idx]
        let nationality = person["nationality"]

        if (nationality == undefined || nationality == "" || nationality !== nationality_selected) {
            continue
        }
        
        nationality_list.push(person)
    }

    return ({ persons: nationality_list})
}






export async function GetPersonsByNationality() {

    let nationality_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let count = {}

    for (var idx in result.persons) {
        let person = result.persons[idx]

        let nationality = person["nationality"]

        if (nationality == undefined || nationality == "") {
            continue
        }
        if (["American"].includes(nationality)) {
            continue
        }

        if (nationality_dict[nationality] == undefined) {
            nationality_dict[nationality] = []
        }

        if (count[nationality] == undefined) {
            count[nationality] = 0
        }
        count[nationality] += 1
        nationality_dict[nationality].push(person)


    }

    return ({count: count, persons: nationality_dict})
}


// GetPersonsSurnameByLetter

export async function GetPersonsSurnameLetterUS() {

    let lang_list = ["American"]
    let name_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let count = {}
    for (var idx in result.persons) {
        let person = result.persons[idx]

        let name = person["name"]
        let nationality = person["nationality"]
        if (nationality == undefined || nationality == "") {
            continue
        }
        let value = name.split("")[0]

        if (value == undefined || value == "") {
            continue
        }
        if (lang_list.includes(nationality) == false) {
            continue
        }

        
        if (name_dict[value] == undefined) {
            name_dict[value] = []
            count[value] = 0
        }
        count[value] += 1
        name_dict[value].push(person)

    }

    Object.entries(name_dict).forEach(function([letter,person_list]){

        let person_list_ordered = person_list.sort(function (first, second) {
            let a = second.name
            let b = first.name
            if (a > b) { return -1; }
            if (b > a) { return 1; }
            return 0;
        })

        name_dict[letter] = person_list_ordered

    })
  
   

    return ({count:count, persons:name_dict})
}

export async function GetPersonsSurnameLetterNonUS() {

    let lang_list = ["American"]
    let name_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let count = {}
    for (var idx in result.persons) {
        let person = result.persons[idx]

        let name = person["name"]
        let nationality = person["nationality"]
        if (nationality == undefined || nationality == "") {
            continue
        }
        let value = name.split("")[0]

        if (value == undefined || value == "") {
            continue
        }
        if (lang_list.includes(nationality) == true) {
            continue
        }


        if (count[value] == undefined) {
            count[value] = 0
        }

        count[value] += 1
        
        if (name_dict[value] == undefined) {
            name_dict[value] = []
        }
        name_dict[value].push(person)
    }

    Object.entries(name_dict).forEach(function([letter,person_list]){

        let person_list_ordered = person_list.sort(function (first, second) {
            let a = second.name
            let b = first.name
            if (a > b) { return -1; }
            if (b > a) { return 1; }
            return 0;
        })

        name_dict[letter] = person_list_ordered

    })
  

    return ({count:count, persons:name_dict})
}

//  GetPersonSurnamesFirstLetter






export async function GetPersonSurnamesFirstLetter() {

    let file = data_dir + "/summary/persons/persons_all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    let alphabet = [];

    let counter = {}

    for (var surname in result.persons) {
        let first_letter = surname.split("")[0]

        if (counter[first_letter] == undefined){
            counter[first_letter] = 0
        }

        counter[first_letter] +=1

        alphabet.push(first_letter)

    }

    alphabet = alphabet.filter((v, i, a) => a.indexOf(v) == i)
    alphabet.sort()


    return {count:counter, alphabet: alphabet}




}




export async function GetPersonsSurnameByLetter(letter) {

    let file = data_dir + "/summary/persons/persons_all_surname.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    if (letter == "") {
        return result
    }

    if (result.persons[letter] == undefined) {
        return {}
    }

    return result.persons[letter]
}





// GetPersonSurnamesAll, GetPersonsBySurname


export async function GetPersonSurnamesAll() {

    let file = data_dir + "/summary/persons/persons_all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let surnames_list = Object.keys(result.persons)

    return surnames_list
}



export async function GetPersonsBySurname(surname) {

    let file = data_dir + "/summary/persons/persons_all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    if (surname == "") {
        return result
    }

    if (result.persons[surname] == undefined) {
        return {}
    }

    return result.persons[surname]
}


// GetPersonSummary, GetPerson, GetPersonIDs



// =================


/*






export async function GetPersons(): Promise<PersonData[]> {
    let file = "../data/summary/persons_all.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList: PersonData[] = (result.persons) as PersonData[]
    return personList
}


export async function GetPersonSummary(id: string): Promise<PersonData[]> {
    let file = "../data/summary/persons_all.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    let persons = []

    result.persons.forEach(function (person) {
        if (person["id"].split("/").pop().toUpperCase() == id.toUpperCase()) {
            persons.push(person)
        }
    })

    const personList: PersonData[] = (persons) as PersonData[]
    return personList
}

function extractNumber(entity: any) {
    return entity.id.split("/").pop()

}

export async function GetPersonIDs(): Promise<PersonData[]> {
    let files = ["persons_total_exhibitions_desc.json", "persons_born_asc.json", "persons_born_desc.json",
        "persons_died_asc.json", "persons_died_desc.json"]

    var persons_all = []
    files.forEach(function (f) {
        let fpath = "../data/summary/" + f
        let rawdata = fs.readFileSync(fpath)
        let result = JSON.parse(rawdata)
        result.persons.forEach(function (person) {
            // get first letter of surname
            if ("id" in person) { persons_all.push(person) }
        })


    })

    const personList: PersonData[] = (persons_all) as PersonData[]


    return personList
}


export async function GetPersonsTotalExDsc(): Promise<PersonSummaryData[]> {
    let file = "../data/summary/persons_total_exhibitions_desc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList: PersonSummaryData[] = (result.persons) as PersonSummaryData[]
    return personList
}


export async function GetPersonsBornAsc(): Promise<PersonSummaryData[]> {
    let file = "../data/summary/persons_born_asc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList: PersonSummaryData[] = (result.persons) as PersonSummaryData[]
    return personList
}

export async function GetPersonsBornDsc(): Promise<PersonSummaryData[]> {

    let file = "../data/summary/persons_born_desc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    const personList: PersonSummaryData[] = (result.persons) as PersonSummaryData[]

    return personList
}



export async function GetPersonsDiedAsc(): Promise<PersonSummaryData[]> {
    let file = "../data/summary/persons_died_asc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList: PersonSummaryData[] = (result.persons) as PersonSummaryData[]
    return personList
}

export async function GetPersonsDiedDsc(): Promise<PersonSummaryData[]> {
    let file = "../data/summary/persons_died_desc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList: PersonSummaryData[] = (result.persons) as PersonSummaryData[]
    return personList
}


export async function GetPersonsNameDsc(): Promise<PersonSummaryData[]> {
    let file = "../data/summary/persons_name_desc.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList: PersonSummaryData[] = (result.persons) as PersonSummaryData[]
    return personList
}





export async function GetPersonsSurnameByLetter(letter: any) {

    let file = "../data/summary/persons_all_surname.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    if (letter == "") {
        return result
    }

    if (result.persons[letter] == undefined) {
        return {}
    }

    return result.persons[letter]
}


export async function GetPersonsByNationality(nationality: any) {

    let person_list = []
    if (nationality == "") {
        
        return person_list
    }

    let file = "../data/summary/persons_all.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    for (var idx in result.persons) {
        let person = result.persons[idx]
        if (person["nationality"] == undefined || person["nationality"] == "") {
            continue
        }
        if (person["nationality"] in ["Male", "Female"]) {
            continue
        }

        if (nationality == "nonamerican") {
            if (person["nationality"] != 'American') { person_list.push(person) }
            continue
        }

        if (person["nationality"].toLowerCase() == nationality.toLowerCase()) {
            person_list.push(person)
        }

    }
    return person_list
}



/*


export async function GetPersonsSurnameByLetterNationality(letter: any, nationality: string) {

    let file = "../data/summary/persons_all_surname.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    if (letter == "") {
        return result
    }


    if (result.persons[letter] == undefined) {
        return {}
    }


    let person_list = []

    for (var entity in result.persons[letter]) {
        let abbv = entity
        for (var p in result.persons[letter][abbv]) {

            if (nationality == "nonamerican") {
                if (['american', 'male', 'female', ''].includes(result.persons[letter][abbv][p]["nationality"].toLowerCase()) == false) {
                    person_list.push(result.persons[letter][abbv][p])
                }

            } else {
                if (result.persons[letter][abbv][p]["nationality"] && result.persons[letter][abbv][p]["nationality"].toLowerCase() == nationality.toLowerCase()) {
                    person_list.push(result.persons[letter][abbv][p])
                }
            }
        }


    }



    return person_list
}


export async function GetPersonsBySurname(surname: any) {

    let file = "../data/summary/persons_all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    if (surname == "") {
        return result
    }

    if (result.persons[surname] == undefined) {
        return {}
    }

    return result.persons[surname]
}



export async function GetPersonSurnamesAll() {

    let file = "../data/summary/persons_all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let surnames_list = Object.keys(result.persons)

    return surnames_list
}

export async function GetPersonSurnamesFirstLetter() {

    let file = "../../data/summary/persons_all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);


    let alphabet = [];
    for (var surname in result.persons) {
        let first_letter = surname.split("")[0]

        alphabet.push(first_letter)

    }

    alphabet = alphabet.filter((v, i, a) => a.indexOf(v) == i)
    alphabet.sort()

    return alphabet



    
}

*/