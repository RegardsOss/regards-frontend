# @regardsoss/embedded-html

## Description

This module is a dynamic configurable module to be used in REGARDS user interfaces. It acts as an IFrame container to embed HTML content by its URL. It may be used to create banner, footer, page content and so on...
  
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
 ├── default-icon.svg    : Default module icon as svg, mandatory
 ├── package.json        : Npm module description file  
 └── README.md  

## Exposed functions

This module as a dynamic configurable module exposes is own :
  - moduleContainer  : Main module React component used to display this module,
  - adminContainer   : Main module React component used to display the administration panel of this module,
  - reducer          : To configure the general Redux Store.
  - styles           : Styles of the module
  - messages         : Messages and labels internationalization  (default : imported index.js from messages/)
  - dependencies     : The needed resources (backend enpoints) to display each part of the module

## Internationalization

  All displayed labels are defined in two languages (English and French) and are avaible from the i18n repository.
  
## Usage

  To display a dynamic module as the current one you have to use the here under code :
   
  ```javascript
    render() {
    const moduleConfiguration = {
       type: 'embedded-html',
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
  
  
  
