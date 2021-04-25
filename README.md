# BB Todo

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a simple todo app initially created as a PoC during my work on refactoring huge Backbone+Marionette application and migrating it from backbone@0.9.1 and backbone.marionette@2.4.1 to the latest versions. In addition was used rollup as build tool to have treeshaking applied. handlebars has been chosen as template engine instead of lodash templates.

## Technologies
Project is created with:
* [backbone@1.3.3](https://backbonejs.org/)
* [backbone.marionette@3.5.1](https://marionettejs.com/)
* [handlebars@4.7.6](https://handlebarsjs.com/)
* [rollup@2.35.1](https://rollupjs.org/)

## Setup
To run this app locally, install it locally using npm:

1. Clone the repo
   ```sh
   git clone https://github.com/greebamax/bb-todo.git
   ```
2. Switch to Node v14.x.x using [nvm](https://github.com/nvm-sh/nvm)
    ```sh
    nvm use
    ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start an app
    ```sh
    npm start
    ```
5. Go to http://localhost:4379/ to open it in a browser
