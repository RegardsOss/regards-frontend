/**
 * LICENSE_PLACEHOLDER
 **/
import UIPluginConfCriterionContent from './UIPluginConfCriterionContent'
import UIPluginConfServiceContent from './UIPluginConfServiceContent'

/**
 * UI Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
const UIPluginConfContent = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  pluginId: PropTypes.number.isRequired, // plugin definition ID
  label: PropTypes.string,
  conf: PropTypes.oneOfType([
    UIPluginConfCriterionContent,
    UIPluginConfServiceContent,
  ]),
  // TODO A supprimer
  container: PropTypes.string,
  pluginConf: PropTypes.object,
})

const UIPluginConf = PropTypes.shape({
  content: UIPluginConfContent,
})
const UIPluginConfList = PropTypes.objectOf(UIPluginConf)

export default {
  UIPluginConfContent,
  UIPluginConf,
  UIPluginConfList,
}
