/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Navigation context state selectors
 */
class DatasetServicesSelectors extends BasicSelector {

  /**
   * Returns dataset services from state
   * @param {*} state state
   * @return [Service] dataset service list for contextual dataset, maybe empty
   */
  getDatasetServices(state) {
    return this.uncombineStore(state).datasetServices
  }

  /**
   * Returns selected dataobjects services from state
   * @param {*} state state
   * @return [Service] selected dataobject services for contextual dataset, maybe empty
   */
  getSelectedDataobjectsServices(state) {
    return this.uncombineStore(state).selectedDataobjectsServices
  }

}

export default new DatasetServicesSelectors(['modules.search-results', 'datasetServices'])
