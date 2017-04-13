/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
/**
 * form configuration
 */
const ModuleConfiguration = React.PropTypes.shape({
  // name of collection model, ordered by level for graph navigation
  graphLevels: React.PropTypes.arrayOf(React.PropTypes.string),
  // array of attributes to display on datasets in graph
  graphDatasetAttributes: React.PropTypes.arrayOf(AttributeConfiguration),
  // [Result form module] Default Target of results
  resultType: React.PropTypes.string,
  // [Result form module] Search form attributes configuration
  attributes: React.PropTypes.arrayOf(AttributeConfiguration),
  // [Result form module] Search form attributes regroupements configuration
  attributesRegroupements: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // [Result form module] should enable facettes?
  enableFacettes: React.PropTypes.bool,
})

export default ModuleConfiguration
