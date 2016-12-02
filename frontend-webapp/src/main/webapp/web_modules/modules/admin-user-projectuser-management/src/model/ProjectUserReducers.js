import { BasicListReducers } from '@regardsoss/store-utils'
import { ProjectUserConfiguration } from '@regardsoss/api'
import ProjectUserActions from './ProjectUserActions'

class ProjectUserReducers extends BasicListReducers {
  constructor() {
    super(ProjectUserConfiguration, ProjectUserActions)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new ProjectUserReducers()
export default instance
