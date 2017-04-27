/**
 * LICENSE_PLACEHOLDER
 **/
import concat from 'lodash/concat'
import { fragmentDependencies } from '@regardsoss/admin-data-fragment-management'
import { modelDependencies } from '@regardsoss/admin-data-model-management'
import { attributeModelDependencies } from '@regardsoss/admin-data-attributemodel-management'

/**
 * Mandatory Dependencies to display module in project menu
 * @type {Array}
 */
export default [
  ...modelDependencies.listDependencies,
  ...modelDependencies.addDependencies,
  ...fragmentDependencies.listDependencies,
  ...fragmentDependencies.addDependencies,
  ...attributeModelDependencies.listDependencies,
  ...attributeModelDependencies.addDependencies,
]
