/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import RoleActions from './model/RoleActions'

const addDependencies = [
  RoleActions.getDependency(RequestVerbEnum.POST),
]

const listDependencies = [
  RoleActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  addDependencies,
  listDependencies,
}
