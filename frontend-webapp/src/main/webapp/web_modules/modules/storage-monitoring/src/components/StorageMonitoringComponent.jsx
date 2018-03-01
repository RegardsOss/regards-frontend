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
import { StorageShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StoragePluginContainer from '../containers/StoragePluginContainer'


/**
 * Storage monitoring module's main component
 * @author Raphaël Mechali
 */
class StorageMonitoringComponent extends React.Component {
  static propTypes = {
    scale: storage.StorageUnitScaleShape.isRequired,
    storagePlugins: StorageShapes.StorageMonitoringList.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
  }

  static contextTypes = { ...themeContextType, ...i18nContextType }

  render() {
    const { moduleTheme: { user } } = this.context
    const {
      isFetching, hasError, storagePlugins, scale,
    } = this.props
    return (
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

    )
  }
}

export default StorageMonitoringComponent
