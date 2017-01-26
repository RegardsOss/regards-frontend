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
import {StoragePluginShape} from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StoragePluginCapacityComponent from './StoragePluginCapacityComponent'
import StorageUnitScale, { StorageUnitScaleShape } from '../helper/StorageUnit'
import StorageCapacity from '../helper/StorageCapacity'

class StorageMonitoringComponent extends Component {

  static propTypes = {
    initScale: StorageUnitScaleShape,
    storagePlugins: PropTypes.arrayOf(StoragePluginShape).isRequired,
    expanded: React.PropTypes.bool,
    isFetching: React.PropTypes.bool.isRequired,
    hasError: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...Component.defaultProps,
    initScale: StorageUnitScale.bytesScale,
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
    this.setState({
      expanded,
      currentScale: initScale,
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
    totalSize: StorageCapacity.fromValue(totalSize),
    usedSize: StorageCapacity.fromValue(usedSize),
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
              { expanded ? <ExpandLess color={muiTheme.palette.textColor} /> :
              <ExpandMore color={muiTheme.palette.textColor} /> }
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
              {StorageUnitScale.all.map((scale, index) => (
                <MenuItem
                  value={scale} key={index}
                  primaryText={
                    <FormattedMessage id={scale.messageKey} />
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
                <StoragePluginCapacityComponent key={index} scale={currentScale} {...pluginModel} />
              ))
            }
          </div>
        </LoadableContentDisplayDecorator>

      </Paper>
    )
  }

}

export default StorageMonitoringComponent
