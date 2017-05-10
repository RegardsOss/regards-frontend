/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { moduleActions } from './client/ModuleClient'
import { layoutActions } from './client/LayoutClient'

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 */

const boardAddRequiredDependencies = [
  moduleActions.getDependency(RequestVerbEnum.POST),
  moduleActions.getDependency(RequestVerbEnum.GET),
  layoutActions.getDependency(RequestVerbEnum.GET),
]

const boardListRequiredDependencies = [
  moduleActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardAddRequiredDependencies,
  boardListRequiredDependencies,
}
