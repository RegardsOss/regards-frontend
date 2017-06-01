# @regardsoss/admin


## Description

Main module for administration interface.
Administration is divided into two differents layouts :

  - Project administration
  - Instance administration

## Module structure

 .
 ├── src  
 |   ├──  
 |   ├── clients         : Define all backend clients needed to request/send information  
 |   ├── containers      : React-Redux logic to handle module functions  
 |   ├── i18n            : Messages and labels internationalization  
 |   ├── menu            : React component to display panels  
 |   ├── styles          : Panels styles (inline css objects)  
 |   ├── dependencies.js : Needed resources to display panels  
 |   ├── main.js         : Module exported index  
 |   ├── reducer.js      : Redux reducers  
 |   └── router.js       : React-router configuration  
 ├── tests  
 ├── package.json    : Npm module description file  
 └── README.md  


## Route

This module is routed to /admin/:project url by the src/rootRouter.js
If project is set then this module display the "Project administration layout" else it display the "Instance administration" one.

## Usage

This module define the main administration interface layout and route all administration modules throught the menu.

The routed modules are : 
 
  - @regardsoss/admin-accessright-management : Accessible from Project layout
  - @regardsoss/admin-account-management : Accessible from Instance layout
  - @regardsoss/admin-data-management : Accessible from Project layout
  - @regardsoss/admin-microservice-management : Accessible from Project layout
  - @regardsoss/admin-project-management : Accessible from Instance layout
  - @regardsoss/admin-ui-management : Accessible from Instance and Project layout 
  - @regardsoss/admin-user-management : Accessible from Project layout
  
  
