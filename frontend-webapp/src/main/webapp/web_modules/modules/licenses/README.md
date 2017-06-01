# @regardsoss/licenses

## Description

This module is a dynamic configurable module for the configurable interfaces. 
This module is used to display a configured license page as an iframe and ask for a license acceptation.
  
## Module structure

 .  
 ├── src  
 |   ├──  
 |   ├── clients         : Define all backend clients needed to request/send information  
 |   ├── components      : React component to display panels  
 |   ├── containers      : React-Redux logic to handle module functions  
 |   ├── i18n            : Messages and labels internationalization  
 |   ├── i18n            : Messages and labels internationalization  
 |   ├── styles          : Panels styles (inline css objects)  
 |   ├── main.js         : Module exported index  
 |   ├── reducer.js      : Redux reducers  
 |   └── router.js       : React-router configuration  
 ├── tests  
 ├── package.json    : Npm module description file  
 └── README.md  

## Route

This module is routed by the main application in which it is configured as a static or dynamic module.
Static modules are always displayed in the interface layout.
Dynamic modules are only displayed when the interface route is /modules/:module_id where module_id is the configuration identifier of the module.

## Exposed functions

This module as a dynamic configurable module exposes is own :
  - moduleContainer  : Main module React component used to display this module,
  - adminContainer   : Main module React component used to display the administration panel of this module,
  - reducer          : To configure the general Redux Store.
  - styles           : Styles of the module
  - messagesDir      : Messages and labels internationalization directory (default : 'modules/menu/src/i18n')
  - dependencies     : The needed resources (backend enpoints) to display each part of the module

# Internationalization

  All displayed labels are defined in two languages (English and French) and are avaible from the i18n repository.
  
# Usage

  To display a dynamic module as the current one you have to use the here under code :
   
  ```javascript
    render() {
    const moduleConfiguration = {
       type: 'licenses',
       active: true,
       conf: {}
    }
    return (
      <LazyModuleComponent
            module={moduleConfiguration}
            appName={'user'}
            project={'project'}
          />
      )
    }
  ```
  
  
  
