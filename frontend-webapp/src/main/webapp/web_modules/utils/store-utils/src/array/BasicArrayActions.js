/**
 * @author Léo Mieulet
 */
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
  }

  fetchEntityList() {
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          {
            type: this.ENTITY_LIST_FAILURE,
            meta: (action, state, res) => {
              if (res.status === '500') {
                return { errorMessage: 'error.500' }
              }
              return { errorMessage: 'An error occurred' }
            },
          },
        ],
        endpoint: this.entityEndpoint,
        method: 'GET',
      },
    }
  }
}


export default BasicArrayActions
