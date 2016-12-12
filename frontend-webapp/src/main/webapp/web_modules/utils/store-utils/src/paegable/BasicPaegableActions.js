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
    console.log(this.schemaTypes.ENTITY)
    this.ENTITY_LIST_REQUEST = `${options.namespace}/PAEGABLE_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/PAEGABLE_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/PAEGABLE_LIST_FAILURE`
  }

}


export default BasicPaegableActions
