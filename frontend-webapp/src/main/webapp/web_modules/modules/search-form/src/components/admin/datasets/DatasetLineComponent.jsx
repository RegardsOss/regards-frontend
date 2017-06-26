/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes } from '@regardsoss/shape'
/**
 * Display a dataset element into the infinite scroll list.
 * @author Sébastien binda
 */
class DatasetLineComponent extends React.Component {

  static propTypes = {
    entity: DataManagementShapes.Dataset.isRequired,
  }

  render() {
    return (
      <div>{this.props.entity.content.label}</div>
    )
  }
}

export default DatasetLineComponent
