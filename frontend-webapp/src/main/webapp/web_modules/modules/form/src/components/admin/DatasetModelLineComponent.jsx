/**
 * LICENSE_PLACEHOLDER
 **/
import { Model } from '@regardsoss/api'
/**
 * Display a dataset element into the infinite scroll list.
 */
class DatasetModelLineComponent extends React.Component {

  static propTypes = {
    entity: Model,
  }

  render() {
    return (
      <div>{this.props.entity.content.name}</div>
    )
  }
}

export default DatasetModelLineComponent
