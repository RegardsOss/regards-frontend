# @regardsoss/project-handler

## Description

This module allow to fetch current project from the rs-admin microservice and store it once for all into the redux store.  
After that, you can access the project information from the redux store.

## Usage

```js
import { ProjectHandler } from '@regardsoss/project-handler'

class SampleComponent extends React.Component {
   
   render(){
      return <ProjectHandler projectName="test"/>
   }
   
}

```

After this component is rendered, you can access project information from store by using the `projectClient` exported.

```js
import {ProjectClient} from '@regardsoss/project-handler'
import {AdminShapes} from '@regardsoss/shape'

class SampleContainer extends React.Component {
  
  static propTypes = {
    project: AdminShapes.Project,
  }
   
   render(){
      // After component is mounted, you can access project from this.props.project
   }
}
const mapStateToProps = (state) => {
  project: ProjectClient.endpointSelectors.getById("test")
}

export default connect(mapStateToProps)(SampleContainer)
```
