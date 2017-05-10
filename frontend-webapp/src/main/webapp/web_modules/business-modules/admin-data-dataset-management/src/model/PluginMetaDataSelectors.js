/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginMetaDataSelectors extends BasicPageableSelectors {
  constructor(type) {
    super(['admin', 'data-management', 'dataset', `plugin-meta-data-${type}`])
  }
}

export const PluginMetaDataFiltersSelectors = new PluginMetaDataSelectors('filters')
export const PluginMetaDataConvertersSelectors = new PluginMetaDataSelectors('converters')
export const PluginMetaDataServicesSelectors = new PluginMetaDataSelectors('services')

