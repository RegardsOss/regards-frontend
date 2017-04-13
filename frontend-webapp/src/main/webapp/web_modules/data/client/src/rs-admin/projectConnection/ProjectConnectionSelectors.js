/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Store selector to access ProjectConnection entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, example :  ['common','enitites'].
 * With this example, all ProjectConnection will be stored in the subpart 'common.entities'
 * of the global application store.
 *
 * @author Sébastien Binda
 */
export default storePath => new BasicPageableSelectors(storePath)
