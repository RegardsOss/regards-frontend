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
 */
import { BasicArrayActions } from '@regardsoss/store-utils'

export default class SearchSessionsActions extends BasicArrayActions {
  static ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/sessions/names`

  static ENTITY_ID = 'session_id'

  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: SearchSessionsActions.ENDPOINT,
      entityPathVariable: SearchSessionsActions.ENTITY_ID,
    })
  }

  /**
   * Action's function to call and set parameters for the dispatch
   * @param {*} text string
   */
  autoCompleteActionDispatch(text) {
    return this.fetchEntityList(null, { name: text })
  }
}
