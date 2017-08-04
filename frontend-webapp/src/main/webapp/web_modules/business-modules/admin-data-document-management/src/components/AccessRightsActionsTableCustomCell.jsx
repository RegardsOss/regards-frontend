/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import find from 'lodash/find'
import Reset from 'material-ui/svg-icons/action/highlight-off'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { DataManagementShapes } from '@regardsoss/shape'
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
    accessRights: DataManagementShapes.AccessRightList,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    entity: DataManagementShapes.Document,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  // Static css inline styles
  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  renderDeleteButton = (accessRight) => {
    if (!accessRight || !accessRight.content) {
      return null
    }

    return (
      <IconButton
        title={this.props.intl.formatMessage({ id: 'accessright.delete.tooltip' })}
        iconStyle={AccessRightsActionsTableCustomCell.iconStyle}
        style={AccessRightsActionsTableCustomCell.buttonStyle}
        onTouchTap={() => this.props.onDelete(accessRight)}
      >
        <Reset />
      </IconButton>
    )
  }

  renderEditButton = (accessRight) => {
    const accessRightToEdit = accessRight && accessRight.content ? accessRight.content : null
    return (
      <IconButton
        title={this.props.intl.formatMessage({ id: 'accessright.edit.tooltip' })}
        iconStyle={AccessRightsActionsTableCustomCell.iconStyle}
        style={AccessRightsActionsTableCustomCell.buttonStyle}
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
