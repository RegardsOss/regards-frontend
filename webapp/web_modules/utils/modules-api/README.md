## Description

This module provides tools to implement regards user interface modules

# Dependencies

To use the REGARDS `modules` you must add the here under package to your package.json dependencies :
 - @regardsoss/modules


## How to

### Provide expected DynamicModulePane data

Most user interface dynamic modules are rendered using the @regardsoss/componenets DynamicModulePane. That component
takes in account the standard modules configuration (title, icon, description, expandable, expanded, and so on...)
In order to initialize it, the easier and safer way through is to use this helper properties filter as follow:

```javascript
// in main module component, that will render the DynamicModulePane
// note that you can use the same method
import { modulesHelper } from '@regardsoss/modules-api'
import { DynamicModulePane } from '@regardsoss/components'
// ...

render(){
  //...
  return (
    <DynamicModulePane {...modulesHelper.getReportedUserModuleProps(this.props)}>
    { /*... */}
    </DynamicModulePane>
}

initPlugin(MyRootContainer, reducer, messages, pluginInfo)

```

The same method can be applied when initializing module admin forms, using `modulesHelper.getReportedAdminModuleProps`


### Extends default plugin