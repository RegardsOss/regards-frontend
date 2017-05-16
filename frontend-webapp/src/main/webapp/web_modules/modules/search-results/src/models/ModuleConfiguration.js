/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeModel, AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
/**
 * Form entity description
 * @author Sébastien binda
 */
const Form = PropTypes.shape({
  // Default Target of results
  resultType: PropTypes.string,
  // Search form attributes configuration
  attributes: PropTypes.arrayOf(AttributeConfiguration),
  // Search form attributes regroupements configuration
  attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // Special configuration given if the module is not load as a independent module
  selectableAttributes: PropTypes.objectOf(AttributeModel),
  // should enable facettes?
  enableFacettes: PropTypes.bool,
  // For modules using the single dataset capacity (hide the datasets configuration in admin)
  hideDatasetsConfiguration: PropTypes.bool,
  // Initial single dataset ipId
  singleDatasetIpId: PropTypes.string,
  // Initial search query
  searchQuery: PropTypes.string,
  // Fixed breadcrumb depending on search current context.
  breadcrumbInitialContextLabel: PropTypes.string,
})

export default Form
