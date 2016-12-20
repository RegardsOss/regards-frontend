/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @author Léo Mieulet
 */
import BasicSelector from '../BasicSelector'
/**
 *  Provide an high level class to interact with entity stored in a list
 */
class BasicListSelector extends BasicSelector {
  getList(state) {
    return this.uncombineStore(state).items
  }
  getById(state, id) {
    return this.uncombineStore(state).items[id]
  }
  getContentById(state, id){
    const response = this.getById(state, id)
    if (response && response.content){
      return response.content
    }
    return undefined
  }
}

export default BasicListSelector
