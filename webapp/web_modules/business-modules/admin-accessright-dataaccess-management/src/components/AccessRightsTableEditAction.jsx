/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Edit from 'mdi-material-ui/Pencil'
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
    entity: DataManagementShapes.DatasetWithAccessRight.isRequired,
    // props
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  onEdit = () => {
    const { entity, onEdit } = this.props
    onEdit(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        className={`selenium-edit-${this.props.entity.content.dataset.feature.label}`}
        title={formatMessage({ id: 'accessright.edit.tooltip' })}
        iconStyle={AccessRightsTableEditAction.iconStyle}
        style={AccessRightsTableEditAction.buttonStyle}
        onClick={this.onEdit}
      >
        <Edit />
      </IconButton>
    )
  }
}
export default AccessRightsTableEditAction
