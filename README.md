# Linked Art Exhibition Browser


## Introduction

The Linked Art Exhibition Browser is an application that creates a web-based Graphical User Interface (GUI) for Cultural Heritage exhibitions expressed as Linked Art JSON-LD.

## Functionality

The Linked Art Exhibition Browser allows you to:
-  view a locally-hosted dynamic web-based view on exhibition data
-  create a static HTML version of the website that can be hosted without the need for server-side dynamic coding, e.g. via GitHub pages as seen at https://tgra.github.io/Linked-Art-Exhibition-Browser-MoMA/

## Data analysis

The Graphical User Interface (GUI) has been defined further to a data analysis exercise using a Linked Art data analysis app available at https://github.com/tgra/Linked-Art-Exhibition-Browser-Data-Analysis

The data analysis looked at the 'shape' of the data, that is the distribution of values for certain data properties. One objective was to identify properties of the data that had a fairly even distribution across a range of values, and where the maximum number for a given value did not exceed that which could be presented on a single page without a need for paging through results.

## Data entry points

The entry points into the exhibition data that have been encoded in the Exhibition Browser app, were identified further to a data analysis exercise across a MoMA dataset. There are GitHub repositories where you can explore the outputs of the data analysis:
- Linked Art data analysis app https://github.com/tgra/Linked-Art-Exhibition-Browser-Data-Analysis
- MoMA dataset data files including summary files generated further to the data analysis  https://github.com/tgra/Linked-Art-Exhibition-Browser-MoMA-dataset
- Static HTML Exhibition Browser using the MoMA dataset https://tgra.github.io/Linked-Art-Exhibition-Browser-MoMA/

## Data journeys

As well as different entry points for subsets of the data, the data analysis also identified different journeys through the data. These all eventually lead to the detailed exhibition pages.

## In page summary data

As well as entry points and data journeys, the data analysis also informed the presentation of the summary information for a selected person or exhibition. 

### Examples

#### An artist's list of exhibitions 

Decades were identified as a good way to partition and present a person's exhibition list.

#### Concurrent exhibitions

Organisations were identified as a good way to partition and present lists of concurrent exhibitions.


## Technical implementation

The Linked Art Exhibition Browser application has been built using the React framework Next.js. 

Next.js was chosen for development as there was a requirement to be able to create a static HTML web site. 

### Further reading

- Next.js - https://nextjs.org/  'The React Framework for the Web'
- React - https://reactjs.org/ - 'A JavaScript library for building user interfaces'

### System Requirements

- Node.js 12.22.0 or later
- MacOS, Windows (including WSL), and Linux are supported

### Initial next.js template setup

`npx create-next-app@latest`

Follow instructions and app called `browser-app`

- Chose not to use TypeScript with project
- Chose to use ESLint with project

`cd browser-app`


### Dependencies

Additional javascript libraries were installed using command `npm install packagename`, as defined in package.json:

  "dependencies": {
    "@next/font": "13.1.4",
    "chart.js": "^4.2.0",
    "eslint": "8.32.0",
    "eslint-config-next": "13.1.4",
    "fortawesome": "^0.0.1-security",
    "fs": "^0.0.1-security",
    "leaflet": "^1.9.3",
    "next": "13.1.4",
    "randomcolor": "^0.6.2",
    "react": "18.2.0",
    "react-bootstrap": "^2.7.0",
    "react-calendar-timeline": "^0.28.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "18.2.0",
    "react-leaflet": "^4.2.0",
    "swr": "^2.0.1"
  },

Reference:
https://www.npmjs.com/


Information about some of the javascript libraries installed: 
#### Font Awesome icons

Icon library and toolkit

Reference: 
https://fontawesome.com/v5/docs/web/use-with/react
https://fontawesome.com/

#### React-Boostrap
Bootstrap provides a frontend responsive toolkit. This library provides Bootstrap 5 components built with React.

Reference:
https://www.npmjs.com/package/react-bootstrap
https://getbootstrap.com/

#### SWR
SWR is a React Hooks library for data fetching.


Reference:
https://www.npmjs.com/package/swr

#### Leaflet
Leaflet is a javascript library for interactive maps

Reference:
https://www.npmjs.com/package/react-leaflet
https://leafletjs.com/ 


### Update package.json

Add to package.json
`"browser": {
  "fs": false,
  "path": false,
  "os": false
}`


Update package.json to build static site, adding ` && next export` to build as follows:

`"scripts": {
    "dev": "next dev",
    "build": "next build  && next export",
    "start": "next start",
    "lint": "next lint"
  },`

## To run app

### Start app in development mode
`npm run dev`

### Development mode
View the web site locally in development mode. In the root directory:
`npm run dev`

Navigate to the localhost URL provided.

### Production mode 
Create a static HTML version in the /app/out directory
`npm run build`

####  View static HTML site
To view the static HTML pages created in the `out` directory, 

- create a directory at the same level as the `browser-app` directory that has the same name as the `basePath` dir defined in next.config.js e.g. `Linked-Art-Exhibition-Browser-MoMA`
- copy all files from the `out` directory into this new directory
- cd to the directory above the `browser-app` directory
- enter `http-server` to start the local http server
- navigate to the localhost URL provided
  

## Linked Art Exhibition Browser file/directory description
There is a  [README file](browser-app/README.md) with a description of the files that are included in the app located in the [browser-app](browser-app) directory.