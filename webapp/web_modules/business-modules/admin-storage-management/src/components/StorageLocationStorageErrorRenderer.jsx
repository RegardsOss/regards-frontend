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
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'mdi-material-ui/MenuDown'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { storageLocationErrorsRetryActions } from '../clients/StorageLocationClient'
import { storageRequestActions } from '../clients/StorageRequestClient'
import { DIALOG_OPTIONS } from '../domain/StorageLocationDialogOptionsEnum'

/**
 * Show storage errors and a relauch button
 * @author Kévin Picart
 */
class StorageLocationStorageErrorRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onStorageErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  static retryResource = [storageLocationErrorsRetryActions.getDependency('GET')]

  static deleteResource = [storageRequestActions.getDependency('DELETE')]

  static viewResource = [storageRequestActions.getDependency('GET')]

  onRelaunchStoragesErrors = () => {
    const { entity, onStorageErrors } = this.props
    onStorageErrors(entity, DIALOG_OPTIONS.RELAUNCH_ERRORS)
  }

  onDeleteStoragesErrors = () => {
    const { entity, onStorageErrors } = this.props
    onStorageErrors(entity, DIALOG_OPTIONS.DELETE_ERRORS)
  }

  onViewStorageErrors = () => {
    const { entity, onStorageErrors } = this.props
    onStorageErrors(entity, DIALOG_OPTIONS.VIEW_ERRORS)
  }

  render() {
    const { entity: { content: { nbStorageError: errorsCount = 0 } }, availableDependencies } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageTable: { errorColumn: { container, icon } } } } = this.context
    // compute allowed operations (lazy resources access computing)
    const hasErrors = errorsCount > 0
    const canRetry = hasErrors && allMatchHateoasDisplayLogic(StorageLocationStorageErrorRenderer.retryResource, availableDependencies)
    const canDelete = hasErrors && allMatchHateoasDisplayLogic(StorageLocationStorageErrorRenderer.deleteResource, availableDependencies)
    const canView = hasErrors && allMatchHateoasDisplayLogic(StorageLocationStorageErrorRenderer.viewResource, availableDependencies)

    return (
      <div style={container}>
        { formatMessage({ id: 'storage.location.list.errors.count' }, { errorsCount }) }
        { canRetry || canDelete || canView ? (
          <IconMenu
            iconButtonElement={<IconButton style={icon}><MoreVertIcon /></IconButton>}
          >
            { canRetry ? (
              <MenuItem
                primaryText={formatMessage({ id: 'storage.location.list.relaunch.storage' })}
                onClick={this.onRelaunchStoragesErrors}
                key="relaunch"
              />) : null}
            { canDelete ? (
              <MenuItem
                primaryText={formatMessage({ id: 'storage.location.list.delete.storage' })}
                onClick={this.onDeleteStoragesErrors}
                key="delete"
              />
            ) : null}
            { canView ? (
              <MenuItem
                primaryText={formatMessage({ id: 'storage.location.list.view.storage' })}
                onClick={this.onViewStorageErrors}
                key="view"
              />
            ) : null}
          </IconMenu>
        ) : null }
      </div>
    )
  }
}
export default StorageLocationStorageErrorRenderer
