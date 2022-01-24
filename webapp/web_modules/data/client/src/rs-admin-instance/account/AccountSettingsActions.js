/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { SETTINGS, SETTINGS_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Accounts settings actions. Those actions are a bit specific as they work with the single backend entity
 * AccountSettings (retrieve / update)
 * @author Raphaël Mechali
 */
export default class AccountSettingsActions extends BasicListActions {
  /**
   * Constructor
   * @param {string} namespace  actions namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.IMSERVICES.ADMIN_INSTANCE}/settings`,
      schemaTypes: {
        ENTITY: SETTINGS,
        ENTITY_ARRAY: SETTINGS_ARRAY,
      },
    })
  }

  /**
   * @return {*} redux action to dispatch to fetch settings
   */
  getSettings() {
    return this.sendSignal('GET')
  }

  /**
   * @param settings settings entity updated (pay attention to keep id in it)
   * @return {*} redux action to dispatch to update settings
   */
  updateSettings(settings) {
    return this.sendSignal('PUT', settings)
  }
}
