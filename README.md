# Linked Art Exhibition Browser


## Introduction
The Linked Art Exhibition Browser is a web app that provides a web-based Graphical User Interface for Cultural Heritage exhibitions expressed as Linked Art JSON-LD.

## Functionality
The web app can be used to provide a locally-hosted dynamic web-based view on exhibition data. It can also be used to create a static HTML version of the website that can be hosted without the need for server-side dynamic coding, e.g. via GitHub pages as seen at https://tgra.github.io/Linked-Art-Exhibition-Browser-MoMA/

The tool has been created to allow exhibition data expressed as Linked Art to be viewed in a tabular form in static HTML pages, further to a data analysis that identified properties of the data that would translate to a browsable interface.


- locally-hosted dynamic web-based view on exhibition data
- used to create a static HTML version of the website that can be hosted without the need for server-side dynamic coding

The entry points into the exhibition data that have been encoded in the Exhibition Browser app, were identified further to a data analysis exercise across a MoMA dataset. There are GitHub repositories where you can explore the outputs of the data analysis:
- Linked Art data analysis app https://github.com/tgra/Linked-Art-Exhibition-Browser-Data-Analysis
- MoMA dataset data files including summary files generated further to the data analysis  https://github.com/tgra/Linked-Art-Exhibition-Browser-MoMA-dataset


## Technical implementation
The tool uses the React framework Next.js, to generate tabular HTML files from Linked Art JSON-LD, and consequent creation of a static HTML web site. 


## Links
- Next.js - https://nextjs.org/  'The React Framework for the Web'
- React - https://reactjs.org/ - 'A JavaScript library for building user interfaces'



### System Requirements

- Node.js 12.22.0 or later
- MacOS, Windows (including WSL), and Linux are supported

Reference https://nextjs.org/docs

## Commands used to create the initial next.js template 

`npx create-next-app@latest`

Instructions followed and app called `browser-app`

Chose not to use TypeScript with project
Chose to use ESLint with project

`cd browser-app`

## Additional installation steps
### Installed Font Awesome icons
` cd browser-app`
`npm install fortawesome`

Reference: https://fontawesome.com/v5/docs/web/use-with/react


### Installed React-Boostrap

` cd browser-app`
`npm install react-bootstrap`

### SWR
`npm install swr`

`npm install fs` 

Add to package.json
`"browser": {
  "fs": false,
  "path": false,
  "os": false
}`


npm install leaflet react-leaflet
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

### Start app in production mode and create static HTML file in the out directory
`npm run build`

### View static HTML site
cd into `out` directory and enter `http-server` to start http server in the static HTML file directory
