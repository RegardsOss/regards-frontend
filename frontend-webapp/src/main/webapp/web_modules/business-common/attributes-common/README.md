# @regardsoss/attributes-common


## Description

Business common module to supply a React component to configure model attributes to display in results tables after a catalog search.
This Component as to be used in a reduxForm form.

Parameters : 
 - allowFacettes : Do the facettes are enabled for configuration for each attribute ?
 - allowAttributesRegroupements : Do the component provide tools to create regroupements of attributes into a single virtual attribute
 - attributesFieldName : Path to the attributes configuration object in the ReduxForm
 - regroupementsFieldName : Path to the attributes regroupments configuration object in the ReduxForm
 - attributesConf : attributes configuration object from the ReduxForm
 - attributesRegroupementsConf : attributes regroupments configuration object from the ReduxForm
 - defaultAttributesConf : Initial attributes configuration object. Used to reset form.
 - defaultAttributesRegroupementsConf : Initial attributes regroupments configuration object. Used to reset form.
 - selectableAttributes : List of all attributeModels configurable.
 - changeField : change function from ReduxForm

## Usage


```javascript
 import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
 render = () => (
    <MainAttributesConfigurationComponent
      allowFacettes={true}
      allowAttributesRegroupements={true}
      attributesFieldName={"conf.attributes"}
      regroupementsFieldName={"conf.attributesRegroupements"}
      attributesConf={attributesConf}
      attributesRegroupementsConf={attributesRegroupementsConf}
      defaultAttributesConf={defaultAttributesConf}
      defaultAttributesRegroupementsConf={defaultAttributesRegroupementsConf}
      selectableAttributes={selectableAttributes}
      changeField={changeField}
    />
  )
```




  
