/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Module Entities
 */
class DatasetSelector extends BasicPageableSelectors {
  constructor(application) {
    super([application, 'modules', 'form.datasets'])
  }
}

const instance = application => new DatasetSelector(application)
export default instance
