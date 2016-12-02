import { BasicListReducers } from '@regardsoss/store-utils'
import { ProjectConfiguration } from '@regardsoss/api'
import ProjectActions from './ProjectActions'

class ProjectReducers extends BasicListReducers {
  constructor() {
    super(ProjectConfiguration, ProjectActions)
    console.log(ProjectConfiguration)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new ProjectReducers()
export default instance
