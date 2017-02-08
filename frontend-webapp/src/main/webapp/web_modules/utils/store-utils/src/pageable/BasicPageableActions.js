/**
 * LICENSE_PLACEHOLDER
 **/
import { normalize } from 'normalizr'
import BasicListActions from '../list/BasicListActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
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
   * @param params [optional] params to replace in endpoint uri
   * @returns {{}}
   */
  fetchPagedEntityList(index, size, params) {
    let endpoint = this.handleRequestParameters(this.entityEndpoint, params)

    if (size && size > 0) {
      if (endpoint.includes('?')) {
        endpoint = `${endpoint}&_start=${index}&_limit=${size}`
      } else {
        endpoint = `${endpoint}?_start=${index}&_limit=${size}`
      }
    }

    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => Object.assign(
              // Only normalize the content of json
              normalize(json.content, this.schemaTypes.ENTITY_ARRAY),
              { links: json.links },
              { metadata: json.metadata },
              ),
              // Merge the normalized object with query metadata and query links
            ),
          },
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
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
