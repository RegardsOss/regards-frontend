/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * @author Léo Mieulet
 */
import BasicSelector from '../BasicSelector'
/**
 *  Provide an high level class to interact with entity stored in a array
 */
class BasicArraySelectors extends BasicSelector {
  getArray(state) {
    return this.uncombineStore(state).items
  }
}

export default BasicArraySelectors
