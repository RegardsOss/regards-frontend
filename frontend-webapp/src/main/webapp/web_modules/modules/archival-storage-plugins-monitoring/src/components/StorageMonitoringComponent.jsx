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
import isUndefined from 'lodash/isUndefined'
import map from 'lodash/map'
import size from 'lodash/size'
import ModuleIcon from 'material-ui/svg-icons/device/data-usage'
import { ArchivalStorageShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DynamicModule, ModuleTitle } from '@regardsoss/components'
import StoragePluginContainer from '../containers/StoragePluginContainer'
import ScaleSelectorComponent from './ScaleSelectorComponent'

/**
 * Storage monitoring module's main component
 * @author Raphaël Mechali
 */
class StorageMonitoringComponent extends React.Component {

  static propTypes = {
    scale: storage.StorageUnitScaleShape.isRequired,
    storagePlugins: ArchivalStorageShapes.StoragePluginList.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    // expanded state management
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
    onUnitScaleChanged: PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType, ...i18nContextType }

  parsePluginsInput = pluginsInput => pluginsInput.map(({ id, label, description, totalSize, usedSize }) => ({
    id,
    label,
    description,
    totalSize: storage.StorageCapacity.fromValue(totalSize),
    usedSize: storage.StorageCapacity.fromValue(usedSize),
  }))

  /**
   * @return {[React.element]} module options
   */
  renderOptions = () => {
    const { scale, onUnitScaleChanged } = this.props
    return [<ScaleSelectorComponent key="selector" scale={scale} onUnitScaleChanged={onUnitScaleChanged} />]
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { user } } = this.context
    const { isFetching, hasError, storagePlugins, scale, expanded, onExpandChange } = this.props
    return (
      <DynamicModule
        title={<ModuleTitle
          IconConstructor={ModuleIcon}
          text={formatMessage({ id: 'archival.storage.capacity.monitoring.title' })}
        />}
        onExpandChange={onExpandChange}
        expanded={expanded}
        options={this.renderOptions()}
      >
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={isUndefined(storagePlugins) || !size(storagePlugins)}
          isContentError={hasError}
        >
          <div style={user.root.style}>
            {
              // map all plugins to cards
              map(storagePlugins, plugin => (
                <StoragePluginContainer
                  key={plugin.content.confId}
                  scale={scale}
                  plugin={plugin}
                />
              ))
            }
          </div>
        </LoadableContentDisplayDecorator>
      </DynamicModule>
    )
  }

}

export default StorageMonitoringComponent
