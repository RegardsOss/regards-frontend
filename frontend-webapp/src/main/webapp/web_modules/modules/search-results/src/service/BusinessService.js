/**
* LICENSE_PLACEHOLDER
**/
import Service from './Service'
import DynamicServiceParameter from './DynamicServiceParameter'

/**
 * A business service. Builds and holds a service delegate, like UI Service
 */
export default class BusinessService {

  /**
   *  Filters and converts parameters to dynamic parameters
   * @param parameters business service config parameters
   * @return dynamic parameters converted or an empty array
   */
  static filterDynamicParameters(parameters = []) {
    return parameters.reduce((acc, parameter) => parameter.dynamic ?
      [...acc, BusinessService.convertToDynamicParameter(parameter)] : acc, [])
  }

  /**
   * Converts parameter to dynamic parameter
   * @param parameter parameter (decomposed)
   */
  static convertToDynamicParameter({ id, name, dynamic, dynamicsValues = [] }) {
    return new DynamicServiceParameter(name, true, id, dynamicsValues.map(({ value }) => value)) // values are in a subobject
  }

  /**
   * constructor
   * @param businessServiceConfiguration Business service configuration as fetched by the server
   */
  constructor(businessServiceConfiguration) {
    // convert the service model into service data
    const { label, parameters } = businessServiceConfiguration.content

    this.service = new Service(label, null, BusinessService.filterDynamicParameters(parameters))
  }

}
