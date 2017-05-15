/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { roleActions } from './clients/RoleClient'

const addDependencies = [
  roleActions.getDependency(RequestVerbEnum.POST),
]

const listDependencies = [
  roleActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  addDependencies,
  listDependencies,
}
