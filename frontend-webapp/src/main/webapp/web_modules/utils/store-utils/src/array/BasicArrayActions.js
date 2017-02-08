/**
 * LICENSE_PLACEHOLDER
 **/
import BasicActions from '../BasicActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions to retrieve an array of value
 *
 *  @Return dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicArrayActions extends BasicActions {

  /**
   * TODO Comment
   *
   * @param params TODO Provide params expected format
   * @returns {{}}
   */
  fetchEntityList(params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
    }
  }


}


export default BasicArrayActions
