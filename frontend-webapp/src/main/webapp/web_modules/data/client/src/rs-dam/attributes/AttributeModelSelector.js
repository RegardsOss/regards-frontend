/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Store selector to access projects entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, exemple :  ['common','attribute-model'].
 * With this exemple, all projects will be stored in the subpart 'common.attribute-model' of the global
 * application store.
 */
export default storePath => new BasicPageableSelectors(storePath)

