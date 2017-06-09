/**
 * LICENSE_PLACEHOLDER
 **/

import UIPluginConfParameter from './UIPluginConfParameter'

/**
 * Specific configuration for a UI criterion plugin instance, as the plugin administrator should provide it
 */
const UICriterionInstanceConfContent = PropTypes.shape({
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      type: UIPluginConfParameter.isRequired,
    }),
  ),
})

export default UICriterionInstanceConfContent
