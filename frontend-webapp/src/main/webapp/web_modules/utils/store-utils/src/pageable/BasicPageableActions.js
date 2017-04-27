/**
 * LICENSE_PLACEHOLDER
 **/
import BasicListActions from '../list/BasicListActions'

const { CALL_API } = require('redux-api-middleware')
/**
 *  Provide actions for a specific type of entity pageable list
 *
 *  @returns dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicPageableActions extends BasicListActions {

  constructor(options) {
    super(options)
    // rename actions to get correct logs
    this.ENTITY_LIST_REQUEST = `${options.namespace}/PAGEABLE_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/PAGEABLE_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/PAGEABLE_LIST_FAILURE`
  }

  /**
   * Fetch a page of entities
   *
   * @param index pagination param : index of the first result of the request
   * @param size pagination param : number of elements for the asked page
   * @param pathParams [optional] path parameters to replace in endpoint uri
   * @param queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @returns string request endpoint
   */
  getRequestEndpoint(index, size, pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    if (size && size > 0) {
      endpoint = this.handleRequestQueryParams(endpoint, {
        offset: index,
        size,
      })
    }

    // force paging return value in development mode
    if (process.env.NODE_ENV === 'development' && !size) {
      endpoint = this.handleRequestQueryParams(endpoint, {
        offset: 0,
        size: 10000,
      })
    }

    return endpoint
  }

  /**
   * Fetch a page of entities
   *
   * @param index pagination param : index of the first result of the request
   * @param size pagination param : number of elements for the asked page
   * @param pathParams [optional] path parameters to replace in endpoint uri
   * @param queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @returns {{}}
   */
  fetchPagedEntityList(index, size, pathParams, queryParams) {
    // Compute the endpoint URI
    const endpoint = this.getRequestEndpoint(index, size, pathParams, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntitiesPagePayload(json)),
          },
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        headers: this.headers,
        method: 'GET',
      },
    }
  }

  normalizeEntitiesPagePayload(json) {
    return {
      // entities are in content field
      ...super.normalizeEntitiesListPayload(json.content),
      links: json.links,
      metadata: json.metadata,
    }
  }

  /**
   * Disable because not supported
   *
   * @throws {Error}
   */
  fetchEntityList() {
    throw new Error(`Method call forbidden on ${this.constructor.name}. Please use fetchPagedEntityList instead.`)
  }

}

export default BasicPageableActions
