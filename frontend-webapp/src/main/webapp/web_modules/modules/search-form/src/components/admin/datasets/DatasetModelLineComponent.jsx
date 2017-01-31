/**
 * LICENSE_PLACEHOLDER
 **/
import { Model } from '@regardsoss/model'
/**
 * Display a dataset element into the infinite scroll list.
 */
class DatasetModelLineComponent extends React.Component {

  static propTypes = {
    entity: Model.isRequired,
  }

  render() {
    return (
      <div>{this.props.entity.name}</div>
    )
  }
}

export default DatasetModelLineComponent
