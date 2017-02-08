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
class BasicSignalSelectors extends BasicSelector {
  /**
   * Returns fetch result
   * @param state redux store
   */
  getResult(state) {
    return this.uncombineStore(state).result
  }

}

export default BasicSignalSelectors
