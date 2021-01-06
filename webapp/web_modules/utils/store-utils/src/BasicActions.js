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
 **/
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import forEach from 'lodash/forEach'
import replace from 'lodash/replace'
import split from 'lodash/split'
import endsWith from 'lodash/endsWith'
import trimEnd from 'lodash/trimEnd'
import join from 'lodash/join'
import takeRight from 'lodash/takeRight'
import { RSAA } from 'redux-api-middleware'
import RequestVerbEnum from './RequestVerbEnum'

/**
 *  Abstract Action class providing common methods for different Actions implementations
 *
 *  @returns dispatcheable redux actions
 *  @author Léo Mieulet
 *  @author Sébastien Binda
 *  @author Xavier-Alexandre Brochard
 */
class BasicActions {
  /**
   * Class constructor
   *
   * @param options Object containing :
   * { entityEndpoint: string, resourcesEndpoint: string, entityPathVariable: string,namespace : string ,
   * headers: Object ,bypassErrorMiddleware : bool, options: {*} }
   */
  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.entityPathVariable = options.entityPathVariable
    this.FLUSH = `${options.namespace}/FLUSH`
    this.headers = options.headers || {}
    this.bypassErrorMiddleware = !!options.bypassErrorMiddleware // default to false
    this.options = options.options
    this.resourcesEndpoint = options.resourcesEndpoint || options.entityEndpoint
  }

  /**
   * Builds a failure action, storing status code and allowing bypass middleware (see constructor)
   * @param {string} type action type
   */
  buildFailureAction = (type) => {
    const requestTime = Date.now()
    return {
      type,
      meta: (action, state, res) => ({
        status: res && res.status,
        requestTime,
        bypassErrorMiddleware: this.bypassErrorMiddleware,
        path: this.entityEndpoint,
      }),
    }
  }

  /**
   * Builds a success action. Instantiates required data to handle the cancel pending events
   * @param {string} type redux action type
   * @param {function} payload optional action payload build function (optional)
   * @return a CALL API compatible redux action
   */
  buildSuccessAction = (type, payload) => {
    const requestTime = Date.now()
    return {
      type,
      payload,
      meta: (action, state, res) => ({
        requestTime,
        status: res.status,
        path: this.entityEndpoint,
      }),
    }
  }

  /**
   * Remove all existing entries
   * @param {boolean} cancelPending: (default: true) should cancel pending actions?
   *
   * @returns {{type: string}}
   */
  flush(cancelPending = true) {
    return {
      type: this.FLUSH,
      cancelPending,
      flushTime: Date.now(),
    }
  }

  /**
   * Generates the main [microservice@resource@verb] string necessary for displaying the module from the entityEndpoint.
   * For example:
   * entityEndpoint = `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/users/{name}?status=VALID`
   * Dependy = rs-admin@/users/{name}@verb
   *
   * @param verb
   * @returns {string}
   */
  getDependency = (verb) => {
    let dependency = this.resourcesEndpoint
    // Remove query params if any
    dependency = split(dependency, '?')[0]
    // Remove GATEWAY path
    dependency = replace(dependency, GATEWAY_HOSTNAME, '')
    dependency = replace(dependency, `/${API_URL}`, '')
    // add a first '/' car if missing
    dependency = dependency[0] === '/' ? `${dependency}` : `/${dependency}`
    // Retrieve microservice as the first element of the path
    const parts = split(dependency, '/')
    const microservice = parts[1]
    // Add entity path variable if needed
    let endpoint = join(takeRight(parts, parts.length - 2), '/')
    let requestHttpVerb = verb
    if (this.entityPathVariable) {
      switch (verb) {
        case RequestVerbEnum.GET:
        case RequestVerbEnum.DELETE:
        case RequestVerbEnum.PUT:
        case RequestVerbEnum.PATCH:
          endpoint = `${endpoint}/{${this.entityPathVariable}}`
          break
        case RequestVerbEnum.GET_LIST:
          requestHttpVerb = RequestVerbEnum.GET
          break
        default:
        // Nothing to do
      }
    } else if (requestHttpVerb === RequestVerbEnum.GET_LIST) {
      requestHttpVerb = RequestVerbEnum.GET
    }
    return `${microservice}@/${endpoint}@${requestHttpVerb}`
  }

  /**
   * Builds the RSAA action to dispatch to fetch server data with multiparts form
   * @param {string} initialEndpoint endpoint entity
   * @param {*} pathParams query parameters
   * @param {*} queryParams query parameters
   * @param {*} formData form data
   * @param {[string|{*}]} types Redux API middleware types
   * @param {string} method HTTP verb to use for request (defaults to POST)
   * @returns {{type: string }} RSAA action to dispatch
   */
  buildMultiPartsRSAAction(initialEndpoint, pathParams, queryParams, formData, types, method = 'POST') {
    let finalEndpoint = BasicActions.buildURL(initialEndpoint, pathParams, queryParams)
    finalEndpoint = BasicActions.useZuulSlugForMultiPartRoutes(finalEndpoint)
    return {
      [RSAA]: {
        types,
        endpoint: finalEndpoint,
        method,
        body: formData,
        headers: this.headers,
        options: this.options,
      },
    }
  }

  /**
   * Replace parameterized value in the current configured endpoint
   * @param {string} enpoint endpoint entity
   * @param params parameters to replace in the endpoint entity
   * @returns {string} endpoint with path parameters
   */
  static handleRequestPathParameters(endpoint, params) {
    let finalEndpoint = endpoint
    if (params) {
      forEach(params, (param, key) => {
        finalEndpoint = replace(finalEndpoint, `{${key}}`, param)
      })
    }
    return finalEndpoint
  }

  /**
   * Appends query parameters to endpoint
   * @param {string} enpoint endpoint entity
   * @param {*} params parameters to replace in the endpoint entity. Allowed parameter values are string or string arrays
   * @returns {string} endpoint with query parameters
   */
  static handleRequestQueryParams(enpoint, queryParams) {
    let finalEndpoint = enpoint
    if (endsWith(finalEndpoint, '?')) {
      finalEndpoint = trimEnd(finalEndpoint, '?')
    }
    if (queryParams) {
      forEach(queryParams, (parameter, key) => {
        // handle array parameters : key:[a, b] => key=a&key=b
        const paramValues = isArray(parameter) ? parameter : [parameter]
        // for each parameter value:
        const appendParametersText = paramValues
          // filter null / undefined and empty strings values
          .filter((value) => !isNil(value) && (!isString(parameter) || !!parameter))
          // map to key=value[i] then join on '&'
          .map((value) => `${key}=${encodeURIComponent(value)}`).join('&')
        if (appendParametersText) {
          // The value is OK, append to current query
          const parameterSeparator = finalEndpoint.includes('?') ? '&' : '?'
          finalEndpoint = `${finalEndpoint}${parameterSeparator}${appendParametersText}`
        }
      })
    }
    return finalEndpoint
  }

  /**
   * Completes in endpoint the path and query parameters
   * @param {string} enpoint endpoint
   * @param {*} pathParameters path parameters
   * @param {*} queryParameters query parameters
   * @return {string} completed URL with path and query parameters
   */
  static buildURL(enpoint, pathParameters, queryParameters) {
    return BasicActions.handleRequestQueryParams(
      BasicActions.handleRequestPathParameters(enpoint, pathParameters),
      queryParameters)
  }

  /**
   * Assembles form values and files to build form data
   * @param {*} objectValues key to value map
   * @param {*} files key to file map
   * @return {FormData} built form data
   */
  static createFormDataWithFilesMap(objectValues, filesMap) {
    const formData = new FormData()
    // Handle object values
    BasicActions.addObjectValuesToFormData(formData, objectValues)
    // Handle files
    BasicActions.addFilesMapToFormData(formData, filesMap)
    return formData
  }

  /**
   * Assembles form values and file list to build form data
   * @param {*} objectValues key to value map
   * @param {*} fileLists array/map of files to addd under fileKey in payload
   * @param {string} fileKey file list key in payload
   * @return {FormData} built form data
   */
  static createFormDataWithFilesList(objectValues, filesList, fileKey) {
    const formData = new FormData()
    // Handle object values
    BasicActions.addObjectValuesToFormData(formData, objectValues)
    // Handle files
    BasicActions.addFilesListToFormData(formData, filesList, fileKey)
    return formData
  }

  /**
   * Redirects endpoint to zuul
   * @param {string} endpoint -
   * @return {string} zuul endpoint
   */
  static useZuulSlugForMultiPartRoutes(endpoint) {
    return endpoint.replace(`/${API_URL}/`, `/zuul/${API_URL}/`)
  }

  /**
   * Handle object values
   * @param formData
   * @param objectValues
   */
  static addObjectValuesToFormData(formData, objectValues) {
    forEach(objectValues, (value, key) => {
      if (isObject(value)) {
        // This is an object that we need to stringify
        formData.append(
          key,
          new Blob(
            [JSON.stringify(value)],
            {
              type: 'application/json',
            },
          ),
        )
      } else {
        formData.append(key, value)
      }
    })
  }

  /**
   * Add a map of files<key, File> to FormData
   * Uses the map key on the payload foreach file
   * @param formData a FormData instance
   * @param filesMap a map of files
   */
  static addFilesMapToFormData(formData, filesMap) {
    forEach(filesMap, (value, key) => {
      if (isObject(value)) {
        // This is an image
        formData.append(key, value)
      }
    })
  }

  /**
   * Add a list of files to FormData
   * @param formData a FormData instance
   * @param filesList a list of files
   * @param fileKey the key used on the payload
   */
  static addFilesListToFormData(formData, filesList, fileKey) {
    forEach(filesList, (value) => {
      if (isObject(value)) {
        // This is an image
        formData.append(fileKey, value)
      }
    })
  }
}

export default BasicActions
