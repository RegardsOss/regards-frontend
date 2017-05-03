/**
 * LICENSE_PLACEHOLDER
 **/
import { fragmentDependencies } from '@regardsoss/admin-data-fragment-management'
import { modelDependencies } from '@regardsoss/admin-data-model-management'
import { attributeModelDependencies } from '@regardsoss/admin-data-attributemodel-management'
import { collectionDependencies } from '@regardsoss/admin-data-collection-management'
import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'

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
  ...collectionDependencies.listDependencies,
  ...collectionDependencies.addDependencies,
  ...connectionDependencies.listDependencies,
  ...connectionDependencies.addDependencies,
  ...datasourceDependencies.listDependencies,
  ...datasourceDependencies.addDependencies,
]
