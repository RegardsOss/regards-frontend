# @regardsoss/news

## Description

This module is a dynamic configurable module for the configurable interfaces. This module is used to display the history of user orders (carts)content and -internally- to show all users history in administration interface. Please Note that this module must be instantiated once to enable the order cart history functionnality in regards user interface. Although it is not forbidden, instantiating it more than once seems meaningless.
  
## Module structure

 .  
 ├── src  
 |   ├──  
 |   ├── clients         : Define all backend clients needed to request/send information  
 |   ├── components      : React component to display panels  
 |   ├── containers      : React-Redux logic to handle module functions  
 |   ├── i18n            : Messages and labels internationalization  
 |   ├── styles          : Panels styles (inline css objects)  
 |   ├── main.js         : Module exported index  
 |   ├── reducer.js      : Redux reducers  
 |   └── router.js       : React-router configuration  
 ├── tests  
 ├── package.json    : Npm module description file  
 └── README.md  

## Route

This module is routed as a dynamic module to show user order history. It is also used by admin order history module when displaying all users history
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
       type: 'news',
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
  
  
  
