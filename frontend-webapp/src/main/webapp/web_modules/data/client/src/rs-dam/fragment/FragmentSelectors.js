/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Store selector to access fragment entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, exemple :  ['common','enitites'].
 * With this exemple, all projects will be stored in the subpart 'common.entities' of the global
 * application store.
 *
 * @author Léo Mieulet
 */
export default storePath => new BasicListSelectors(storePath)

