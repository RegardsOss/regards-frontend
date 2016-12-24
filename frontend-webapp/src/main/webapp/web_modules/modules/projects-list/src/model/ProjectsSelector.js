/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicPageableSelectors {
  constructor() {
    super(['portal', 'projects'])
  }
}

const instance = new ProjectSelectors()
export default instance
