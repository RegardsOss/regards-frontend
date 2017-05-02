/**
 * LICENSE_PLACEHOLDER
 **/
import projectUserDependencies from '@regardsoss/admin-user-projectuser-management/src/dependencies'
import roleDependencies from '@regardsoss/admin-user-role-management/src/dependencies'
import accessGroupsDependencies from '@regardsoss/admin-accessright-management/src/dependencies'
/**
 * Module hateoas depencies
 * @author Sébastien binda
 */

export default {
  ...projectUserDependencies.admin,
  ...roleDependencies.admin,
  ...accessGroupsDependencies.admin,
}
