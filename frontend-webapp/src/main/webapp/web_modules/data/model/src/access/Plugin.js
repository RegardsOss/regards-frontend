/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginInfo } from './PluginInfo'
/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
const Plugin = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  plugin: React.PropTypes.func.isRequired,
  messages: React.PropTypes.shape({
    fr: React.PropTypes.object,
    en: React.PropTypes.object,
  }).isRequired,
  info: PluginInfo,
})

export default Plugin
