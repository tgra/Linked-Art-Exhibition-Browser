const fs = require('fs')

const data_dir = "../data"
const summary_dir = data_dir + "/summary"
const person_dir = summary_dir + "/persons/"
const person_file_prefix = person_dir + "persons_"
const persons_all = person_file_prefix + "all.json"
const persons_all_born = person_file_prefix + "all_born.json"



/*
Summary.
return summary list of all persons
*/

export async function GetPersons() {
    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);
    const personList = (result.persons)
    return personList
}


/*
Summary.
from persons_all.json get list of people grouped by first letter of surname, using input parameter of person ids

@param id_list {list} list of person ids

@return dict of first letters of person surnames with list of persons
*/

export async function GetExInfluencersSummaryData(id_list) {

    // read persons_all.json and get persons_list

    let rawdata = fs.readFileSync(persons_all);
    let result = JSON.parse(rawdata);

    const person_list_all = (result.persons)

    let person_list_selected = {}

    // iterate over person list 
    person_list_all.forEach(function (person) {

        // get person id
        let person_id = person.id

        //get first letter of person's surname
        let letter = person.name.split("")[0]

        // create dict of first letter of person's surname with list of persons
        if (person_list_selected[letter] == undefined) {
            person_list_selected[letter] = []
        }

        if (id_list.includes(person_id)) {
            person_list_selected[letter].push(person)
        }
    })
    return person_list_selected


}


/*
Name.
GetPersonsByEx(exid)

Summary.
return dict containing list of people who were involved in a selected exhibition

Description.
using persons_all.json file iterate over list of people and if person was innvolved in selected exhibition, add to list 

Params.
exid {URI} - exhibition identifier

@return {dict} dictionary of first letters of surnames with associated people entries 
*/

export async function GetPersonsByEx(exid) {

    let person_list = []
    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    // identify if person was involved in selected exhibition, if so add to list called person_list
    result.persons.forEach(function (person) {
        if ("exhibitions" in person) {
            person.exhibitions.forEach(function (ex) {
                let id = ex.id.split("/").pop()
                if (id == exid) { person_list.push(person) }
            })
        }
    })

    // order list by surname and then first name
    person_list = person_list.sort(function (first, second) {
        let a = second.name
        let b = first.name
        if (a > b) { return -1; }
        if (b > a) { return 1; }
        return 0;
    })

    let person_list_letter = {}


    // iterate over person list and create a dictionary with first letter of surname and associated list of persons
    person_list.forEach(function (person) {
        let person_letter = person.name.split("")[0]

        if (person_list_letter[person_letter] == undefined) {
            person_list_letter[person_letter] = []
        }
        person_list_letter[person_letter].push(person)

    })

    return person_list_letter
}


/*
Name.
GetPersonsByBirthYear(year)

Summary.
return list of people born in a selected year


@param year {integer} selected year to search for. If empty string, return the count list from persons_all_born file, that is, a dict of all years and count of people born in that year


@return list of persons, empty dictionary, or summary count dict of all years with corresponding people count
*/
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


/*
Summary.
return summary list of all persons organised by birth year
*/
// return list of all birth years in dataset

export async function GetPersonsBirthYearAll() {
    
    let rawdata = fs.readFileSync(persons_all_born);
    let result = JSON.parse(rawdata);
    return Object.keys(result.count)
}

export async function GetPersonsBirthYearSelective(selection) {
    let file = person_file_prefix + selection.toLowerCase() + "_born.json"
    let rawdata = fs.readFileSync(file);
    return JSON.parse(rawdata)
}

export async function GetPerson(id) {
    let file = data_dir + "/person/" + id + ".json"
    let rawdata = fs.readFileSync(file);
    return JSON.parse(rawdata)
}


/**
 * return summary information for selected person from persons_all.json
 *
 * @param {uri} id - person id
 * @returns dict for selected person from persons_all
 */
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



/**
 * 
 * @returns dictionary of persons of non-american nationality grouped by nationality
 * 
 */

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

        // ignore american nationality
        if (["American"].includes(nationality)) {
            continue
        }


        if (nationality_dict[nationality] == undefined) {
            nationality_dict[nationality] = []
            count[nationality] = 0
        }

        nationality_dict[nationality].push(person)
        count[nationality] += 1

    }

    return ({ count: count, persons: nationality_dict })
}


/**
 * 
 * @returns returns dictionary of people of american nationality grouped by the first letter of their surname
 * 
 */

export async function GetPersonsSurnameLetterUS() {

    let name_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let count = {}

    // iterate over person list
    for (var idx in result.persons) {

        //get person 
        let person = result.persons[idx]
        
        let nationality = person["nationality"]
        if (nationality != "American") {
            continue
        }

        let name = person["name"]
        // get first letter of surname
        let letter = name.split("")[0]
        if (letter == undefined || letter == "") {
            continue
        }
        
        if (name_dict[letter] == undefined) {
            name_dict[letter] = []
            count[letter] = 0
        }
        
        name_dict[letter].push(person)
        count[letter] += 1
    }


    // order person list
    Object.entries(name_dict).forEach(function ([letter, person_list]) {
        let person_list_ordered = person_list.sort(function (first, second) {
            let a = second.name
            let b = first.name
            if (a > b) { return -1; }
            if (b > a) { return 1; }
            return 0;
        })
        name_dict[letter] = person_list_ordered

    })

    // return dict with summary count and person dict grouped by first letter of surname
    return ({ count: count, persons: name_dict })
}


/**
 * 
 * @returns returns summary count of non-american persons and the first letter of their surname as well as a list of people grouped by first letter of surname
 * 
 */
export async function GetPersonsSurnameLetterNonUS() {

   
    let name_dict = {}

    let file = persons_all
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let count = {}
    for (var idx in result.persons) {
        let person = result.persons[idx]

        let name = person["name"]
        let nationality = person["nationality"]

        if (nationality == undefined || nationality == "" || nationality == "American") {
            continue
        }
        let letter = name.split("")[0]

        if (letter == undefined || letter == "") {
            continue
        }

        if (name_dict[letter ] == undefined) {
            name_dict[letter ] = []
            count[letter ] = 0
        }
        name_dict[letter ].push(person)
        count[letter ] += 1
    }

    Object.entries(name_dict).forEach(function ([letter, person_list]) {
        let person_list_ordered = person_list.sort(function (first, second) {
            let a = second.name
            let b = first.name
            if (a > b) { return -1; }
            if (b > a) { return 1; }
            return 0;
        })
        name_dict[letter] = person_list_ordered
    })

    return ({ count: count, persons: name_dict })
}



export async function GetPersonSurnameFirstLetterAll() {

    let file = person_file_prefix + "all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let alphabet = [];
    let counter = {}

    for (var surname in result.persons) {
        let first_letter = surname.split("")[0]
        if (counter[first_letter] == undefined) {
            counter[first_letter] = 0
        }

        alphabet.push(first_letter)
        counter[first_letter] += 1

    }

    alphabet = alphabet.filter((v, i, a) => a.indexOf(v) == i)
    alphabet.sort()

    return { count: counter, alphabet: alphabet }




}


export async function GetPersonSurnameFirstLetterSelected(letter) {

    let file = person_file_prefix + "all_surname.json"
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



export async function GetPersonSurnamesAll() {

    let file = person_file_prefix + "all_surname_full.json"
    let rawdata = fs.readFileSync(file);
    let result = JSON.parse(rawdata);

    let surnames_list = Object.keys(result.persons)

    return surnames_list
}


export async function GetPersonsBySurname(surname) {

    let file = person_file_prefix + "all_surname_full.json"
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
