# REGARDS User Interface Catalog Service Plugin

This plugin is used by the @regardsoss/search-results module to display services associated to catalog datas.

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
  "icon": {
      "content": "<g><g id=\"Layer_1_17_\"><g><g><g><path d=\"M84.762,41.232c-4.92,3.529-11.826,8.222-14.941,8.222c-0.617,0-0.815-0.186-0.959-0.361       c-1.272-1.568-0.928-7.066,1.025-16.335c0.193-0.918-0.291-1.841-1.152-2.204c-0.861-0.365-1.861-0.066-2.383,0.71       c-6.721,10.021-9.799,12.123-11.194,12.123c-1.979,0-3.99-5.692-5.986-16.92c-0.159-0.896-0.915-1.549-1.813-1.601v-0.011       c-0.019,0-0.037,0.004-0.056,0.004c-0.019,0-0.04-0.004-0.058-0.004v0.011c-0.895,0.052-1.649,0.705-1.811,1.601       c-1.998,11.228-4.011,16.92-5.988,16.92c-1.396,0-4.472-2.103-11.192-12.123c-0.521-0.776-1.521-1.075-2.384-0.71       c-0.862,0.363-1.346,1.286-1.152,2.204c1.952,9.269,2.299,14.767,1.024,16.335c-0.141,0.176-0.342,0.361-0.958,0.361       c-3.115,0-10.021-4.692-14.943-8.222c-0.778-0.559-1.845-0.468-2.52,0.209c-0.676,0.674-0.765,1.741-0.207,2.52       c11.253,14.392,9.135,30.91,9.135,30.91c-0.041,0.229-0.063,0.463-0.063,0.709c0,4.058,5.682,5.664,10.631,6.61       c5.453,1.045,12.635,1.627,20.266,1.647v0.002c0.073,0,0.147,0,0.22-0.002c0.073,0.002,0.146,0.002,0.221,0.002v-0.002       c7.629-0.021,14.812-0.603,20.263-1.647c4.95-0.946,10.633-2.555,10.633-6.61c0-0.246-0.022-0.479-0.063-0.709       c0,0-2.117-16.521,9.134-30.91c0.559-0.778,0.471-1.846-0.205-2.52C86.607,40.766,85.542,40.674,84.762,41.232z M47.522,78.238       h-0.015c-0.07,0-0.137,0.003-0.206,0.003c-0.07,0-0.135-0.003-0.205-0.003h-0.015c-12.127-0.035-20.144-1.446-23.682-2.657       c3.538-1.213,11.555-2.624,23.682-2.658h0.029c0.063,0,0.126,0,0.19,0s0.124,0,0.19,0h0.03       c12.126,0.034,20.142,1.445,23.681,2.658C67.664,76.792,59.648,78.203,47.522,78.238z\" fill=\"#FFFFFF\"/></g></g><g><g><circle cx=\"47.302\" cy=\"16.573\" r=\"5.914\" fill=\"#FFFFFF\"/></g></g><g><g><circle cx=\"22.339\" cy=\"23.718\" r=\"4.928\" fill=\"#FFFFFF\"/></g></g><g><g><circle cx=\"71.855\" cy=\"23.718\" r=\"4.928\" fill=\"#FFFFFF\"/></g></g><g><g><circle cx=\"3.322\" cy=\"37.759\" r=\"3.322\" fill=\"#FFFFFF\"/></g></g><g><g><circle cx=\"91.178\" cy=\"37.759\" r=\"3.322\" fill=\"#FFFFFF\"/></g></g></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>",
      "viewBox": "0 0 94.5 94.5"
  },
  "conf": {
      "target": "<%= target %>",
      "static": {
        "static1": {
          "type": "foo",
          "required": false
        }
      },
      "dynamic": {
        "dynamic1": {
          "label": "bar",
          "type": "string",
          "required": false
        }
      }
  }
}

```

The conf property allow you to define parameters needed by your plugin.
  - `target` : [DATASET,DATAOBJECTS,DATAOBJECT], the entities target of the service
  - `static` : Static parameters configured by administration
  - `dynamic` : Dynamic parameters asked into the user interface before plugin execution.
  
For each defined parameter :
 - `required`: Does the parameter is required or optional?
 - `type`    : Type of parameter. Possible values ['string','integer','date']

## Main React component 

The main react component exported as the first parameter of the `initPlugin` method from `main.js` is the displayed component.

### Provided parameters

The here under properties are provided at runtime by the plugin loader :
```js
propTypes = {
    /**
     * Plugin unique identifier provided by the plugin loader
     */
    pluginInstanceId: PropTypes.string,
}
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