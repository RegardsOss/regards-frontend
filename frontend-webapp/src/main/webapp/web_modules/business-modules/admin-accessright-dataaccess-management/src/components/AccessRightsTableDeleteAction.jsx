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
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Access rights table delete cell
* @author Raphaël Mechali
*/
class AccessRightsTableDeleteAction extends React.Component {
  static propTypes = {
    // from table cell API
    entity: DataManagementShapes.Dataset.isRequired,
    onDelete: PropTypes.func.isRequired,
    accessRights: DataManagementShapes.AccessRightList,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const accessRight = find(this.props.accessRights, ar => ar.content.dataset.id === this.props.entity.content.id)
    return (
      <IconButton
        title={formatMessage({ id: 'accessright.delete.tooltip' })}
        iconStyle={AccessRightsTableDeleteAction.iconStyle}
        style={AccessRightsTableDeleteAction.buttonStyle}
        onTouchTap={() => this.props.onDelete(accessRight)}
        disabled={!accessRight || !accessRight.content}
      >
        <Reset />
      </IconButton>
    )
  }
}
export default AccessRightsTableDeleteAction
