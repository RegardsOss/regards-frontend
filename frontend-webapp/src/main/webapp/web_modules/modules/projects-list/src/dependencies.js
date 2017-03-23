/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ProjectsAction from './model/ProjectsAction'

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
