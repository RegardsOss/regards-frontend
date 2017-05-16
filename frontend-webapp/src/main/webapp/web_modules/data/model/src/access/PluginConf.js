/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
const PluginConf = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  pluginId: PropTypes.number.isRequired,
  conf: PropTypes.object,
  // TODO A supprimer
  label: PropTypes.string,
  container: PropTypes.string,
  pluginConf: PropTypes.object,
})

export default PluginConf
