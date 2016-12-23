/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @author Léo Mieulet
 */
import { normalize } from 'normalizr'
import BasicListActions from '../list/BasicListActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions for a specific type of entity pageable list
 *  @Return dispatcheable redux actions
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
   * @param dispatch redux store dispatch function
   * @param params params to replace in endpoint uri
   * @returns {{}}
   */
  fetchEntityList(dispatch, params) {
    let endpoint = this.entityEndpoint
    if (params) {
      endpoint = this.handleRequestParameters(this.entityEndpoint, params)
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
          {
            type: this.ENTITY_LIST_FAILURE,
            meta: (action, state, res) => this.errorHandler.onRequestFailure(dispatch, action, state, res),
          },
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

}


export default BasicPageableActions
