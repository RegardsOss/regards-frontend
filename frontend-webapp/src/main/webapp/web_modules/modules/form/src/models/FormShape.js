/**
 * LICENSE_PLACEHOLDER
 **/
import { ContainerShape } from '@regardsoss/layout'
import { PluginConf } from '@regardsoss/model'
import DatasetsConfShape from './datasets/DatasetsConfShape'
/**
 * Form entity description
 */
const FormShape = React.PropTypes.shape({
  id: React.PropTypes.number,
  resultType: React.PropTypes.string,
  datasets: DatasetsConfShape,
  layout: ContainerShape,
  criterion: React.PropTypes.arrayOf(PluginConf),
})

export default FormShape
