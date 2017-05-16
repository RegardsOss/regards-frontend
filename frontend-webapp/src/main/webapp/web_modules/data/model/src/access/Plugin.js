/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginInfo } from './PluginInfo'
/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
const UIPlugin = PropTypes.shape({
  name: PropTypes.string.isRequired,
  plugin: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    fr: PropTypes.object,
    en: PropTypes.object,
  }).isRequired,
  info: PluginInfo,
})

export default UIPlugin
