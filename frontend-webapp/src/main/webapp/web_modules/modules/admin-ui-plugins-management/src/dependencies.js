import PluginsActions from './model/PluginsActions'

/**
 * Hateoas dependencies to display this module
 * @author Sébastien Binda
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
const admin = [
  PluginsActions.getDependency('GET'),
]

export default {
  user,
  admin,
}
