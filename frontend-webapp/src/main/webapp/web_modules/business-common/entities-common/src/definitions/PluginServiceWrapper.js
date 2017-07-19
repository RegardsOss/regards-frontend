/**
* LICENSE_PLACEHOLDER
**/

/**
 * Plugin service configuration wrapper: stores the fetched service configuration with corresponding type
 */
class PluginServiceWrapper {

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
   * Is wrapper as parameter a UI plugin service
   * @param {PluginServiceWrapper} wrapper -
   */
  static isUIPluginService(wrapper) {
    return wrapper.type === PluginServiceWrapper.ServiceTypes.UI_PLUGIN_SERVICE
  }

  /**
   * Is wrapper as parameter a catalog plugin service
   * @param {PluginServiceWrapper} wrapper -
   */
  static isCatalogPluginService(wrapper) {
    return wrapper.type === PluginServiceWrapper.ServiceTypes.CATALOG_PLUGIN_SERVICE
  }

  /**
   * Builds a UI plugin service wrapper
   * @param {*} pluginService plugin service as returned by rs-access endpoint
   */
  static buildUIPluginService(pluginService) {
    return new PluginServiceWrapper(pluginService, PluginServiceWrapper.UI_PLUGIN_SERVICE)
  }

  /**
   * Builds a catalog plugin service wrapper
   * @param {*} pluginService plugin service as returned by rs-access endpoint
   */
  static buildCatalogPluginService(pluginService) {
    return new PluginServiceWrapper(pluginService, PluginServiceWrapper.UI_PLUGIN_SERVICE)
  }

  /**
   * Constructor
   * @param {*} serviceConfiguration fetched service configuration
   * @param {*} type corresponding service type (ore of serviceTypes)
   */
  constructor(serviceConfiguration, type) {
    this.serviceConfiguration = serviceConfiguration
    this.type = type
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
  PluginServiceWrapper,
}
