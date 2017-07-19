/**
* LICENSE_PLACEHOLDER
**/

/**
 * Plugin service run model: packed data to execute a service
 */
class PluginServiceRunModel {

  /**
   * Plugin service types
   */
  static ServiceTypes = {
    /** UI plugin service (A JS runnable package) */
    UI_PLUGIN_SERVICE: 'ui.plugin.service',
    /** Catalog plugin service (A callable backend endpoint) */
    CATALOG_PLUGIN_SERVICE: 'catalog.plugin.service',
  }

  /**
   * Constructor
   * @param {PluginService} serviceConfiguration fetched plguin service configuration
   * @param {PluginServiceRunModel.ServiceTypes} type corresponding service type (ore of serviceTypes)
   * @param {OneElementTarget|ManyElementsTarget} target execution target
   */
  constructor(serviceConfiguration, type, target) {
    this.serviceConfiguration = serviceConfiguration
    this.type = type
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
