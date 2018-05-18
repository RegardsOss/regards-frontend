# @regardsoss/endpoints-common

## Description

This module allow to manipulate REGARDS catalog entities.

## Usage

This module exports :
  - DownloadDescriptionClient
  - DetailViewContainer

### DownloadDescriptionClient

Client to retrieve information about entities description files.  
Description files can be markdown or PDF files.

### DetailViewContainer

React component to display a dialog with entity information : 
  - attributes values
  - description
  - tags
  
To use this component you have to :

```js
import {DetailViewContainer} from '@regardsoss/entities-common'

class SampleComponent extends React.Component {
   
   render(){
      return (
        <DetailViewContainer
          // Does the dialog is opened ?
          open={this.state.opened}
          // Entity to display  
          entity={entity}
          // Close dialog compoenent
          onClose={() => this.setState({opened:false})}
          // Action callback when click on a entity tag
          onSearchTag={() => {}}
        />
      )
   }
}
```