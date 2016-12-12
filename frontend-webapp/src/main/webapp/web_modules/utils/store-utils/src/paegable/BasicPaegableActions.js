/**
 * @author Léo Mieulet
 */
import { normalize } from 'normalizr'
import BasicListActions from '../list/BasicListActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions for a specific type of entity paegable list
 *  @Return dispatcheable redux actions
 */
class BasicPaegableActions extends BasicListActions {

  constructor(options) {
    super(options)
    // rename actions to get correct logs
    this.ENTITY_LIST_REQUEST = `${options.namespace}/PAEGABLE_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/PAEGABLE_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/PAEGABLE_LIST_FAILURE`
  }

  /**
   * Overwrite the basic entity list fetch action to change the payload in order to support Peagable result
   * @returns {{}}
   */
  fetchEntityList() {
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => {
              // Merge the normalized object with query metadata and query links
              return Object.assign(
                // Only normalize the content of json
                normalize(json.content, this.schemaTypes.ENTITY_ARRAY),
                {links: json.links},
                {metadata: json.metadata}
              )
            }),
          },
          this.ENTITY_LIST_FAILURE,
        ],
        endpoint: this.entityEndpoint,
        method: 'GET',
      },
    }
  }

}


export default BasicPaegableActions
