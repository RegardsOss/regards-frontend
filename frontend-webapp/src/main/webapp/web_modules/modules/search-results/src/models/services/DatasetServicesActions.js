/**
* LICENSE_PLACEHOLDER
**/

/**
 * Dataset services publish actions (resolved by some point, used by some other unrelated)
 */
class DatasetServicesActions {

  constructor() {
    this.PUBLISH_CURRENT_DATASET_SERVICES = 'search-results/dataset-services/PUBLISH_CURRENT'
  }

  /**
   * Updates store dataset services for current dataset: global and selection services
   * @param {*} datasetServices dataset services
   * @param {*} selectedDataobjectsServices selected dataobjects services for current dataset
   */
  publishCurrentDatasetServices(datasetServices = [], selectedDataobjectsServices = []) {
    return {
      type: this.PUBLISH_CURRENT_DATASET_SERVICES,
      datasetServices,
      selectedDataobjectsServices,
    }
  }

}

export default new DatasetServicesActions()
