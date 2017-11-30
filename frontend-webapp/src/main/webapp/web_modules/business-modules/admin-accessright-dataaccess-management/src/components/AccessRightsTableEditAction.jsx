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
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Access rights table edition cell
* @author Raphaël Mechali
*/
class AccessRightsTableEditAction extends React.Component {
  static propTypes = {
    // from table cell API
    entity: DataManagementShapes.Dataset.isRequired,
    // props
    onEdit: PropTypes.func.isRequired,
    accessRights: DataManagementShapes.AccessRightList,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  onEdit = () => {
    const { accessRights, entity, onEdit } = this.props
    const accessRight = find(accessRights, ar => ar.content.dataset.id === entity.content.id)
    const accessRightToEdit = accessRight && accessRight.content ? accessRight.content : null
    onEdit(accessRightToEdit, entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        className={`selenium-edit-${this.props.entity.content.label}`}
        title={formatMessage({ id: 'accessright.edit.tooltip' })}
        iconStyle={AccessRightsTableEditAction.iconStyle}
        style={AccessRightsTableEditAction.buttonStyle}
        onTouchTap={this.onEdit}
      >
        <Edit />
      </IconButton>
    )
  }
}
export default AccessRightsTableEditAction
