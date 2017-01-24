/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

class ProjectSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'model-attribute-management', 'model'])
  }
}

const instance = new ProjectSelectors()
export default instance
