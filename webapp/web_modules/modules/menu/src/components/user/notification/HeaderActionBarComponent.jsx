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
import isEmpty from 'lodash/isEmpty'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'mdi-material-ui/Delete'
import { AdminShapes } from '@regardsoss/shape'
import { RefreshIndicatorComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display delete notification group action.
 * @author Théo Lasserre
 */
class HeaderActionBarComponent extends React.Component {
  static propTypes = {
    tableSelection: PropTypes.arrayOf(AdminShapes.NotificationWithinContent),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    onDeleteNotifications: PropTypes.func,
    onCloseNotificationDialog: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onDelete = () => {
    const { onDeleteNotifications, tableSelection, selectionMode } = this.props
    onDeleteNotifications(tableSelection, selectionMode)
  }

  isButtonDisabled = () => {
    const { areAllSelected, tableSelection } = this.props
    return !areAllSelected && isEmpty(tableSelection)
  }

  render() {
    const { onCloseNotificationDialog, isDeleting } = this.props
    const { intl: { formatMessage }, moduleTheme: { notifications: { dialog: { deleteButtonStyle, deleteIndicatorStyle, headerDivStyle } } } } = this.context
    const isDeleteButtonDisabled = this.isButtonDisabled()
    return (
      <div style={headerDivStyle}>
        {
          isDeleting ?
            <RefreshIndicatorComponent
              left={0}
              top={0}
              status="loading"
              style={deleteIndicatorStyle}
              size={30}
            /> :
            <FlatButton
              icon={<Delete />}
              label={formatMessage({ id: 'user.menu.notification.header.delete.button' })}
              onClick={this.onDelete}
              disabled={isDeleteButtonDisabled}
              key="delete"
              style={!isDeleteButtonDisabled ? deleteButtonStyle : null}
            />
        }
        <RaisedButton
          label={formatMessage({ id: 'user.menu.notification.action.close' })}
          key="close"
          primary
          onClick={onCloseNotificationDialog}
        />
      </div>
    )
  }
}
export default HeaderActionBarComponent
