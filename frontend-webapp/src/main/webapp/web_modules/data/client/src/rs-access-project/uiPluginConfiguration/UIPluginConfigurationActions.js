/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle UIPluginConfiguration entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, example :  'module/themes'. Must be the same as the namespace
 * used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of projects. You have to define two
 * ProjectActions with two different namespace.
 *
 * @author Léo Mieulet
 */
class UIPluginConfigurationActions extends BasicPageableActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace, isRequestingByUIPlugin = true) {
    // Either you request UIPluginConfiguration by UIPluginDefinition either you can fetch all UIPluginConfiguration
    const entityEndpoint = isRequestingByUIPlugin ? `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-project/plugin/{plugin_id}/config` :
      `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-project/plugin-config`
    super({
      namespace,
      entityEndpoint,
      schemaTypes: {
        ENTITY: Schemas.UI_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.UI_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }

  static stringifyBeforeSendingUIPluginConf(entity) {
    if (entity && entity.conf) {
      try {
        const entitySendeable = Object.assign({}, entity)
        entitySendeable.conf = JSON.stringify(entity.conf)
        return entitySendeable
      } catch (e) {
        console.error('Unexpected error while stringifying a subset of a UIPluginConfiguration', e)
      }
    }
    return entity
  }

  createEntity(entity, pathParams, queryParams) {
    const entitySendeable = UIPluginConfigurationActions.stringifyBeforeSendingUIPluginConf(entity)
    return super.createEntity(entitySendeable, pathParams, queryParams)
  }

  updateEntity(keyValue, entity, pathParams, queryParams) {
    const entitySendeable = UIPluginConfigurationActions.stringifyBeforeSendingUIPluginConf(entity)
    return super.updateEntity(keyValue, entitySendeable, pathParams, queryParams)
  }
}

export default namespace => new UIPluginConfigurationActions(namespace)
