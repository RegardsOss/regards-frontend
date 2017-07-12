/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicActions from '../BasicActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions to retrieve an array of value
 *
 *  @Return dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicArrayActions extends BasicActions {

  fetchEntityList(pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
    }
  }


}


export default BasicArrayActions
