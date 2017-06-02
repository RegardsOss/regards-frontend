# Dynamic lazy loadable modules

## Description
This directory contains all lazy loadable modules of the REGARDS application.  

A Lazy loadable module is a plugable module for the "User project" or "Portal" interfaces.  
This modules are used to add new functionalities to those interfaces.
By default the here-under modules are available to use and configure :

  | Module  | Description                       |
  |----------------|-----------------------------------|
  | authentication | Add the authentication functionalities |
  | home-page      | Display a configured home-page as dialog |
  | licenses       | Display the project license into a dialog after user authentication. |
  | menu           | Display the main menu of the interface |
  | projects-list  | Display the list of public accessible REGARDS projects and allow to access their "User project interface" |
  | search-form    | Display a search form and allow to consult results |
  | search-results | Display the result of the given REGARDS catalog opensearch request |
  | search-graph   | Allow define a collection tree and allow to navigate into in order to consult datasets contents |
   
Each module to be fully plugged in the application have to export in is main javascript file an object containing the informations below :

```json
{
  ModuleContainer : "A React.Component rendering the module functioannlities",
  AdminContainer : "A React.Component renderig the module administration form",
  styles : "A js object containing needed styles for both ModuleContainer and AdminContainer",
  reducer : "A js object containing Redux reducers of both ModuleContainer and AdminContainer",
  messagesDir : "A string containing the i18n directory for labels and message internationalization",
  dependencies : "A js object containing server side endpoints dependencies to allow module to be displayed"
}
```
## Usage

### The AdminContainer (mandatory)

The AdminContainer is mandatory. A simple module without configuration can only use the ModuleContainer.

The here-under example module show you how to create a form to configure your module.  

!! The only constraint is to prefix all the Field names with "conf" like "conf.myParameter" in the example below.

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
        // ReduxForm function to dynamicaly change a field value
        changeField: PropTypes.func,
        // Current module configuration. Values from the redux-form
        form: PropTypes.shape({
          // Form is activated ?
          active : PropTypes.bool,
          // Application name "user" or "portal" 
          applicationId: PropTypes.string,
          // Current form values
          conf: ModuleConfiguration,
          // Layout container where the module is displayed in the application
          container : PropTypes.string,
          // Is the module a dynamic one ?
          defaultDynamicModule: PropTypes.bool,
          // Description of the module
          description: PropTypes.string,
          // Unique identifier of the current module
          id: PropTypes.number,
          // Module type
          type : PropTypes.string,
        }),
      }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    return (
      <div>
        <Field
          name="conf.myParameter"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'admin.example.my.parameter.label' })}
        />
        <Field
          name="conf.myParameter2"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'admin.example.my.parameter2.label' })}
        />
      </div>
    )
  }
}
export default AdminContainer

```

To know all available Field renderer available see the @regardsoss/form-utils module.  
To know more about the labels internationalization see the @regardsoss/i18n module.

### The ModuleContainer

The here-under example module show you the props given to all module by the application when the module is displayed.
The "moduleConf" prop is provided by the application thanks to the administration configuration og the module.
  
In this example we use the "myParameter" config parameter as defined in the previously defined "AdminContainer".

```javascript
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'

class ModuleContainer extends React.Component {
  static propTypes = {
      // Application name "user" or "portal"
      appName: PropTypes.string.isRequired,
      // Current project name
      project: PropTypes.string.isRequired,
      // Module configuration
      moduleConf: ModuleConfiguration.isRequired,
  }
  
   static contextTypes = {
      ...i18nContextType,
      ...themeContextType,
    }
  
  render() {
    return (
     <div>
      <FormattedMessage id="example.message" />
      <div style={this.context.moduleTheme.myParameterStyles}>
        {this.props.moduleConf.myParameter}
       </div>
     </div>
     )
  }
  
}
export default ModuleContainer

```

To know all available Field renderer available see the @regardsoss/form-utils module.  
To know more about the labels internationalization see the @regardsoss/i18n module.

### Styles

All the application use the MaterialUI library to style all components.
In order to create a module compliante to the application theme you can use the "Styles.js" file.

This file can compute your needs with the theme of the application like in the example below.

```javascript
const formStyles = theme => ({

  myParameterStyles: {
    color : theme.palette.textColor,
    width: '250px'
  }

})
export default formStyles
```

The Styles exported are then available in all React.Component in the context as "moduleTheme"

!! The only constraint is to define the contextTypes with the "themeContextType" of the @regardsoss/theme. 

```javascript

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

To know more about the theme management see the @regardsoss/theme module

### Reducer

Each module can define is own Redux reducers. To do so, export them us the reducer parameter of the module.

The example below show how to export your reducers.  
```javascript
const reducers = {
  todos: MyTodosReducer,
  foo: MyFooReducer
}
```

Lazy loadable modules have their own part created in the store if the reducer is exported.  
With the previous example and for a module named "ExampleModule" the application create the here-under subpart of the global application store :  

```json
{
  'modules': {
    'ExampleModule' : {
       'todos': {},
       'foo' : {}
    }
  }
}
```

The store can then be access by both ModuleContainer and AdminContainer.

### MessagesDir

This parameter allow you change the default directory where to find the i18n messages files.  
By default the directory used is src/i18n.  
The files name standard to contains internationalized messages is :  
messages.<language>.i18n.js

Where language can be [en,fr]

### Dependencies

This file define the needed dependency to display each ModuleContainer and AdminContainer.

```javascript

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  'rs-dam@/models/attributes@GET',
]
/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  'rs-dam@/modles/attributes@POST',
]

export default {
  user,
  admin,
}

```

As in the previous example each endpoint dependency is compose in 3 part separated by the '@' caracter.  
`<MICROSERVICE>@<ENDPOINT>@<HTTP_VERB>`


