/*
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalSelectors } from '@regardsoss/store-utils'

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
export default storePath => new BasicSignalSelectors(storePath)
