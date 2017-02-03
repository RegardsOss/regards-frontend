/**
 * LICENSE_PLACEHOLDER
 **/
import { Entity } from '@regardsoss/model'
/**
 * Display a dataset element into the infinite scroll list.
 * @author Sébastien binda
 */
class DatasetLineComponent extends React.Component {

  static propTypes = {
    entity: Entity.isRequired,
  }

  render() {
    return (
      <div>{this.props.entity.content.label}</div>
    )
  }
}

export default DatasetLineComponent
