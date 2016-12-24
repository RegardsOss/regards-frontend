/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicPageableSelectors {
  constructor(application) {
    super([application, 'modules', 'projects-list.projects'])
  }
}

const instance = application => new ProjectSelectors(application)
export default instance
