/**
* LICENSE_PLACEHOLDER
**/
import reduce from 'lodash/reduce'
import Service from './Service'
import DynamicServiceParameter from './DynamicServiceParameter'


/**
 * A business service. Builds and holds a service delegate, like UI Service
 */
export default class UIService {

  static SERVICE_TARGETS = {
    DATAOBJECT: 'DATAOBJECT',
    DATASET: 'DATASET',
    DATAOBJECTS_QUERY: 'DATAOBJECTS_QUERY',
  }

  /**
   * Converts UI services models as returned by the server to local models and returns them partitioned
   * @param servicesModels services models
   * @return converted services
   */
  static convert(servicesModels = []) {
    reduce(servicesModels, (acc, serviceModel) => {
      const target = serviceModel.conf && serviceModel.conf.target
      switch (target) {
        case UIService.SERVICE_TARGETS.DATASET:
          return {
            ...acc,
            uiDatasetServices: [...acc.uiDatasetServices, new UIService(serviceModel)],
          }
        case UIService.SERVICE_TARGETS.DATAOBJECT:
          return {
            ...acc,
            uiDataobjectServices: [...acc.uiDataobjectServices, new UIService(serviceModel)],
          }
        case UIService.SERVICE_TARGETS.DATAOBJECTS_QUERY:
          return {
            ...acc,
            uiSelectedDataobjectsService: [...acc.uiSelectedDataobjectsService, new UIService(serviceModel)],
          }
        default:
          // unhandled service
          return acc
      }
    }, {
      uiDatasetServices: [],
      uiDataobjectServices: [],
      uiSelectedDataobjectsService: [],
    })
  }

  /**
   * Converts parameters to dynamic parameters
   * @param dynamicParameters dynamic parameters (optional)
   * @return dynamic parameters converted or an empty array
   */
  static convertDynamicParameters(dynamicParameters = []) {
    return dynamicParameters.map(UIService.convertDynamicParameters)
  }

  /**
   * Converts parameter to dynamic parameter
   * @param parameter parameter (decomposed)
   */
  static convertToDynamicParameter({ label, required }) {
    return new DynamicServiceParameter(label, required)
  }

  /**
   * constructor
   * @param uiServiceConfiguration UI service configuration as fetched by the server
   */
  constructor(uiServiceConfiguration) {
    // convert the service model into service data
    const { id, label, conf: { dynamic: dynamicParameters } } = uiServiceConfiguration.content

    this.service = new Service(label, id, UIService.convertDynamicParameters(dynamicParameters))
  }

}
