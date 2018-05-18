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
   * { entityEndpoint: string, entityPathVariable: string,namespace : string ,
   * headers: Object ,bypassErrorMiddleware : bool }
   */
  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.entityPathVariable = options.entityPathVariable
    this.FLUSH = `${options.namespace}/FLUSH`
    this.headers = options.headers || {}
    this.bypassErrorMiddleware = !!options.bypassErrorMiddleware
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
      }),
    }
  }

  /**
   * Replace parameterized value in the current configured endpoint
   *
   * @param entityEndpoint endpoint entity
   * @param params parameters to replace in the endpoint entity
   * @returns {*}
   */
  handleRequestPathParameters = (entityEndpoint, params) => {
    let endpoint = entityEndpoint
    if (params) {
      forEach(params, (param, key) => {
        endpoint = replace(endpoint, `{${key}}`, param)
      })
    }
    // endpoint = replace(endpoint, /{.*}/, '') // Remove unspecified parameters
    // endpoint = trim(endpoint, '?') // Remove the trailing '?' if last character
    return endpoint
  }

  handleRequestQueryParams = (entityEndpoint, queryParams) => {
    let endpoint = entityEndpoint
    if (endsWith(endpoint, '?')) {
      endpoint = trimEnd(endpoint, '?')
    }
    if (queryParams) {
      forEach(queryParams, (param, key) => {
        // remove null / undefined / empty strings
        if (!isNil(param) && (!isString(param) || !!param)) {
          if (endpoint.includes('?')) {
            endpoint = `${endpoint}&${key}=${param}`
          } else {
            endpoint = `${endpoint}?${key}=${param}`
          }
        }
      })
    }
    return endpoint
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
    let dependency = this.entityEndpoint
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

  static createFormDataWithFilesMap(objectValues, filesMap) {
    const formData = new FormData()
    // Handle object values
    BasicActions.addObjectValuesToFormData(formData, objectValues)
    // Handle files
    BasicActions.addFilesMapToFormData(formData, filesMap)
    return formData
  }

  static useZuulSlugForMultiPartRoutes(endpoint) {
    return endpoint.replace(`/${API_URL}/`, `/zuul/${API_URL}/`)
  }

  static createFormDataWithFilesList(objectValues, filesList, filesKey) {
    const formData = new FormData()
    // Handle object values
    BasicActions.addObjectValuesToFormData(formData, objectValues)
    // Handle files
    BasicActions.addFilesListToFormData(formData, filesList, filesKey)
    return formData
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
