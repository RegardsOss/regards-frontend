/**
 * LICENSE_PLACEHOLDER
 **/
import { ContainerShape } from '@regardsoss/layout'
import DatasetsConfShape from './datasets/DatasetsConfShape'
/**
 * Form entity description
 */
const FormShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  resultType: React.PropTypes.string,
  datasets: DatasetsConfShape,
  layout: ContainerShape,
  criterions: CriterionWidgetShape,
})

export default FormShape
