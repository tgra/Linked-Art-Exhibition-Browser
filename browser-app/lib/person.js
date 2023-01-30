import { eventNames } from 'process';

const fs = require('fs')

const data_dir = "/Users/tanya/Documents/Code/exhibition-browser-2023/data"



const persons_all = data_dir + "/summary/persons/persons_all.json"


const summary_dir = "/summary/"

const person_dir = "/persons"

const persons_all_born = data_dir + "/summary/persons/persons_all_born.json"

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
    

// GetPersonsByNationalityBirthYear
export async function GetPersonsByNationalityBirthYear(nationality) {
    let file = data_dir + "/summary/persons/persons_" + nationality.toLowerCase() + "_born.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    return (result)


}



export async function GetPersonsByDatasetBirthYear(dataset) {
    let file = data_dir + "/summary/activity/events_" + dataset + "_persons_birthyear.json"
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

    let persons = []

    result.persons.forEach(function (person) {
        if (person["id"].split("/").pop().toUpperCase() == id.toUpperCase()) {
            persons.push(person)
        }
    })

    return (persons)
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



export async function GetPersonsByNationality() {

    let nationality_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

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
        nationality_dict[nationality].push(person)


   
        
    }

    return (nationality_dict)
}


// GetPersonsSurnameByLetter

export async function GetPersonsSurnameLetter() {

    let ignore_list = ["American"]
    let name_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    for (var idx in result.persons) {
        let person = result.persons[idx]

        let name = person["name"]
        let nationality = person["nationality"]

        let value = name.split("")[0]

        if (value == undefined || value == "") {
            continue
        }
        if (ignore_list.includes(nationality) == false) {
            continue
        }

        if (name_dict[value] == undefined) {
            name_dict[value] = []
        }
        name_dict[value].push(person)
    }

    return (name_dict)
}


//  GetPersonSurnamesFirstLetter



export async function GetPersonSurnamesFirstLetter() {

    let file = data_dir + "/summary/persons/persons_all_surname_full.json"
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