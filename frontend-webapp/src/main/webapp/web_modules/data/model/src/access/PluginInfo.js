/**
 * LICENSE_PLACEHOLDER
 **/
import UIPluginTypes from './UIPluginTypes'
/**
 * Plugin information supplied by the plugin himself
 * @author Sébastien Binda
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
  type: PropTypes.oneOf(UIPluginTypes),
  // Specific configuration properties for the given plugin
  conf: PropTypes.object,
})

export default {
  PluginInfo,
}
