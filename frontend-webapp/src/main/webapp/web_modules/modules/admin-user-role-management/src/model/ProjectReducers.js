import { BasicListReducers } from '@regardsoss/store-utils'
import ProjectActions from './ProjectActions'

class ProjectReducers extends BasicListReducers {
  constructor() {
    super({
      entityKey: 'name',
      normalizrKey: 'projects',
    }, ProjectActions)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new ProjectReducers()
export default instance
