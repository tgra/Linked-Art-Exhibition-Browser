# Linked Art Exhibition Browser


## Introduction
The Linked Art Exhibition Browser is a web app that provides a web-based Graphical User Interface for Cultural Heritage exhibitions expressed as Linked Art JSON-LD.

## Functionality
The Linked Art Exhibition Browser web app can be used to provide a locally-hosted dynamic web-based view on exhibition data. It can also be used to create a static HTML version of the website that can be hosted without the need for server-side dynamic coding, e.g. via GitHub pages as seen at https://tgra.github.io/Linked-Art-Exhibition-Browser-MoMA/

The tool has been created to allow exhibition data expressed as Linked Art to be viewed in a tabular form in static HTML pages, further to a data analysis that identified properties of the data that would translate to a browsable interface.

- locally-hosted dynamic web-based view on exhibition data
- used to create a static HTML version of the website that can be hosted without the need for server-side dynamic coding

The entry points into the exhibition data that have been encoded in the Exhibition Browser app, were identified further to a data analysis exercise across a MoMA dataset. There are GitHub repositories where you can explore the outputs of the data analysis:
- Linked Art data analysis app https://github.com/tgra/Linked-Art-Exhibition-Browser-Data-Analysis
- MoMA dataset data files including summary files generated further to the data analysis  https://github.com/tgra/Linked-Art-Exhibition-Browser-MoMA-dataset


## Technical implementation
The tool uses the React framework, Next.js, to build a web-based user interface to a Linked Art JSON-LD dataset.


### Links
- Next.js - https://nextjs.org/  'The React Framework for the Web'
- React - https://reactjs.org/ - 'A JavaScript library for building user interfaces'


### System Requirements

- Node.js 12.22.0 or later
- MacOS, Windows (including WSL), and Linux are supported

Reference https://nextjs.org/docs

## Initial next.js template setup

`npx create-next-app@latest`

Follow instructions and app called `browser-app`

- Chose not to use TypeScript with project
- Chose to use ESLint with project

`cd browser-app`

## Additional library installation

### Font Awesome icons

Icon library and toolkit

`npm install fortawesome`

Reference: 
https://fontawesome.com/v5/docs/web/use-with/react
https://fontawesome.com/

### React-Boostrap
Bootstrap provides a frontend responsive toolkit. This library provides Bootstrap 5 components built with React.

`npm install react-bootstrap`

Reference:
https://www.npmjs.com/package/react-bootstrap
https://getbootstrap.com/

### SWR
SWR is a React Hooks library for data fetching.

`npm install swr`

Reference:
https://www.npmjs.com/package/swr

### Leaflet
Leaflet is a javascript library for interactive maps

`npm install leaflet react-leaflet`

Reference:
https://www.npmjs.com/package/react-leaflet
https://leafletjs.com/ 


### Update package.json in the home dir

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

## Run the Linked Art Exhibition Browser web app

### Development mode
View the web site locally in development mode. In the root directory:
`npm run dev`

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




