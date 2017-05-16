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
const PluginInfo = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  company: PropTypes.string,
  email: PropTypes.string,
  license: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(PluginTypes),
  // Specific configuration properties for the given plugin
  conf: PropTypes.object,
})

export default {
  PluginInfo,
}
