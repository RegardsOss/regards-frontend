/**
 * LICENSE_PLACEHOLDER
 **/
import { some } from 'lodash'
import { Entity, AccessRight } from '@regardsoss/model'

/**
 * Display a dataset element into the infinite scroll list.
 * @author Sébastien binda
 */
class DatasetLineComponent extends React.Component {

  static propTypes = {
    entity: Entity.isRequired,
    accessRights: React.PropTypes.arrayOf(AccessRight),
    onDelete: React.PropTypes.func,
  }


  render() {
    const { entity, onDelete } = this.props
    const isDefined = some(this.props.accessRights, accessRight => accessRight.dataSet.id === entity.content.id)
    if (isDefined) {
      return (
        <div >{entity.content.label} √ - <a
          // eslint-disable-next-line no-script-url
          href="javascript:void(0)"
          onClick={(proxy, event) => {
            onDelete(entity)
          }}
        >
          Delete
        </a></div>
      )
    }
    return (
      <div>{entity.content.label}</div>
    )
  }
}

export default DatasetLineComponent
