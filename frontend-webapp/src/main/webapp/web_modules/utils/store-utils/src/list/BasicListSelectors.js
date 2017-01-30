/**
 * LICENSE_PLACEHOLDER
 **/
import { keys } from 'lodash'
/**
 * @author Léo Mieulet
 */
import BasicSelector from '../BasicSelector'
/**
 *  Provide an high level class to interact with entity stored in a list
 */
class BasicListSelectors extends BasicSelector {
  getList(state) {
    return this.uncombineStore(state).items
  }
  getById(state, id) {
    return this.uncombineStore(state).items[id]
  }
  getContentById(state, id) {
    const response = this.getById(state, id)
    if (response && response.content) {
      return response.content
    }
    return undefined
  }
  getSize(state) {
    return keys(this.uncombineStore(state).items).length
  }
  getError(state) {
    return this.uncombineStore(state).error
  }
}

export default BasicListSelectors
