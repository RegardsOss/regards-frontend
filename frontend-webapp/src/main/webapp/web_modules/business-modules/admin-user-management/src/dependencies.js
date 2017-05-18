/**
 * LICENSE_PLACEHOLDER
 **/
import { projectUserDependencies } from '@regardsoss/admin-user-projectuser-management'
import { roleDependencies } from '@regardsoss/admin-user-role-management'
import { roleResourceAccessDependencies } from '@regardsoss/admin-user-role-resource-access-management'

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */

export default [
  ...projectUserDependencies.listDependencies,
  ...projectUserDependencies.addDependencies,
  ...roleDependencies.addDependencies,
  ...roleDependencies.listDependencies,
  ...roleResourceAccessDependencies.addDependencies,
  ...roleResourceAccessDependencies.listDependencies,
]
