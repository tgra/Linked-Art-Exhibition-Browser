This readme file is concerned with a description of the directories and files tha form the browser app.

# components
Re-usable components that are imported by the pages in the `src` directory with

`import Map from '../components/Map'`

- `Map` - map component used in the exhibition pages
- `ex.js` - listgroup item for exhibition with link to the exhibition page
- `footer.js` - returns HTML footer that can be included in a page
- `navbar.js` - HTML navigation bar for the website. Uses Bootstrap navbar.
- `person_detail.js` - HTML containing detailed information about a person including an exhibition list and associated histogram
- `person_list.js` - provides a listgroup item for a person with a link that will open up a detailed information panel for the selected person 

# lib

[lib](lib) contains two files with shared functions for querying data files for persons and exhibitions.

# out

[out](out) will be created if use use the command `npm run build` to create a static HTML version of the web site. 


# src

[src](src) directory contains the front-end files in the [src/pages](src/pages/) directory that will be mirrored in the web site directory structure

## pages

- [index.js](src/pages/index.js) home page for the app
- [datasets](src/pages/datasets/) - dir containing pages for the website
- [exhibition](src/pages/exhibition) - directory containing file that will create a detailed page for each of the exhibitions at build time

If a filename has a string/parameter in square brackets, this page will create multiple pages at build time using the parameter in the square brackets.

## styles
CSS style sheets

## .env.local

global variables that can be used in pages e.g. {process.env.NEXT_PUBLIC_APP_TITLE}

Many of them are not used at this time.

# jsconfig.json
app generated file

# next-env.d.ts
app generated file 

# next.config.js
file containing global variables that are used in the `src/pages` files e.g. site title and basePath used in navbar links

# package.json
App file that is automatically updated when additional javascript libraries installed. Also manually updated when first setting up app
