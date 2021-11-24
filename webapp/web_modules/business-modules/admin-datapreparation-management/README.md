# @regardsoss/admin-storage-management

## Description

This module data preparation management panels. Handle plugins configurations.

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

This module is routed to the application by the @regardsoss/admin-board-acquisition module

## Exposed functions

This module as an administration module exposes is own :

  - Redux reducers : To configure the general Redux Store.
  - Router : To configure the general application router.
  - Dependencies : The needed resources (backend enpoints) to display each part of the module


# Internationalization

  All displayed labels are defined in two languages (English and French) and are avaible from the i18n repository.
  
  
