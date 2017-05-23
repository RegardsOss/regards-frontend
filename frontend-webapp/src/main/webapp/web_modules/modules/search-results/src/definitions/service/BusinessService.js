/**
* LICENSE_PLACEHOLDER
**/
import Service from './Service'
import DynamicServiceParameter from './DynamicServiceParameter'

/**
 * A business service. Builds and holds a service delegate, like UI Service
 */
export default class BusinessService extends Service {

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
    const resolvedType = dynamicsValues.length ? DynamicServiceParameter.ParameterType.CHOICE : DynamicServiceParameter.ParameterType.STRING
    return new DynamicServiceParameter(name, resolvedType, true, id, dynamicsValues.map(({ value }) => value)) // values are in a subobject
  }

  /**
   * constructor
   * @param businessServiceConfiguration Business service configuration as fetched by the server, like { content: { id, label, parameters } }
   */
  constructor({ content: { id, label, parameters } }) {
    super(label, null, BusinessService.filterDynamicParameters(parameters))
    this.id = id
  }

  /**
   * Export a unique service key
   */
  get serviceKey() {
    return `business-service-${this.id}`
  }

}
