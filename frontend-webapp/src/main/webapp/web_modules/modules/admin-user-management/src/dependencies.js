/**
 * LICENSE_PLACEHOLDER
 **/
import concat from 'lodash/concat'
import projectUserDependencies from '@regardsoss/admin-user-projectuser-management/src/dependencies'
import roleDependencies from '@regardsoss/admin-user-role-management/src/dependencies'
import accessGroupsDependencies from '@regardsoss/admin-accessright-management'
/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
export default concat([], projectUserDependencies, roleDependencies, accessGroupsDependencies)
