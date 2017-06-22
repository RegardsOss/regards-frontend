/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { moduleActions } from './clients/ModuleClient'
import { layoutActions } from './clients/LayoutClient'

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 */

const boardAddRequiredDependencies = [
  moduleActions.getDependency(RequestVerbEnum.POST),
]

const boardListRequiredDependencies = [
  moduleActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardAddRequiredDependencies,
  boardListRequiredDependencies,
}
