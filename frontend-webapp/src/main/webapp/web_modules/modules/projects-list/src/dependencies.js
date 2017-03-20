/**
 * LICENSE_PLACEHOLDER
 **/
import ProjectsAction from './model/ProjectsAction'
import { RequestVerbEnum } from '@regardsoss/store-utils'
/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
/**
 * Mandatory Dependencies to display module in user interface
 * @type {Array}
 */
const user = [
  ProjectsAction.getDependency(RequestVerbEnum.GET_LIST),
]

/**
 * Mandatory Dependencies to display module in admin interface
 * @type {Array}
 */
const admin = []

export default {
  user,
  admin,
}
