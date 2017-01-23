/**
 * LICENSE_PLACEHOLDER
 **/
import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import PluginShape from '@regardsoss/model/src/archival-storage/StoragePluginMonitoring'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StoragePluringCapacityComponent from './StoragePluginCapacityComponent'
import { bytesScale, allUnitScales } from '../helper/StorageUnit'
import { capacityFromValue } from '../helper/StorageCapacity'

class StorageMonitoring extends Component {

  static propTypes = {
    initScale: PropTypes.string.isRequired,
    storagePlugins: PropTypes.arrayOf(PluginShape),
    expanded: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
  }

  static defaultProps = {
    ...Component.defaultProps,
    initScale: 'bytes',
    isFetching: false,
    hasError: false,
    storagePlugins: [],
    expanded: true,
  }

  /** I18N injection & themes */
  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  componentWillMount = () => {
    // set up the default state with unit scale and expanded state
    const { initScale, storagePlugins, expanded } = this.props
    const scaleToUse = allUnitScales.includes(initScale) ? initScale : bytesScale
    this.setState({
      currentScale: scaleToUse,
      expanded,
      plugins: this.parsePluginsInput(storagePlugins),
    })
  }

  componentWillReceiveProps(nextProps) {
    // check if next plugins data changed
    const { storagePlugins } = nextProps
    if (storagePlugins.length) {
      this.updatePluginsScale(this.state.currentScale, this.parsePluginsInput(storagePlugins))
    }
  }

  onUnitScaleSelected = newScale => this.updatePluginsScale(newScale, this.state.plugins)

  /**
   * On expand / collapse button touch, switches state
   */
  onExpandSwitch = () => {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded,
    })
  }

  updatePluginsScale = (newScale, plugins) => {
    this.setState({
      currentScale: newScale,
      plugins: this.toNewScale(plugins, newScale),
      expanded: this.state.expanded,
    })
  }

  parsePluginsInput = pluginsInput => pluginsInput.map(({ label, description, totalSize, usedSize }) => ({
    label,
    description,
    totalSize: capacityFromValue(totalSize),
    usedSize: capacityFromValue(usedSize),
  }))

  /**
   * Converts known plugins sizes using a new scale
   * @param plugins plugins
   * @param newScale new storage capacity scale
   */
  toNewScale = (plugins, newScale) => plugins.map(({ label, description, totalSize, usedSize }) => ({
    label,
    description,
    totalSize: totalSize ? totalSize.scaleAndConvert(newScale) : null,
    usedSize: usedSize ? usedSize.scaleAndConvert(newScale) : null,
  }))

  render() {
    const { muiTheme } = this.context
    const { currentScale, plugins, expanded } = this.state
    const { isFetching, hasError, storagePlugins } = this.props
    return (
      <Paper >
        <AppBar
          title={
            <FormattedMessage
              id="archival.storage.capacity.monitoring.title"
            />
          }
          titleStyle={{ color: muiTheme.palette.textColor }}
          style={{ background: muiTheme.palette.canvas }}
          iconElementLeft={
            <IconButton onTouchTap={this.onExpandSwitch}>
              { expanded ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          }
          iconElementRight={
            <DropDownMenu
              labelStyle={{
                color: muiTheme.palette.textColor,
              }}
              value={currentScale}
              onChange={(evt, i, value) => this.onUnitScaleSelected(value)}
            >
              {allUnitScales.map((scale, index) => (
                <MenuItem
                  value={scale} key={index}
                  primaryText={
                    <FormattedMessage
                      id={`archival.storage.capacity.monitoring.units.scale.${scale}`}
                    />
                  }
                />
              ))}
            </DropDownMenu>
          }
        />

        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={typeof storagePlugins === 'undefined' || !storagePlugins.length}
          isContentError={hasError}
        >
          <div className="row">
            {
              // map all plugins to cards if component is expanded (hide all otherwise)
              (!expanded) || plugins.map((pluginModel, index) => (
                <StoragePluringCapacityComponent key={index} scale={currentScale} {...pluginModel} />
              ))
            }
          </div>
        </LoadableContentDisplayDecorator>

      </Paper>
    )
  }

}

export default StorageMonitoring
