/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RSAA, getJSON } from 'redux-api-middleware'
import BasicActions from '../BasicActions'
/**
 *  Provide actions to retrieve an array of value
 *
 *  @Return dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicArrayActions extends BasicActions {
  constructor(options) {
    super(options)
    this.namespace = options.namespace
    this.ENTITY_LIST_REQUEST = `${options.namespace}/LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/LIST_FAILURE`
  }

  fetchEntityList(pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(this.ENTITY_LIST_SUCCESS, (action, state, res) => getJSON(res)),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint: BasicActions.buildURL(this.entityEndpoint, pathParams, queryParams),
        method: 'GET',
      },
    }
  }
}


export default BasicArrayActions
