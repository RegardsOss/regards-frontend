/**
 * LICENSE_PLACEHOLDER
 **/

const PARAMETER_TYPES = PropTypes.oneOf(['string', 'numerical', 'temporal'])

/**
 * Specific configuration for a UI criterion plugin instance, as the plugin administrator should provide it
 */
const UICriterionInstanceConf = PropTypes.shape({
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      type: PARAMETER_TYPES.isRequired,
    }),
  ),
})

/**
 * Specific configuration for a UI service plugin instance, as the plugin administrator should provide it
 */
const UIServiceInstanceConf = PropTypes.shape({
  // this constant is essential to know what type of object the service will consume (without it the service will remain unused)
  target: PropTypes.oneOf(['DATAOBJECT', 'DATASET', 'DATAOBJECTS_QUERY']),
  // static plugin parameters (ie configuration at administrion level)
  static: PropTypes.arrayOf(
    PropTypes.shape({
      type: PARAMETER_TYPES.isRequired,
      required: PropTypes.bool,
    }),
  ),
  // dynamic plugin parameters (ie configuration when using, at runtime)
  dynamic: PropTypes.arrayOf(
    PropTypes.shape({
      type: PARAMETER_TYPES.isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
    }),
  ),
})

/**
 * UI Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
const PluginConf = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool.isRequired,
  pluginId: PropTypes.number.isRequired, // plugin defintion ID
  label: PropTypes.string.isRequired,
  conf: PropTypes.oneOfType([
    UICriterionInstanceConf,
    UIServiceInstanceConf,
  ]).isRequired,
})

export default PluginConf

export const FetchedUIPluginConf = PropTypes.shape({
  content: PluginConf,
})
