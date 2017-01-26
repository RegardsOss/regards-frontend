/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @author Léo Mieulet
 */
import { map, replace } from 'lodash'
import ErrorHandler from '../ErrorHandler'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions to retrieve an array of value
 *  @Return dispatcheable redux actions
 */
class BasicArrayActions {

  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.ENTITY_LIST_REQUEST = `${options.namespace}/LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/LIST_FAILURE`

    this.FLUSH = `${options.namespace}/FLUSH`

    this.errorHandler = new ErrorHandler()
  }

  /**
   * Replace parameterized value in the current configured endpoint
   * @param entityEndpoint endpoint entity
   * @param params parameters to replace in the endpoint entity
   * @returns {*}
   */
  handleRequestParameters = (entityEndpoint, params) => {
    let endpoint = entityEndpoint
    if (params) {
      map(params, (param, id) => {
        endpoint = replace(endpoint, `%${id}`, param)
      })
    }
    return endpoint
  }

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
          this.ENTITY_LIST_FAILURE,
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

  /**
   * Remove all existing entries
   * @returns {{type: string}}
   */
  flush() {
    return {
      type: this.FLUSH,
    }
  }
}


export default BasicArrayActions
