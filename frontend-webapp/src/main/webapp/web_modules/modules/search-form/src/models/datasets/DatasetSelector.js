/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux store selectors for Dataset Entities
 * @author Sébastien binda
 */
class DatasetSelector extends BasicPageableSelectors {
  constructor() {
    super(['modules.search-form', 'datasets'])
  }
}

const instance = new DatasetSelector()
export default instance
