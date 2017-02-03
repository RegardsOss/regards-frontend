/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 * @author Sébastien binda
 */
class DatasetModelSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'models'])
  }
}

const instance = new DatasetModelSelector()
export default instance
