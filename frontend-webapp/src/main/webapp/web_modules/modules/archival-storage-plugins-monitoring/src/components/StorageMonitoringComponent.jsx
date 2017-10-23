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
import { FormattedMessage } from 'react-intl'
import isUndefined from 'lodash/isUndefined'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import { ArchivalStorageShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DynamicModule } from '@regardsoss/components'
import StoragePluginCapacityComponent from './StoragePluginCapacityComponent'

class StorageMonitoringComponent extends React.Component {

  static propTypes = {
    initScale: storage.StorageUnitScaleShape,
    storagePlugins: ArchivalStorageShapes.StoragePluginContentArray.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    // expanded state management
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    initScale: storage.StorageUnitScale.bytesScale,
    isFetching: false,
    hasError: false,
    storagePlugins: [],
  }

  /** I18N injection & themes */
  static contextTypes = { ...themeContextType, ...i18nContextType }

  componentWillMount = () => {
    // set up the default state with unit scale
    const { initScale, storagePlugins } = this.props
    this.updateState(initScale, this.parsePluginsInput(storagePlugins), false)
  }

  componentWillReceiveProps(nextProps) {
    // check if next plugins data changed
    const { storagePlugins } = nextProps
    if (storagePlugins.length) {
      this.updateState(this.state.currentScale, this.parsePluginsInput(storagePlugins))
    }
  }

  onUnitScaleSelected = newScale => this.updateState(newScale, this.state.plugins)

  updateState = (currentScale, plugins) => {
    this.setState({
      currentScale,
      plugins,
    })
  }

  parsePluginsInput = pluginsInput => pluginsInput.map(({ id, label, description, totalSize, usedSize }) => ({
    id,
    label,
    description,
    totalSize: storage.StorageCapacity.fromValue(totalSize),
    usedSize: storage.StorageCapacity.fromValue(usedSize),
  }))

  /**
   * Converts known plugins sizes using a new scale
   * @param plugins plugins
   * @param newScale new storage capacity scale
   */
  toNewScale = (plugins, newScale) => plugins.map(({ id, label, description, totalSize, usedSize }) => ({
    id,
    label,
    description,
    totalSize: totalSize ? totalSize.scaleAndConvert(newScale) : null,
    usedSize: usedSize ? usedSize.scaleAndConvert(newScale) : null,
  }))

  renderOptions = () => {
    const { currentScale } = this.state
    // TODO v2 replace by a stateful drop down
    return [
      <FormattedMessage key="label" id={currentScale.messageKey} />,
      <IconMenu
        key="menu"
        iconButtonElement={<IconButton><LinearScale /></IconButton>}
        value={currentScale}
        onChange={(evt, value) => this.onUnitScaleSelected(value)}
      >
        {storage.StorageUnitScale.all.map(scale => (
          <MenuItem
            key={scale.id}
            value={scale}
            primaryText={
              <FormattedMessage id={scale.messageKey} />
            }
          />
        ))}
      </IconMenu>,
    ]
  }

  render() {
    const { intl } = this.context
    const { currentScale, plugins } = this.state
    const { isFetching, hasError, storagePlugins, expanded, onExpandChange } = this.props
    return (
      <DynamicModule
        title={intl.formatMessage({ id: 'archival.storage.capacity.monitoring.title' })}
        onExpandChange={onExpandChange}
        expanded={expanded}
        options={this.renderOptions}
      >
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={isUndefined(storagePlugins) || !storagePlugins.length}
          isContentError={hasError}
        >
          <div className="row">
            {
              // map all plugins to cards
              plugins.map(pluginModel => (
                <StoragePluginCapacityComponent key={pluginModel.id} scale={currentScale} {...pluginModel} />
              ))
            }
          </div>
        </LoadableContentDisplayDecorator>
      </DynamicModule>
    )
  }

}

export default StorageMonitoringComponent
