# Dynamic lazy loadable modules

## Description
This directory contains all lazy loadable modules of the REGARDS application.  

A lazy loadable module is a plugable module that you can use where you want on the `User project` and `Portal` interfaces,
allowing you to customize the style, how the module will be displayed...

Microservices `rs-access-instance` and `rs-access-project` stores the configuration of each modules
and send it back to users browsing `User project` and `Portal` interfaces.

## End admin usage

To use REGARDS modules in the HMI, you first need to configure `Application layout` and sections.  
Then you will be able to load modules inside sections with custom configuration if required.  

## Module list

REGARDS modules have a specific [scoped package name](https://docs.npmjs.com/getting-started/scoped-packages) named `@regardsoss-modules`.  
Here is the list of available modules :

  | Module                  | Description                                                                            |
  |-------------------------|----------------------------------------------------------------------------------------|
  | authentication          | Displays the authentication form                                                       |
  | description             | Displays a results entity description                                                  |
  | embedded-html           | Displays showing an URL by supported locale in an i-frame                              |
  | licenses                | Displays the project license inside a dialog after user authentication                 |
  | map                     | Displays a map using Mizar API                                                         |
  | menu                    | Displays the main menu of the interface                                                |
  | news                    | Displays news list                                                                     |
  | order-cart              | Displays user order cart                                                               |
  | order-history           | Displays user orders list                                                              |
  | project-about-page      | Displays a configured project-about-page as dialog                                     |
  | projects-list           | Displays the list of public accessible REGARDS projects, allowing user to access them  |
  | search-graph            | Displays collections tree and allow browsing it                                        |
  | search-results          | Displays a catalog, allowing results filtering / research                              |

## Create a new module

To be plugged with the application, each `@regardsoss-modules` has to export in its `main.js` file an object containing :

```javascript
module.exports = {
  // A React.Component rendering the module functionalities
  ModuleContainer,
  // A React.Component renderig the module administration form
  AdminContainer,
  // A js object containing needed styles for both ModuleContainer and AdminContainer
  styles,
  // A js object containing Redux reducers of both ModuleContainer and AdminContainer
  reducer,
  // An object containing the i18n key values sets by locale
  messages,
  // A js object containing server side endpoints dependencies to allow module to be displayed
  dependencies,
}
```

### AdminContainer

The `AdminContainer` **is facultative**. If you don't require a module configuration
you do not need to specify the `AdminContainer` in the `main.js` module entrypoint.

The here-under React component example shows you how to create a form to create a configuration of your module.  

```javascript
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'

class AdminContainer extends React.Component {

  static propTypes = {
      // Application name "user" or "portal"
      appName: PropTypes.string,
      // Project name
      project: PropTypes.string,
      adminForm: PropTypes.shape({
        currentNamespace: PropTypes.string,
        isCreating: PropTypes.bool,
        isDuplicating: PropTypes.bool,
        isEditing: PropTypes.bool,
        // ReduxForm function to dynamicaly change a field value
        changeField: PropTypes.func,
        // Current module configuration. Values from the redux-form
        form: PropTypes.shape({
          id: PropTypes.number,
          applicationId: PropTypes.string,
          type: PropTypes.string.isRequired,
          description: PropTypes.string,
          active: PropTypes.bool,
          container: PropTypes.string,
          page: PropTypes.shape({
            home: PropTypes.bool,
            iconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
            customIconURL: PropTypes.string,
            // module titles by locale
            title: PropTypes.objectOf(PropTypes.string),
          }),
          // module configuration
          // Note: not necessary in "conf" field but in currentNamespace field (depends on driving module module)
          conf: PropTypes.objectOf(PropTypes.any),
        }),
        // provided conf, when another module drives this one
        conf: PropTypes.shape({
          anotherParameter: PropTypes.string,
        }),
      }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  constructor (props) {
    super(props)
    this.CONF_MY_PARAMETER = `${props.namespace}.myParameter`
    this.CONF_MY_PARAMETER2 = `${props.namespace}.myParameter2`
  }

  render() {
    const { intl } = this.context
    return (
      <div>
        <Field
          name={this.CONF_MY_PARAMETER}
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'admin.example.my.parameter.label' })}
        />
        <Field
          name={this.CONF_MY_PARAMETER2}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'admin.example.my.parameter2.label' })}
        />
      </div>
    )
  }
}
export default AdminContainer

```

Notes :
 - you shall prefix all `Field` names with `conf.` to let you receive that attribute value in your `ModuleContainer`.  
 For example if you define `conf.myParameter` you will receive `myParameter` in the props `moduleConf` of your `ModuleContainer`.  
 - `@regardsoss/form-utils` module provides ready to use input fields
 - text internationalization is handled by the `@regardsoss/i18n` module and autowired by `@regardsoss/modules`.
 - you do not need to import React in `.jsx` files

### The ModuleContainer

The `ModuleContainer` **is mandatory**. This is the React component displayed on the 
`User project` and `Portal` interfaces


The following `ModuleContainer` example shows you how to retrieve the prop `moduleConf` which
contains the configuration created with the `AdminContainer` and injected in your module.

```javascript
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'

class ModuleContainer extends React.Component {
  static propTypes = {
      // Application name "user" or "portal"
      appName: PropTypes.string.isRequired,
      // Current project name
      project: PropTypes.string,
      // Module configuration
      moduleConf: PropTypes.shape({
        myParameter: PropTypes.string,
        myParameter2: PropTypes.bool,
      }).isRequired,
  }

   static contextTypes = {
      ...i18nContextType,
      ...themeContextType,
    }

  render() {
    const { moduleTheme } = this.context
    const { moduleConf: {myParameter} } = this.props
    return (
     <div>
      <FormattedMessage id="example.message" />
      <div style={moduleTheme.myParameterStyles}>
        {myParameter}
       </div>
     </div>
     )
  }

}
export default ModuleContainer

```

### Styles

The `Styles` **is mandatory**. REGARDS uses the [Material-UI](http://www.material-ui.com/#/get-started/usage) library to style all components using CSS inline.

In the `Styles.js` file, you can use the current theme to reuse a subpart of the overall theme, like in the example below.

```javascript
const formStyles = theme => ({

  myParameterStyles: {
    color : theme.palette.textColor,
    width: '250px'
  }

})
export default formStyles
```

On your module React component, you can access the Styles using the context `this.context.moduleTheme`,
but you need to explicit the `contextTypes` with the `...themeContextType` from `@regardsoss/theme`.


```javascript
/**
* Basic usage of the theme context
*/
class Example extends React.Component {
   static contextTypes = {
     ...themeContextType
   }

   render() {
     return (
       <div style={this.context.moduleTheme.myParameterStyles}>
        Test
       </div>
     )
   }
}
export default Example

```

More information about the theme management on the `@regardsoss/theme` module

### Reducer

The Redux `reducer` **is mandatory**. Lazy loadable modules have their own part created in the store.  

The example below shows how to define your Redux tree. Unlike vanilla redux, you don't have to use `combineReducers`   
```javascript
const reducers = {
  todos: MyTodosReducer,
  foo: MyFooReducer
}
```

With the previous example and for a module named "ExampleModule", the application will create the here-under subpart in the global application store :  

```json
{
  "modules": {
    "ExampleModule" : {
       "todos": {},
       "foo" : {}
    }
  }
  // rest of the redux tree
}
```

The same store can be accessed by both `ModuleContainer` and `AdminContainer`.

### Messages

This parameter allows you to change the locales keys and values sets. By default such object is imported from ./messages in eavh module
Expected files containing internationalized messages shall be named as:  
```messages.<language>.i18n.js```

Supported languages are `en` and `fr`

### Dependencies

This file defines dependencies required to display `ModuleContainer` and `AdminContainer` depending of the current Project User role.
Each endpoint dependency required is composed in 3 parts, separated by the '@' caracter:  
`<MICROSERVICE>@<ENDPOINT>@<HTTP_VERB>`

An example:  
```javascript

/**
 * Dependencies needed to display ModuleContainer
 */
const user = [
  'rs-dam@/models/attributes@GET',
]
/**
 * Dependencies needed to display AdminContainer
 */
const admin = [
  'rs-dam@/models/attributes@POST',
]

module.exports = {
  user,
  admin,
}

```

### Module default-icon.svg

When creating a module, we must ensure the default icon is provided and respects the following rules:
* Its path is **[module name]/default-icon.svg** where module name is also the module root folder
* Icon is an SVG
* Icon stroke and fill colors are specified on first <sgv> tag - otherwise, the module icon cannot be updated with theme colors  

That icon should be used to represent the module or its instances. It is used, for instance, to display navigation links in menu module - when user chooses to use the default icon.  

SVG icons are available, for instance, on the following sites:
* https://material.io/icons/ : Material design icons (default regards look and feel)
* https://materialdesignicons.com/: Extension to material design icons  

Finally, note that each module default-icon.svg **should be unique among all modules default icons**, so that user can quickly identify the page and module types.
