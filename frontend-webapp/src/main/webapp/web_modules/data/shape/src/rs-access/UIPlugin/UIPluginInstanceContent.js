/**
 * LICENSE_PLACEHOLDER
 **/
import { UIPluginInfoContent } from './UIPluginInfoContent'
/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
const UIPluginInstanceContent = PropTypes.shape({
  name: PropTypes.string.isRequired,
  plugin: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    fr: PropTypes.object,
    en: PropTypes.object,
  }).isRequired,
  info: UIPluginInfoContent,
})

export default {
  UIPluginInstanceContent,
}
