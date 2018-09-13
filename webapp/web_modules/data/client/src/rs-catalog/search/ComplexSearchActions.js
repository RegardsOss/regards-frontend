/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicPageableActions, BasicListActions } from '@regardsoss/store-utils'
import { ENTITY, ENTITY_ARRAY } from '@regardsoss/api'

const { CALL_API } = require('redux-api-middleware')

/**
 * Complex search entities actions
 * @author Raphaël Mechali
 */
export default class ComplexSearchActions extends BasicPageableActions {
  /**
   * Constructor
   * @param {*} namespace namespace for actions
   * @param {*} endpoint endpoint (optional, default to generic search catalog endpoint)
   */
  constructor(namespace,
    endpoint = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/complex/search`) {
    super({
      namespace,
      entityEndpoint: endpoint,
      schemaTypes: {
        ENTITY,
        ENTITY_ARRAY,
      },
    })
  }

  /**
   * Fetch a page of entities: adapter to basic pageable API for consumers like infinite pageable table
   *
   * @param pageNumber pagination param : page number to request
   * @param size pagination param : number of elements for the asked page
   * @param pathParams path parameters (unused here)
   * @param queryParams query parameters: must contain requests to put in body
   * @returns {*} redux action to dispatch
   */
  fetchPagedEntityList(pageNumber, size, pathParams, queryParams) {
    return this.search(pageNumber, size, queryParams.requests)
  }

  /**
   * Builds and return action to dispatch to search results.
   * Note: it replaces fetchPagedEntityList as this endpoint uses POST method and not GET (plus it has no parameter in URL),
   * but does not match exactly the API (pathParams and queryParams are both replace with list of requests)
   *
   * @param {number} page page number to request
   * @param {number} size number of elements for the page
   * @param {[{ engineType: string, datasetUrn: string, searchParameters: {*}, entityIdsToInclude: [string], entityIdsToExclude: [string], searchDateLimit: string  }]} requests list of requests to join when building
   * @return {*} redux action to fetch complex search results
   */
  search(page, size, requests = []) {
    // the following code is partially copied from BasicPageableActions (class API does not allow
    // removing pageSize and page number nor setting the request mode and body)
    return {
      [CALL_API]: {
        // MIMIC a common list request (to be able using the BasicPageableReducer)
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(
            this.ENTITY_LIST_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntitiesPagePayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint: this.entityEndpoint,
        headers: this.headers,
        method: 'POST',
        // fr.cnes.regards.modules.search.domain.ComplexSearchRequest
        body: JSON.stringify({
          page,
          size,
          requests,
        }),
      },
    }
  }
}
