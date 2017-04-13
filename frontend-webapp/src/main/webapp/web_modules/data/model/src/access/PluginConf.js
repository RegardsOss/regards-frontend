/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
const PluginConf = React.PropTypes.shape({
  id: React.PropTypes.number,
  active: React.PropTypes.bool,
  pluginId: React.PropTypes.number.isRequired,
  conf: React.PropTypes.object,
  // TODO A supprimer
  label: React.PropTypes.string,
  container: React.PropTypes.string,
  pluginConf: React.PropTypes.object,
})

export default PluginConf
