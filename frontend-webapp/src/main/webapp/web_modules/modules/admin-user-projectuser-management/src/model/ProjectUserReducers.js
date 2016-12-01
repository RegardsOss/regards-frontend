import { BasicListReducers } from '@regardsoss/store-utils'
import ProjectUserActions from './ProjectUserActions'

class ProjectUserReducers extends BasicListReducers {
  constructor() {
    super({
      entityKey: 'name',
      normalizrKey: 'projects',
    }, ProjectUserActions)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new ProjectUserReducers()
export default instance
