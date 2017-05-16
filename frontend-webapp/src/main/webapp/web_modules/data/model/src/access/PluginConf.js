/**
 * LICENSE_PLACEHOLDER
 **/

const PARAMETER_TYPES = React.PropTypes.oneOf(['string', 'numerical', 'temporal'])

/**
 * Specific configuration for a UI criterion plugin instance, as the plugin administrator should provide it
 */
const UICriterionInstanceConf = React.PropTypes.shape({
  attributes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      type: PARAMETER_TYPES.isRequired,
    }),
  ),
})

/**
 * Specific configuration for a UI service plugin instance, as the plugin administrator should provide it
 */
const UIServiceInstanceConf = React.PropTypes.shape({
  // this constant is essential to know what type of object the service will consume (without it the service will remain unused)
  target: React.PropTypes.oneOf(['DATAOBJECT', 'DATASET', 'DATAOBJECTS_QUERY']),
  // static plugin parameters (ie configuration at administrion level)
  static: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      type: PARAMETER_TYPES.isRequired,
      required: React.PropTypes.bool,
    }),
  ),
  // dynamic plugin parameters (ie configuration when using, at runtime)
  dynamic: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      type: PARAMETER_TYPES.isRequired,
      label: React.PropTypes.string.isRequired,
      required: React.PropTypes.bool,
    }),
  ),
})

/**
 * UI Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
const PluginConf = React.PropTypes.shape({
  id: React.PropTypes.number,
  active: React.PropTypes.bool,
  pluginId: React.PropTypes.number.isRequired,
  conf: React.PropTypes.oneOfType([
    UICriterionInstanceConf,
    UIServiceInstanceConf,
  ]),
  label: React.PropTypes.string,
  // TODO A supprimer
  container: React.PropTypes.string,
  pluginConf: React.PropTypes.object,
})

export default PluginConf
