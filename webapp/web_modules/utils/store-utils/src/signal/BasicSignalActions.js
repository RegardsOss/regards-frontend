/**
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
/**
 * @author Léo Mieulet
 */
import { RSAA, getJSON } from 'redux-api-middleware'
import BasicActions from '../BasicActions'

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
   * @param queryParams method,
   * @returns {{}}
   */
  sendSignal(verb, bodyParam, pathParams, queryParams) {
    let body
    if (bodyParam !== null) {
      if (verb === 'GET') {
        throw new Error('There should be no body parameter on GET method')
      }
      body = JSON.stringify(bodyParam)
    }
    return {
      [RSAA]: {
        types: [
          this.SIGNAL_REQUEST,
          this.buildSuccessAction(
            this.SIGNAL_SUCCESS,
            (action, state, res) => res.status === 204 ? null : this.buildResults(res),
          ),
          this.buildFailureAction(this.SIGNAL_FAILURE),
        ],
        method: verb,
        endpoint: BasicActions.buildURL(this.entityEndpoint, pathParams, queryParams),
        headers: this.headers,
        options: this.options,
        body,
      },
    }
  }

  /**
   * Allows to send multiple objects on the same time
   * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
   * @param files Object containing key - values with key expected by the API and value a file
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  sendEntityUsingMultiPart(verb, objectValues, files, pathParams, queryParams) {
    return this.buildMultiPartsRSAAction(this.entityEndpoint, pathParams, queryParams,
      BasicActions.createFormDataWithFilesMap(objectValues, files), [
        this.SIGNAL_REQUEST,
        this.buildSuccessAction(
          this.SIGNAL_SUCCESS,
          (action, state, res) => res.status === 204 ? null : this.buildResults(res),
        ),
        this.buildFailureAction(this.SIGNAL_FAILURE),
      ], verb)
  }

  /**
   * Allows to send multiple objects on the same time, and an array of files (several files with the same key)
   * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
   * @param files Object containing one / several files
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  sendEntityAndArrayOfFilesUsingMultiPart(verb, objectValues, files, fileKey, pathParams, queryParams) {
    return this.buildMultiPartsRSAAction(this.entityEndpoint, pathParams, queryParams,
      BasicActions.createFormDataWithFilesList(objectValues, files, fileKey), [
        this.SIGNAL_REQUEST,
        this.buildSuccessAction(
          this.SIGNAL_SUCCESS,
          (action, state, res) => res.status === 204 ? null : this.buildResults(res),
        ),
        this.buildFailureAction(this.SIGNAL_FAILURE),
      ], verb)
  }

  /**
   * Behavior: build result from fetch result
   * @param {*} res fetch result
   * @return result
   */
  buildResults = (res) => getJSON(res).then((json) => json)
}

export default BasicSignalActions
