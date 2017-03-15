/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginConf, AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
import DatasetsConfShape from './datasets/DatasetsConfShape'
/**
 * Form entity description
 * @author Sébastien binda
 */
const ModuleConfiguration = React.PropTypes.shape({
  // Search form datasets configuration
  datasets: DatasetsConfShape,
  // Search form Layout configuration
  layout: React.PropTypes.string,
  // Search form criterion configuration
  criterion: React.PropTypes.arrayOf(PluginConf),
  // Search form resultType configuration
  resultType: React.PropTypes.string,
  // Search form attributes configuration
  attributes: React.PropTypes.arrayOf(AttributeConfiguration),
  // Search form attributes regroupements configuration
  attributesRegroupements: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // Does search form render for preview or for full use
  preview: React.PropTypes.bool,
  // should enable facettes?
  enableFacettes: React.PropTypes.bool.isRequired,
})

export default ModuleConfiguration
