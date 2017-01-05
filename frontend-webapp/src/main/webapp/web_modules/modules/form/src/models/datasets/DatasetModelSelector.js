/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class DatasetModelSelector extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'modules', 'form.models'])
  }
}

const instance = new DatasetModelSelector()
export default instance
