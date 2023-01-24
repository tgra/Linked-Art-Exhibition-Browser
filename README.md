# exhibition-browser

This repository contains code for an cultural heritage exhibition data browser tool.

The tool has been created to allow exhibition data expressed as Linked Art to be viewed in a tabular form in static HTML pages, further to a data analysis that identified properties of the data that would translate to a browsable interface.

## Technical implementation
The tool uses next.js built on React, to generate tabular HTML files from Linked Art JSON-LD, and consequent creation of a static HTML web site. 

Next.js - https://nextjs.org/ 


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