/**
 * LICENSE_PLACEHOLDER
 **/
import { UI_PLUGIN_INFO_TYPES } from '@regardsoss/domain/access'

/**
 * Plugin information supplied by the plugin himself
 * @author Sébastien Binda
 */
const UIPluginInfoContent = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  company: PropTypes.string,
  email: PropTypes.string,
  license: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(UIPluginInfoTypes),
  // Specific configuration properties for the given plugin
  conf: PropTypes.object,
})

export default {
  UIPluginInfoContent,
}
