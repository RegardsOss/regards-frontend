/**
 * LICENSE_PLACEHOLDER
 **/
import UIPluginConfTarget from './UIPluginConfTarget'
import UIPluginConfParameter from './UIPluginConfParameter'

/**
 * Specific configuration for a UI service plugin instance, as the plugin administrator should provide it
 */
const UIServiceInstanceConfContent = PropTypes.shape({
  // this constant is essential to know what type of object the service will consume (without it the service will remain unused)
  target: UIPluginConfTarget,
  // static plugin parameters (ie configuration at administrion level)
  static: PropTypes.arrayOf(
    PropTypes.shape({
      type: UIPluginConfParameter.isRequired,
      required: PropTypes.bool,
    }),
  ),
  // dynamic plugin parameters (ie configuration when using, at runtime)
  dynamic: PropTypes.arrayOf(
    PropTypes.shape({
      type: UIPluginConfParameter.isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
    }),
  ),
})


export default {
  UIServiceInstanceConfContent
}