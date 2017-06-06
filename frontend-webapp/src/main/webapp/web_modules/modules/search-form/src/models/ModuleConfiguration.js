/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginConf, AttributeConfiguration, AttributesRegroupementConfiguration, Container } from '@regardsoss/model'
import DatasetsConfShape from './datasets/DatasetsConfShape'
/**
 * Form entity description
 * @author Sébastien binda
 */
const ModuleConfiguration = PropTypes.shape({
  conf: PropTypes.shape({
    // Search form datasets configuration
    datasets: DatasetsConfShape,
    // Search form Layout configuration
    layout: Container,
    // Search form criterion configuration
    criterion: PropTypes.arrayOf(PluginConf),
    // Search form resultType configuration
    resultType: PropTypes.string,
    // Search form attributes configuration
    attributes: PropTypes.arrayOf(AttributeConfiguration),
    // Search form attributes regroupements configuration
    attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Does search form render for preview or for full use
    preview: PropTypes.bool,
    // should enable facettes?
    enableFacettes: PropTypes.bool,
  }),
})

export default ModuleConfiguration
