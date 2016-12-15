/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ProjectConnectionSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'database-management', 'projectConnection'])
  }
}

const instance = new ProjectConnectionSelectors()
export default instance
