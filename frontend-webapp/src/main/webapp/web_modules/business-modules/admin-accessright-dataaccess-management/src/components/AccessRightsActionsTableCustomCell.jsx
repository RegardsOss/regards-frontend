import find from 'lodash/find'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { Dataset, AccessRight } from '@regardsoss/model'
import IconButton from 'material-ui/IconButton'

class AccessRightsActionsTableCustomCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    accessRights: PropTypes.objectOf(AccessRight),
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    entity: Dataset,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  renderDeleteButton = (accessRight) => {
    if (!accessRight || !accessRight.content) {
      return null
    }
    return (
      <IconButton
        title={this.props.intl.formatMessage({ id: 'accessright.delete.tooltip' })}
        iconStyle={{
          height: 23,
          width: 23,
        }}
        style={{
          padding: 0,
          height: 30,
          width: 30,
        }}
        onTouchTap={() => this.props.onDelete(accessRight)}
      >
        <Delete />
      </IconButton>
    )
  }

  renderEditButton = (accessRight) => {
    const accessRightToEdit = accessRight && accessRight.content ? accessRight.content : null
    return (
      <IconButton
        title={this.props.intl.formatMessage({ id: 'accessright.edit.tooltip' })}
        iconStyle={{
          height: 23,
          width: 23,
        }}
        style={{
          padding: 0,
          height: 30,
          width: 30,
        }}
        onTouchTap={() => this.props.onEdit(accessRightToEdit, this.props.entity)}
      >
        <Edit />
      </IconButton>
    )
  }

  render() {
    const accessRight = find(this.props.accessRights, ar => ar.content.dataset.id === this.props.entity.content.id)
    return (
      <div>
        {this.renderEditButton(accessRight)}
        {this.renderDeleteButton(accessRight)}
      </div>
    )
  }
}

export default AccessRightsActionsTableCustomCell
