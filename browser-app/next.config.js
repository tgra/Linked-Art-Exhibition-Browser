/** @type {import('next').NextConfig} */
const nextConfig = {

  basePath: "/exhibition-browser-static-demo",
  images: {
    unoptimized: true,
  },
 
  reactStrictMode: false,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
  largePageDataBytes:  128 * 1000000,
  },

  env: {
    basePath: "/exhibition-browser-static-demo",

    top_level_entry: [
      { label: "Datasets", path: "datasets", id: "datasets", desc:"Explore the exhibitions by dataset." },
      
    ],

    datasets: [
      { label: "Combined", path: "combined", id: "combined", desc: "Browse the combined MoMA and non-MoMA datasets" },
      { label: "MoMA", path: "moma", id: "moma" , desc: "Browse the MoMA dataset" },
      { label: "non-MoMA", path: "nonmoma", id: "nonmoma", desc: "Browse the non-MoMA dataset"  }
    ],

    nationality: [
      
      { label: "US - Surname letter", id: "us", path: "persons/nationality/us/surname_letter/", desc: "Browse entries associated with US persons across the combined dataset" },
      { label: "US - Birth year", id: "us__birthyear", path: "persons/nationality/us/birth_year/", desc: "Browse entries associated with US persons across the combined dataset" },
   
      { label: "non-US - Surname letter", id: "nonus", path: "persons/nationality/nonus/surname_letter/", desc: "Browse entries associated with non-US persons across the combined dataset" },
      { label: "non-US - Birth year", id: "nonus_birthyear", path: "persons/nationality/nonus/birth_year/", desc: "Browse entries associated with non-US persons across the combined dataset." },
      { label: "non-US - Nationality", id: "nonus", path: "persons/nationality/nonus/nationality/", desc: "Browse entries associated with non-US persons across the combined dataset." },
     
    ],

    
    indexes: [
      { label: "Birth date", id: "birth_date_all", path: "indexes/person/birth_date_all" },
      { label: "Surname (First letter)", id: "surname_letter", path: "indexes/person/surname_letter" },
    ]
  },

}

module.exports = nextConfig



/*
{ label: "Exhibitions", path: "exhibitions", id: "exhibitions" },
      { label: "Persons", path: "persons", id: "persons" },
      { label: "Indexes", path: "indexes", id: "indexes" },


       { label: "Surname", id: "surname", path: "/datasets/combined/indexes/person/surname/smith" },
     
*/