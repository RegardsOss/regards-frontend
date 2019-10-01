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
import Relaunch from 'material-ui/svg-icons/image/rotate-right'
import IconButton from 'material-ui/IconButton'
/**
 * Show storage errors and a relauch button
 * @author Kévin Picart
 */
class StoragesPluginStorageErrorRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.PrioritizedDataStorage,
    onRelaunchStoragesErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  onRelaunchStoragesErrors = () => {
    //
    this.props.onRelaunchStoragesErrors()
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageTable: { errorColumn: { container, relaunchButton } } } } = this.context

    return (
      <div style={container}>
        { entity.content.nbStorageError ? entity.content.nbStorageError : '-' }
        { entity.content.nbStorageError > 0 ? (
          <div style={relaunchButton}>
            <IconButton
              title={formatMessage({ id: 'storage.data-storage.plugins.list.relaunch.storage' })}
              iconStyle={StoragesPluginStorageErrorRenderer.iconStyle}
              style={StoragesPluginStorageErrorRenderer.buttonStyle}
              onClick={this.onRelaunchStoragesErrors()}
            >
              <Relaunch />
            </IconButton>
          </div>
        ) : null }
      </div>
    )
  }
}
export default StoragesPluginStorageErrorRenderer
