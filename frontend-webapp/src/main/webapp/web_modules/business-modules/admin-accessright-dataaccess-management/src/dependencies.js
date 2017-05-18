/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { accessRightActions } from './clients/AccessRightClient'


const listAccessGroupAccessRightsDeps = [
  accessRightActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  listAccessGroupAccessRightsDeps,
}
