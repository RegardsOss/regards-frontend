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
import isUndefined from 'lodash/isUndefined'
import map from 'lodash/map'
import size from 'lodash/size'
import { storage } from '@regardsoss/units'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { Measure, ScrollArea } from '@regardsoss/adapters'
import StoragePluginContainer from '../../containers/user/StoragePluginContainer'


/**
 * Storage monitoring module's main component
 * @author Raphaël Mechali
 */
class StorageMonitoringComponent extends React.Component {
  static propTypes = {
    userApp: PropTypes.bool.isRequired,
    scale: storage.StorageUnitScaleShape.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    storagePlugins: PropTypes.any,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
  }

  static contextTypes = { ...themeContextType, ...i18nContextType }

  state = {
    scrollAreaStyle: {
      height: 0,
    },
  }

  /**
   * Component was resized
   */
  onComponentResized = ({ measureDiv: { height } }) => {
    const previousHeight = this.state.scrollAreaStyle.height
    this.setState({
      // XXX-WORKAROUND see InfiniteTableContainer for more explanation (in this case, the component will simply not resize when
      // size is lower)
      scrollAreaStyle: {
        height: height <= previousHeight ? height - 100 : height,
      },
    })
  }

  render() {
    const { moduleTheme: { admin, user } } = this.context
    const {
      userApp, isFetching, hasError, storagePlugins, scale,
    } = this.props
    const { scrollAreaStyle } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={isFetching}
        isEmpty={isUndefined(storagePlugins) || !size(storagePlugins)}
        isContentError={hasError}
      >
        <Measure bounds onMeasure={this.onComponentResized}>
          { // measure available vertical space to show the scroll area
        ({ bind }) => (
          <div style={userApp ? user.root.style : admin.root.style} {...bind('measureDiv')}>
            <ScrollArea
              style={scrollAreaStyle}
              contentStyle={user.scollContentArea.style}
              vertical
            >
              {
            // map all plugins to cards
            map(storagePlugins, plugin => (
              <StoragePluginContainer
                userApp={userApp}
                key={plugin.content.confId}
                scale={scale}
                plugin={plugin}
              />
            ))
          }
            </ScrollArea>
          </div>)
      }
        </Measure>
      </LoadableContentDisplayDecorator>
    )
  }
}

export default StorageMonitoringComponent
