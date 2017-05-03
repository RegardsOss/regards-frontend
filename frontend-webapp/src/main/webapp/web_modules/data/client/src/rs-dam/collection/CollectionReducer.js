/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { CollectionConfiguration } from '@regardsoss/api'
import CollectionActions from './CollectionActions'

/**
 * Redux store reducer for Plugin MetaData entities
 * @author Léo Mieulet
 */
class PluginMetaDataReducer extends BasicListReducers {
  constructor(namespace) {
    super(CollectionConfiguration, new CollectionActions(namespace))
  }
}

export default (namespace) => {
  const instance = new PluginMetaDataReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
