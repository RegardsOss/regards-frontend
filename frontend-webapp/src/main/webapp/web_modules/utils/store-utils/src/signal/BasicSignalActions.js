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
 */
/**
 * @author Léo Mieulet
 */
import isEmpty from 'lodash/isEmpty'
import BasicActions from '../BasicActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions for calling any url of the backend
 *  @Return dispatcheable redux actions
 */
class BasicSignalActions extends BasicActions {

  constructor(options) {
    super(options)
    this.SIGNAL_REQUEST = `${options.namespace}/REQUEST`
    this.SIGNAL_SUCCESS = `${options.namespace}/SUCCESS`
    this.SIGNAL_FAILURE = `${options.namespace}/FAILURE`
  }

  /**
   * Fetch the corresponding route using your verb, body, path and query parameters
   * @param verb
   * @param bodyParam
   * @param pathParams
   * @param callApi method,
   * @returns {{}}
   */
  sendSignal(verb, bodyParam, pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    let body
    if (!isEmpty(bodyParam)) {
      if (verb === 'GET') {
        throw new Error('There should be no body parameter on GET method')
      }
      body = JSON.stringify(bodyParam)
    }
    return {
      [CALL_API]: {
        types: [
          this.SIGNAL_REQUEST,
          {
            type: this.SIGNAL_SUCCESS,
            payload: (action, state, res) => res.status === 204 ? null : this.buildResults(res),
          },
          this.buildFailureAction(this.SIGNAL_FAILURE),
        ],
        headers: this.headers,
        endpoint,
        method: verb,
        body,
      },
    }
  }

  /**
   * Behavior: build result from fetch result
   * @param {*} res fetch result
   * @return result
   */
  // eslint-disable-next-line class-methods-use-this
  buildResults(stream) {
    return getJSON(stream).then(json => json)
  }

}


export default BasicSignalActions
