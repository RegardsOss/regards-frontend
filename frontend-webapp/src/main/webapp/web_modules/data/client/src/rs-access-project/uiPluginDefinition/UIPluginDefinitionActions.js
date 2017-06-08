/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle UIPluginDefinition entities from backend server.
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
export default class UIPluginDefinitionActions extends BasicPageableActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/plugins/definition`,
      entityPathVariable: 'pluginId',
      schemaTypes: {
        ENTITY: Schemas.PLUGIN,
        ENTITY_ARRAY: Schemas.PLUGIN_ARRAY,
      },
    })
  }
}
