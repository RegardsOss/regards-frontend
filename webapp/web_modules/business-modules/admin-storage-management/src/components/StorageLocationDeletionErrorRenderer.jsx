/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'mdi-material-ui/MenuDown'
import { DIALOG_OPTIONS } from '../domain/StorageLocationDialogOptionsEnum'

/**
 * Show Deletion Errors and a button to relauch
 * @author Kévin Picart
 */
class StorageLocationDeletionErrorRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
    onDeletionErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  onRelaunchDeletingErrors = () => {
    const { entity, onDeletionErrors } = this.props
    onDeletionErrors(entity, DIALOG_OPTIONS.RELAUNCH_ERRORS)
  }

  onDeleteDeletingErrors = () => {
    const { entity, onDeletionErrors } = this.props
    onDeletionErrors(entity, DIALOG_OPTIONS.DELETE_ERRORS)
  }

  onViewDeletionErrors = () => {
    const { entity, onDeletionErrors } = this.props
    onDeletionErrors(entity, DIALOG_OPTIONS.VIEW_ERRORS)
  }

  render() {
    const { entity: { content: { nbDeletionError: errorsCount = 0 } } } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageTable: { errorColumn: { container, icon } } } } = this.context

    return (
      <div style={container}>
        { formatMessage({ id: 'storage.location.list.errors.count' }, { errorsCount }) }
        { errorsCount > 0 ? (
          <IconMenu
            iconButtonElement={<IconButton style={icon}><MoreVertIcon /></IconButton>}
          >
            <MenuItem
              primaryText={formatMessage({ id: 'storage.location.list.relaunch.deletion' })}
              onClick={this.onRelaunchDeletingErrors}
            />
            <MenuItem
              primaryText={formatMessage({ id: 'storage.location.list.delete.deletion' })}
              onClick={this.onDeleteDeletingErrors}
            />
            <MenuItem
              primaryText={formatMessage({ id: 'storage.location.list.view.deletion' })}
              onClick={this.onViewDeletionErrors}
            />
          </IconMenu>
        ) : null }
      </div>
    )
  }
}
export default StorageLocationDeletionErrorRenderer
