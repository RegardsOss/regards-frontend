/*
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'

class ProjectConnectionSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'database-management', 'projectConnection'])
  }
}

const instance = new ProjectConnectionSelectors()
export default instance
