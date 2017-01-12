/**
 * LICENSE_PLACEHOLDER
 **/
import { ContainerShape } from '@regardsoss/layout'
import DatasetsConfShape from './datasets/DatasetsConfShape'
import { Criteria } from './criterion/Criteria'
/**
 * Form entity description
 */
const FormShape = React.PropTypes.shape({
  id: React.PropTypes.number,
  resultType: React.PropTypes.string,
  datasets: DatasetsConfShape,
  layout: ContainerShape,
  criterion: React.PropTypes.arrayOf(Criteria),
})

export default FormShape
