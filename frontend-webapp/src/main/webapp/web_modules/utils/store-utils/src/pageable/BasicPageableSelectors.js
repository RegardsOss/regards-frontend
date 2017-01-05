/**
 * @author Léo Mieulet
 */
import BasicListSelectors from '../list/BasicListSelectors'
/**
 *  Provide an high level class to interact with entity stored in a pageable list
 */
class BasicPageableSelectors extends BasicListSelectors {

  getMetaData(state) {
    return this.uncombineStore(state).metadata
  }

}

export default BasicPageableSelectors
