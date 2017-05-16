/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
/**
 * form configuration
 */
const ModuleConfiguration = PropTypes.shape({
  // name of collection model, ordered by level for graph navigation
  graphLevels: PropTypes.arrayOf(PropTypes.string),
  // array of attributes to display on datasets in graph
  graphDatasetAttributes: PropTypes.arrayOf(AttributeConfiguration),
  // [Result form module] Default Target of results
  resultType: PropTypes.string,
  // [Result form module] Search form attributes configuration
  attributes: PropTypes.arrayOf(AttributeConfiguration),
  // [Result form module] Search form attributes regroupements configuration
  attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // [Result form module] should enable facettes?
  enableFacettes: PropTypes.bool,
})

export default ModuleConfiguration
