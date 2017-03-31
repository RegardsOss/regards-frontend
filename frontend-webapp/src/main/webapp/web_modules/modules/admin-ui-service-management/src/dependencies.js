/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { ThemeActions } from '@regardsoss/theme'
import LayoutActions from './model/layout/LayoutActions'
import ModulesActions from './model/modules/ModulesActions'

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 */

const ModulesEditDep = [
  ModulesActions.getDependency(RequestVerbEnum.GET),
  ModulesActions.getDependency(RequestVerbEnum.PUT),
]

const ModulesAddDep = [
  ModulesActions.getDependency(RequestVerbEnum.POST),
]

const ModulesListDep = [
  ModulesActions.getDependency(RequestVerbEnum.GET_LIST),
]

const LayoutEditDep = [
  LayoutActions.getDependency(RequestVerbEnum.GET),
  LayoutActions.getDependency(RequestVerbEnum.PUT),
]

const LayoutAddDep = [
  LayoutActions.getDependency(RequestVerbEnum.POST),
]

const LayoutListDep = [
  LayoutActions.getDependency(RequestVerbEnum.GET),
]

const ThemeEditDep = [
  ThemeActions.getDependency(RequestVerbEnum.GET),
  ThemeActions.getDependency(RequestVerbEnum.PUT),
]

const ThemeListDep = [
  ThemeActions.getDependency(RequestVerbEnum.GET_LIST),
]

export {
  ModulesEditDep,
  ModulesAddDep,
  ModulesListDep,
  LayoutEditDep,
  LayoutAddDep,
  LayoutListDep,
  ThemeEditDep,
  ThemeListDep,
}

/**
 * Mandatory Dependencies to display module in user interface
 * @type {Array}
 */
const user = []

/**
 * Mandatory Dependencies to display module in admin interface
 * @type {Array}
 */
const admin = [
  LayoutActions.getDependency(RequestVerbEnum.GET_LIST),
  ModulesActions.getDependency(RequestVerbEnum.GET_LIST),
  ThemeActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
