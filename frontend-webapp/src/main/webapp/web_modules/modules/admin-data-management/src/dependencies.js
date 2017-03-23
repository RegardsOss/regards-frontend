/**
 * LICENSE_PLACEHOLDER
 **/
import concat from 'lodash/concat'
import modelDependencies from '@regardsoss/admin-data-model-management/src/dependencies'
/**
 * Module hateoas depencies
 * @author Sébastien binda
 */

/**
 * Mandatory Dependencies to display module in user interface
 * @type {Array}
 */
const user = []

/**
 * Mandatory Dependencies to display module in admin interface
 * @type {Array}
 */
const admin = concat([], modelDependencies.admin)

export default {
  user,
  admin,
}
