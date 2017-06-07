/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'
import pickBy from 'lodash/pickBy'
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

class FragmentSelectors extends BasicListSelectors {
  /**
   * Store the name of the default fragment, which has a very different behavior than others fragments
   * @type {string}
   */
  noneFragmentName = 'default'

  getListWithoutNoneFragment(state) {
    return pickBy(this.getList(state), fragment => (
      fragment.content.name !== this.noneFragmentName
    ))
  }
}
export default storePath => new FragmentSelectors(storePath)

