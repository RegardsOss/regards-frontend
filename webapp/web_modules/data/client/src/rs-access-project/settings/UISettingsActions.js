/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import { getJSON } from 'redux-api-middleware'
import { UIDomain } from '@regardsoss/domain'
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

/**
 * Action to handle UI settings CRUD. For information, also the CRUD allows many application IDs, those
 * actions handle only "user" application ID.
 * By default, those actions are provided with a namespace to be shared accros UI modules, in user app.
 */
export class UISettingsActions extends BasicSignalActions {
  /**
   * Constructor
   * @param {string} namespace leave empty to get defaut one
   */
  constructor(namespace = 'user/common/ui-settings') {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/configuration/{applicationId}`,
      namespace,
    })
  }

  /**
   * @return {*} redux action to dispatch to get settings
   */
  getSettings() {
    return this.sendSignal(RequestVerbEnum.GET, null, { applicationId: UIDomain.APPLICATIONS_ENUM.USER })
  }

  /**
   * @param {string} verb operation verb
   * @param {*} settings values to set, matching UIShapes.settings
   */
  getSettingsOperation(verb, settings) {
    return this.sendSignal(verb, { configuration: JSON.stringify(settings) }, { applicationId: UIDomain.APPLICATIONS_ENUM.USER })
  }

  /**
   * @param {*} settings value to create, matching UIShapes.UISettings
   * @return {*} redux action to dispatch to create settings
   */
  createSettings(settings) {
    return this.getSettingsOperation(RequestVerbEnum.POST, settings)
  }

  /**
   * @param {*} settings values to update, matching UIShapes.UISettings
   * @return {*} redux action to dispatch to update settings
   */
  updateSettings(settings) {
    return this.getSettingsOperation(RequestVerbEnum.PUT, settings)
  }

  /**
   * Build results: Extracts in JSON return value the configuration field (used by server DTO)
   * @param {*} res action result
   * @return {Promise} result reading promise
   */
  buildResults = (res) => getJSON(res).then((json) => JSON.parse(json.content.configuration))
}
