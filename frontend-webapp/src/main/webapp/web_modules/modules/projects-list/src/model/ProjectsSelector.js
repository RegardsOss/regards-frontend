/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicPageableSelectors {
  constructor(application) {
    super(['modules.projects-list', 'projects'])
  }
}

const instance = application => new ProjectSelectors(application)
export default instance
