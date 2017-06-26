/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes } from '@regardsoss/shape'
/**
 * Display a dataset element into the infinite scroll list.
 * @author Sébastien binda
 */
class DatasetModelLineComponent extends React.Component {

  static propTypes = {
    entity: DataManagementShapes.Model.isRequired,
  }

  render() {
    return (
      <div>{this.props.entity.content.name}</div>
    )
  }
}

export default DatasetModelLineComponent
