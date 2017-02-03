/**
 * LICENSE_PLACEHOLDER
 **/
import { ContainerShape } from '@regardsoss/layout'

/**
 * Form entity description
 * @author Sébastien binda
 */
const FormShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  resultType: React.PropTypes.string,
  datasets: React.PropTypes.arrayOf(React.PropTypes.string),
  datasetModels: React.PropTypes.arrayOf(React.PropTypes.string),
  layout: ContainerShape,
})

export default FormShape
