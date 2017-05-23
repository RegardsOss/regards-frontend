/**
* LICENSE_PLACEHOLDER
**/
import datasetServicesPublishActions from './DatasetServicesActions'

/**
 * Default navigation context state
 */
export const DEFAULT_STATE = {
  datasetServices: [], // dataset services for current dataset (see Service class)
  selectedDataobjectsServices: [], // dataobjects services for current dataset (see Service class)
}

const reduce = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case datasetServicesPublishActions.PUBLISH_CURRENT_DATASET_SERVICES:
      return {
        datasetServices: action.datasetServices,
        selectedDataobjectsServices: action.selectedDataobjectsServices,
      }
    default:
      return state
  }
}

export default reduce
