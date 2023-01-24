/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {

    top_level_entry: [
      { label: "Datasets", path: "datasets", id: "datasets" },
      
    ],

    datasets: [
      { label: "Combined", path: "/datasets/combined", id: "combined" },
      { label: "MoMA", path: "/datasets/moma", id: "moma" },
      { label: "non-MoMA", path: "/datasets/nonmoma", id: "nonmoma" }
    ],

    nationality: [
      { label: "non-US", id: "nonus", path: "/datasets/combined/persons/nationality/nonus/nationality/" },
      { label: "US", id: "us", path: "/datasets/combined/persons/nationality/us/surname_letter/" }
    ],

    indexes: [
      { label: "Birth date", id: "birth_date_all", path: "/datasets/combined/indexes/person/birth_date_all" },
      { label: "Surname", id: "surname", path: "/datasets/combined/indexes/person/surname/smith" },
      { label: "Surname (First letter)", id: "surname_letter", path: "/datasets/combined/indexes/person/surname_letter" },

    ]

  },


}

module.exports = nextConfig



/*
{ label: "Exhibitions", path: "exhibitions", id: "exhibitions" },
      { label: "Persons", path: "persons", id: "persons" },
      { label: "Indexes", path: "indexes", id: "indexes" },

*/