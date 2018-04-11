# @regardsoss/portal


## Description

Main module for Portal interface.
Portal interface is a configurable interface. Each displayed module in this interface is configurable. 

## Module structure

 .  
 ├── src  
 |   ├──  
 |   ├── containers      : React-Redux logic to handle module functions  
 |   ├── styles          : Panels styles (inline css objects)  
 |   ├── main.js         : Module exported index  
 |   ├── reducer.js      : Redux reducers  
 |   └── router.js       : React-router configuration  
 ├── tests  
 ├── package.json    : Npm module description file  
 └── README.md  


## Route

This module is routed to / url by the src/rootRouter.js

## Usage

This module define the main Portal interface layout.
Layout to display is fetched from the server (rs-access-instance microservice). The layout is displayed throught the @regardsoss/layout module.
Modules to display are fetched from the backend server (rs-access-instance microservice). The modules are displayed through the @regardsoss/modules module.

Modules available to be displayed in the User Project interface are defined into the web_modules/modules directory.
  
  
