/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * List of valid plugin types
 * @type {[*]}
 * @author Sébastien Binda
 */
const PluginTypes = [
  'criteria',
  'service',
  'module',
]

/**
 * Plugin information supplied by the plugin himself
 */
const PluginInfo = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  version: React.PropTypes.number.isRequired,
  author: React.PropTypes.string.isRequired,
  company: React.PropTypes.string,
  type: React.PropTypes.oneOf(PluginTypes),
  // Specific configuration properties for the given plugin
  conf: React.PropTypes.object,
})

export default {
  PluginInfo,
}
