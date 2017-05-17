/**
 * LICENSE_PLACEHOLDER
 **/
import { accessGroupDependencies } from '@regardsoss/admin-accessright-accessgroup-management'

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */

export default [
  ...accessGroupDependencies.addDependencies,
  ...accessGroupDependencies.listDependencies,
]
