/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicListActions } from '@regardsoss/store-utils'
import { SETTINGS, SETTINGS_ARRAY } from '@regardsoss/api'

/**
 * Project user (accesses) settings actions. Those actions are a bit specific as they work
 * with the single backend entity AccessSettings (retrieve / update)
 * @author Raphaël Mechali
 */
export default class ProjectUserSettingsActions extends BasicListActions {
  /**
   * Constructor
   * @param {string} namespace  actions namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/accesses/settings`,
      schemaTypes: {
        ENTITY: SETTINGS,
        ENTITY_ARRAY: SETTINGS_ARRAY,
      },
    })
  }
}
