/**
 * LICENSE_PLACEHOLDER
 **/
import { AttributeModel, AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
/**
 * Form entity description
 * @author Sébastien binda
 */
const Form = React.PropTypes.shape({
  // Search form attributes configuration
  attributes: React.PropTypes.arrayOf(AttributeConfiguration),
  // Search form attributes regroupements configuration
  attributesRegroupements: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // Special configuration given if the module is not load as a independent module
  selectableAttributes: React.PropTypes.objectOf(AttributeModel),
})

export default Form
