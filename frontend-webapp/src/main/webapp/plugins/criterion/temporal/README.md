# REGARDS User Interface Search Form Criteria Plugin

This plugin is used by the @regardsoss/search-form module to display search criterion.
Each criteria plugin generate an opensearch query and the @regardsoss/module merge each ones to send full opensearch request.

## Plugin code structure

.  
 ├── src  
 |   ├──   
 |   ├── common          : Plugin common tools and class
 |   ├── components      : React component to display panels  
 |   ├── i18n            : Messages and labels internationalization      
 |   ├── main.js         : Plugin exported index
 |   ├── plugin-info.js  : Plugin definition  
 |   └── reducer.js      : Redux reducers    
 ├── tests  
 ├── package.json    : Npm plugin description file  
 └── README.md  
 
## Plugin entry point

 The entry point of your plugin is the `main.js` file.  
 This file is used by the plugin manager to retrieve all needed informations from your plugin.  
 
 Thanks to the `initPlugin` method all those information are exported.
 
 ```js
initPlugin(<ReactComponent>, <React-redux reducers>, <i18nmessages>, <pluginInfo>)
```
- `ReactComponent` : The main React component to display your plugin
- `React-redux reducers` : Not mandatory (can be null), the reducers to initialize if you need to use redux store.
- `i18nmessages` : Internationalization messages as an object with language as a key (en|fr).
- `pluginInfo` : The plugin-info.json object

 

## plugin-info.json

This file is used by the plugin loader to define the configuration needed by the plugin.

```json
{
  "name": "<%= name %>",
  "description": "<%= description %>",
  "version" : 1.0,
  "author" : "<%= author %>",
  "company" : "<%= company %>",
  "email" : "<%= email %>",
  "url" : "<%= url %>",
  "license": "<%= licence %>",
  "type" : "<%= type %>",
  "conf" : {
    "attributes": [
      {
        "name":"searchField",
        "description": "Attribute to search",
        "type":"string"
      }
    ]
  }
}

```

The conf property allow you to define the needed REGARDS Models attributes needed by your plugin.  
For each defined attributes :
 - `name`       : Name of the attribute passed into your plugin `attributes` react prop.
 - `description`: Description displayed during the plugin configuration from the administration interface
 - `type`       : Type of needed attribute. Possible values ['string','integer','date']

## Main React component 

The main react component exported as the first parameter of the `initPlugin` method from `main.js` is the displayed component.

### Provided parameters

The here under properties are provided at runtime by the plugin loader :
```js
propTypes = {
    /**
     * Plugin unique identifier provided by the plugin loader
     */
    pluginInstanceId: React.PropTypes.string,
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attribute:<AttributeModel>, comparator:<ComparatorEnumType>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
    /**
      * Function to get initial plugin state saved by the savePluginState
      */
    getDefaultState: React.PropTypes.func,
    /**
     * Save the current state in order to retrieve it at initialization with getDefaultState
     */
    savePluginState: React.PropTypes.func,
  }
```

the attributes property is a collection of AttributeModel (see src/common/AttributeModel.js)  

Attributes names used into the onpenSearchQuery can be retrieved from an attribute object using the `getAttributeName` method
```js
import {getAttributeName} from 'common/AttributeModel'
// Retrieve the name to use in openSearchQuery for the first attribute
const name = getAttributeName(this.props.attributes[0])
```

### State management

The state of your plugin is saved by the plugin loader. Thanks to this system, by default the state of your component is initialized with your previous state.  

To save your state manually you can use the `savePluginState` method.  
```js
this.props.savePluginState(this.props.pluginInstanceId, this.state)
```
To retrieve your previous saved state you can use the `getDefaultState` method
```js
this.props.getDefaultState(this.props.pluginInstanceId)
```

### Set or update your criteria value

First you need to define a method `getPluginSearchQuery` into your main react component.
This method have the here under signature :
```js
getPluginSearchQuery = (state) => {
  const openSearchQuery = '<query>'
  return openSearchQuery
}
```

This method is used by the plugin manager to retrieve the openSearchQuery of your plugin.  

To inform manually that your plugin value changed you can use the method `_onPluginChangeValue` from the upper class PluginComponent
```js
this.onPluginChangeValue
```
## Compile your plugin

To compile your plugin you need the regards core.bundle.js. This bundle is a dependency in the webpack.config.js
```
 manifest: require(`${__dirname}/../../../dist/prod/core-manifest.json`),
```

After setting the core.bundle.js, you can run the here under command to build the plugin

```bash
$ npm run build 
```

### Test your plugin

```bash
$ npm run test 
```

### Lint your plugin

```bash
$ npm run lint:fix 
```

### Deploy plugin into regards 

After compiling your plugin you have a plugin.js file. Copy this file in the `/plugins` repository of the `rs-frontend microservice`.
The throught the administrator interface you can add the plugin from the "User interface / Plugins" menu.  
Indicate your plugin path like `/plugins/sample/plugin.js` and save plugin.  

At this step, your plugin is ready to be used.