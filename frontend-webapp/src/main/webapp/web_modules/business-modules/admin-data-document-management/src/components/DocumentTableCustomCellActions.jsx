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
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { DataManagementShapes } from '@regardsoss/shape'
import IconButton from 'material-ui/IconButton'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { ActionsMenuCell } from '@regardsoss/components'

const actionsBreakpoints = [940, 995]

const HateoasIconAction = withHateoasDisplayControl(IconButton)

class DocumentTableCustomCellActions extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    entity: DataManagementShapes.Document,
    rowIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
  }

  // Static css inline styles
  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { entity, rowIndex, pageSize } = this.props
    return (
      <div>
        <ActionsMenuCell
          breakpoints={actionsBreakpoints}
        >
          <HateoasIconAction
            title={this.props.intl.formatMessage({ id: 'document.list.action.delete' })}
            iconStyle={DocumentTableCustomCellActions.iconStyle}
            style={DocumentTableCustomCellActions.buttonStyle}
            onClick={() => this.props.onDelete(entity, rowIndex, pageSize)}
            entityLinks={entity.links}
            hateoasKey={HateoasKeys.DELETE}
          >
            <Delete />
          </HateoasIconAction>
          <HateoasIconAction
            title={this.props.intl.formatMessage({ id: 'document.list.action.edit' })}
            iconStyle={DocumentTableCustomCellActions.iconStyle}
            style={DocumentTableCustomCellActions.buttonStyle}
            onClick={() => this.props.onEdit(entity.content.id)}
            entityLinks={entity.links}
            hateoasKey={HateoasKeys.UPDATE}
          >
            <Edit />
          </HateoasIconAction>
        </ActionsMenuCell>
      </div>
    )
  }
}

export default DocumentTableCustomCellActions
