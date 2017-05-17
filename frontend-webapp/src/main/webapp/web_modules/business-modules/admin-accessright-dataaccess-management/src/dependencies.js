/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AccessRightActions from './model/AccessRightActions'


const listAccessGroupAccessRightsDeps = [
  AccessRightActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  listAccessGroupAccessRightsDeps,
}
