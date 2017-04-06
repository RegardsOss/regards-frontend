/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Store selector to access ProjectConnection entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, exemple :  ['common','enitites'].
 * With this exemple, all ProjectConnection will be stored in the subpart 'common.entities'
 * of the global application store.
 *
 * @author Sébastien Binda
 */
class ResourceSelectors extends BasicPageableSelectors {

  getListOfKeys(state) {
    return this.uncombineStore(state).listOfKeys
  }
}

export default storePath => new ResourceSelectors(storePath)
