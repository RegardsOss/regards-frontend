/*
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { UI_PLUGIN_CONFIGURATION, UI_PLUGIN_CONFIGURATION_ARRAY } from '@regardsoss/api'
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
export default class UIPluginConfigurationActions extends BasicPageableActions {
  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace, isRequestingByUIPlugin = true) {
    // Either you request UIPluginConfiguration by UIPluginDefinition either you can fetch all UIPluginConfiguration
    const entityEndpoint = isRequestingByUIPlugin ? `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/uiplugins/{pluginId}/configurations`
      : `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/uiplugins/configurations`
    super({
      namespace,
      entityEndpoint,
      entityPathVariable: 'pluginConfId',
      schemaTypes: {
        ENTITY: UI_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: UI_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }

  static stringifyBeforeSendingUIPluginConf(entity) {
    if (entity && entity.conf) {
      try {
        const entitySendeable = { ...entity }
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
