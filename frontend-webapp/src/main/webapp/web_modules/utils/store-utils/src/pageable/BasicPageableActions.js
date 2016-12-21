/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @author Léo Mieulet
 */
import { normalize } from 'normalizr'
import { map, replace } from 'lodash'
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
   * Overwrite the basic entity list fetch action to change the payload in order to support Peagable result
   * @returns {{}}
   */
  fetchEntityList(params) {
    let endpoint = this.entityEndpoint
    if (params) {
      map(params, (param, id) => {
        console.log('fetch', param)
        endpoint = replace(endpoint, `%${id}`, param)
      })
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
          this.ENTITY_LIST_FAILURE,
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

}


export default BasicPageableActions
