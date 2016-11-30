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
}

export default BasicListSelector
