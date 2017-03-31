/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ModulesActions from './model/modules/ModulesActions'
import LayoutActions from './model/layout/LayoutActions'

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 */

const boardAddRequiredDependencies = [
  ModulesActions.getDependency(RequestVerbEnum.POST),
  ModulesActions.getDependency(RequestVerbEnum.GET),
  LayoutActions.getDependency(RequestVerbEnum.GET),
]

const boardListRequiredDependencies = [
  ModulesActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardAddRequiredDependencies,
  boardListRequiredDependencies,
}
