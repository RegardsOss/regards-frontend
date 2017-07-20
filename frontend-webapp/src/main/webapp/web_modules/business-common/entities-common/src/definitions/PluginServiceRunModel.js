/**
* LICENSE_PLACEHOLDER
**/

/**
 * Plugin service run model: packed data to execute a service
 */
class PluginServiceRunModel {

  /**
   * Constructor
   * @param {PluginService} serviceConfiguration fetched plguin service configuration, WITHOUT CONTENT ROOT
   * @param {AccessDomain.pluginTypes} type corresponding service type
   * @param {OneElementTarget|ManyElementsTarget} target execution target
   */
  constructor(serviceConfiguration, type, target) {
    this.serviceConfiguration = serviceConfiguration
    this.target = target
  }

  /**
   * @return a unique key for service (catalog and UI service conf index are not coming from the same tables)
   */
  get key() {
    return `${this.type}/${this.serviceConfiguration.content.id}`
  }

  /**
   * @return service label
   */
  get label() {
    return this.serviceConfiguration.content.label
  }

  /**
   * @return service icon
   */
  get icon() {
    return this.serviceConfiguration.content.icon
  }

}

export default {
  PluginServiceRunModel,
}
