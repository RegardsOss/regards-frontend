/**
 * LICENSE_PLACEHOLDER
 **/
import { map, replace, split, join, takeRight } from 'lodash'

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
   * @param options TODO Specify the expected format
   */
  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.ENTITY_LIST_REQUEST = `${options.namespace}/LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/LIST_FAILURE`
    this.FLUSH = `${options.namespace}/FLUSH`
    this.bypassErrorMiddleware = !!options.bypassErrorMiddleware
  }

  /**
   * Builds a failure action, storing status code and allowing bypass middleware (see constructor)
   * @param type action type
   */
  buildFailureAction = type => ({
    type,
    meta: (action, state, res) => ({
      status: res && res.status,
      bypassErrorMiddleware: this.bypassErrorMiddleware,
    }),
  })

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
      map(params, (param, key) => {
        endpoint = replace(endpoint, `{${key}}`, param)
      })
    }
    // endpoint = replace(endpoint, /{.*}/, '') // Remove unspecified parameters
    // endpoint = trim(endpoint, '?') // Remove the trailing '?' if last character
    return endpoint
  }

  handleRequestQueryParams = (entityEndpoint, queryParams) => {
    let endpoint = entityEndpoint
    if (queryParams) {
      map(queryParams, (param, key) => {
        if (endpoint.includes('?')) {
          endpoint = `${endpoint}&${key}=${param}`
        } else {
          endpoint = `${endpoint}?${key}=${param}`
        }
      })
    }
    return endpoint
  }

  /**
   * Remove all existing entries
   *
   * @returns {{type: string}}
   */
  flush() {
    return {
      type: this.FLUSH,
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
    // Contatn microservice@endpoint@verb
    return `${parts[1]}@/${join(takeRight(parts, parts.length - 2), '/')}@${verb}`
  }
}

export default BasicActions
