/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreBuildErrors: true,
  reactStrictMode: false,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
  largePageDataBytes:  128 * 1000000,
  },

  env: {

    top_level_entry: [
      { label: "Datasets", path: "datasets", id: "datasets", desc:"Explore the exhibitions by dataset." },
      
    ],

    datasets: [
      { label: "Combined", path: "/datasets/combined", id: "combined", desc: "Browse the combined MoMA and non-MoMA datasets" },
      { label: "MoMA", path: "/datasets/moma", id: "moma" , desc: "Browse the MoMA dataset" },
      { label: "non-MoMA", path: "/datasets/nonmoma", id: "nonmoma", desc: "Browse the non-MoMA dataset"  }
    ],

    nationality: [
      
      { label: "US - Surname letter", id: "us", path: "/datasets/combined/persons/nationality/us/surname_letter/", desc: "Browse entries associated with US persons across the combined dataset" },
      { label: "US - Birth year", id: "us__birthyear", path: "/datasets/combined/persons/nationality/us/birth_year/", desc: "Browse entries associated with US persons across the combined dataset" },
   
      { label: "non-US - Surname letter", id: "nonus", path: "/datasets/combined/persons/nationality/nonus/nationality/", desc: "Browse entries associated with non-US persons across the combined dataset." },
      
      { label: "non-US - Birth year", id: "nonus_birthyear", path: "/datasets/combined/persons/nationality/nonus/birth_year/", desc: "Browse entries associated with non-US persons across the combined dataset." },
      
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