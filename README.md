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

### Initial application set up

#### Commands used to create the initial next.js template 

`npx create-next-app@latest`

Instructions were followed and the app was called `browser-app`
- Chose not to use TypeScript with project
- Chose to use ESLint with project

#### Install additional code libraries 

In the `browser-app` directory
`cd browser-app`

##### Install Font Awesome icons

`npm install fortawesome`

Reference: 
https://fontawesome.com/v5/docs/web/use-with/react


##### Install React-Boostrap

`npm install react-bootstrap`

##### SWR

`npm install swr`
`npm install fs` 

##### Leaflet maps
Leaflet is a javascript library for interactive maps
`npm install leaflet react-leaflet`

Reference:
https://www.npmjs.com/package/react-leaflet
https://leafletjs.com/ 

#### Update package.json

Add to package.json
`"browser": {
  "fs": false,
  "path": false,
  "os": false
}`



### Updated package.json

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

Navigate to the localhost URL provided.

### Start app in production mode and create static HTML file in the out directory
`npm run build`

### View static HTML site
cd into `out` directory and enter `http-server` to start http server in the static HTML file directory



#### Dynamic version
 1. download the repository files
 2. in the browser-app directory type ```bash npm run dev```
 3. open the localhost URL provided in a web browser

#### Static version
 1. download the repository files
 2. create a subdirectory 
 3. in the browser-app directory type ```bash npm run build```. This will create a static HTML web site
 4. create a subdirectory 'Linked-Art-Exhibition-Browser-MoMA' in the root directory
 5. copy files from the newly-created 'browser-app/out' directory to the 'Linked-Art-Exhibition-Browser-MoMA' directory
 6. use the command `http-server` in the root directory 
 7. navigate to http://localhost:xxxx/Linked-Art-Exhibition-Browser-MoMA


## App file description
There is a  [README file](browser-app/README.md) with a description of the files that are included in the app is located in the browser-app directory.