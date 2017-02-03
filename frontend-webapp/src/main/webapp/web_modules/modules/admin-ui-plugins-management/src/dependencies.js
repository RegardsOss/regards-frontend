import PluginsActions from './model/PluginsActions'

/**
 * Hateoas dependencies to display this module
 * @author Sébastien Binda
 */
export default [
  PluginsActions.getDependency('GET'),
]
