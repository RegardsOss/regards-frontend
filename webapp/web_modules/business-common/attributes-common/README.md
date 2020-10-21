# @regardsoss/attributes-common


## Description

Business common module to supply a React component to configure model attributes lists used in different modules / components.

## Usage


```javascript
 import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
 render = () => (
    <AttributesListConfigurationComponent
      selectableAttributes={availableAttributes}
      attributesList={elements}
      allowLabel
      allowRendererSelection
      allowAttributesGroups
      hintMessageKey="anything"
      attributesListFieldName="my.field.key"
      changeField={changeCallbackOrReduxChange}
      attributesFilter={anyFilterMethod}
    />
  )
```




  
