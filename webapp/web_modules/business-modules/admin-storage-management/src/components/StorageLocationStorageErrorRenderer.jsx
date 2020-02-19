/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { withResourceDisplayControl, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { storageLocationErrorsRetryActions } from '../clients/StorageLocationClient'
import { storageRequestActions } from '../clients/StorageRequestClient'
import StorageLocationListComponent from './StorageLocationListComponent'

const ResourcesIconMenu = withResourceDisplayControl(IconMenu)
const ResourcesMenuItem = withResourceDisplayControl(MenuItem)
/**
 * Show storage errors and a relauch button
 * @author Kévin Picart
 */
class StorageLocationStorageErrorRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
    onStorageErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  static retryResource = storageLocationErrorsRetryActions.getDependency('GET')

  static deleteResource = storageRequestActions.getDependency('DELETE')

  static viewResource = storageRequestActions.getDependency('GET')

  static resources = [StorageLocationStorageErrorRenderer.retryResource, StorageLocationStorageErrorRenderer.deleteResource, StorageLocationStorageErrorRenderer.viewResource]

  state = {
    menuOpened: false,
  }

  onRelaunchStoragesErrors = () => {
    const { entity } = this.props
    this.swithMenu()
    this.props.onStorageErrors(entity, StorageLocationListComponent.DIALOGS_TYPES.RELAUNCH_ERRORS)
  }

  onDeleteStoragesErrors = () => {
    const { entity } = this.props
    this.swithMenu()
    this.props.onStorageErrors(entity, StorageLocationListComponent.DIALOGS_TYPES.DELETE_ERRORS)
  }

  onViewStorageErrors = () => {
    const { entity } = this.props
    this.swithMenu()
    this.props.onStorageErrors(entity, StorageLocationListComponent.DIALOGS_TYPES.VIEW_ERRORS)
  }

  swithMenu = () => {
    this.setState({
      menuOpened: !this.state.menuOpened,
    })
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageTable: { errorColumn: { container, icon } } } } = this.context

    return (
      <div style={container}>
        { entity.content.nbStorageError ? entity.content.nbStorageError : '-' }
        { entity.content.nbStorageError > 0 ? (
          <ResourcesIconMenu
            displayLogic={someMatchHateoasDisplayLogic}
            open={this.state.menuOpened}
            onClick={this.swithMenu}
            resourceDependencies={StorageLocationStorageErrorRenderer.resources}
            iconButtonElement={<IconButton style={icon}><MoreVertIcon /></IconButton>}
          >
            <ResourcesMenuItem
              displayLogic={someMatchHateoasDisplayLogic}
              resourceDependencies={StorageLocationStorageErrorRenderer.retryResource}
              primaryText={formatMessage({ id: 'storage.location.list.relaunch.storage' })}
              onClick={this.onRelaunchStoragesErrors}
              value="relaunch"
              key="delete"
            />
            <ResourcesMenuItem
              displayLogic={someMatchHateoasDisplayLogic}
              resourceDependencies={StorageLocationStorageErrorRenderer.deleteResource}
              primaryText={formatMessage({ id: 'storage.location.list.delete.storage' })}
              onClick={this.onDeleteStoragesErrors}
              value="delete"
              key="delete"
            />
            <ResourcesMenuItem
              displayLogic={someMatchHateoasDisplayLogic}
              resourceDependencies={StorageLocationStorageErrorRenderer.viewResource}
              primaryText={formatMessage({ id: 'storage.location.list.view.storage' })}
              onClick={this.onViewStorageErrors}
              value="view"
              key="view"
            />
          </ResourcesIconMenu>
        ) : null }
      </div>
    )
  }
}
export default StorageLocationStorageErrorRenderer
