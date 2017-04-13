/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Store selector to access UIPluginConfiguration entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, example :  ['common','enitites'].
 * With this example, all projects will be stored in the subpart 'common.entities' of the global
 * application store.
 *
 * @author Léo Mieulet
 */
export default storePath => new BasicPageableSelectors(storePath)
