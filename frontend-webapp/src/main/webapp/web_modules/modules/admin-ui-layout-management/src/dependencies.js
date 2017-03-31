/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import LayoutActions from './model/LayoutActions'

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 */

const boardSeeRequiredDependencies = [
  LayoutActions.getDependency(RequestVerbEnum.GET),
]

export default {
  boardSeeRequiredDependencies,
}
