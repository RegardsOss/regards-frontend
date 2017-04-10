/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
import { themeUIDependencies } from '@regardsoss/admin-ui-theme-management'
import { pluginUIDependencies } from '@regardsoss/admin-ui-plugin-management'
import { moduleUIDependencies } from '@regardsoss/admin-ui-module-management'
import { layoutUIDependencies } from '@regardsoss/admin-ui-layout-management'

/**
 * The list of dependencies that this modules used across its childs
 * If you don't have any access, it's useless to let you see this module
 * @type {Array}
 */
const dependenciesUsed = [
  ...themeUIDependencies.boardRequiredDependencies,

  ...pluginUIDependencies.boardAddRequiredDependencies,
  ...pluginUIDependencies.boardListRequiredDependencies,

  ...moduleUIDependencies.boardAddRequiredDependencies,
  ...moduleUIDependencies.boardListRequiredDependencies,

  ...layoutUIDependencies.boardSeeRequiredDependencies,
]

export default {
  dependenciesUsed,
}
