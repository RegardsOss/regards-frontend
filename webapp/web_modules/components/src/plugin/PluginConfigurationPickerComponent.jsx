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
 */
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import ArrowDropRight from 'mdi-material-ui/MenuRight'
import MoreVertIcon from 'mdi-material-ui/DotsVertical'
import Delete from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/display-control'
import styles from './styles'

class PluginConfigurationPickerComponent extends React.Component {
  static propTypes = {
    rightRemoveIcon: PropTypes.bool,
    onNewPluginConf: PropTypes.func,
    // Callback provided by redux-form in order to manually change a field value
    // must return a promise
    onChange: PropTypes.func,
    currentPluginConfiguration: CommonShapes.PluginConfiguration,
    pluginMetaDataList: PropTypes.oneOfType([CommonShapes.PluginMetaDataList, CommonShapes.PluginMetaDataArray]),
    pluginConfigurationList: PropTypes.oneOfType([CommonShapes.PluginConfigurationList, CommonShapes.PluginConfigurationArray]),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    currentPluginConfiguration: this.props.currentPluginConfiguration,
    newConfSelected: false,
  }

  /**
   * When the parent provides a different currentPluginConfiguration, use it as current selected
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentPluginConfiguration !== this.props.currentPluginConfiguration) {
      this.setState({
        currentPluginConfiguration: nextProps.currentPluginConfiguration,
      })
    }
  }

  handleChange = (value) => {
    this.setState({
      openMenu: false,
      newConfSelected: false,
    })
    const selectedConf = find(this.props.pluginConfigurationList, (el) => el.content.id === value)
    this.props.onChange(value, get(selectedConf, 'content', undefined))
      .then((actionResults) => {
        if (!actionResults.error) {
          this.setState({
            currentPluginConfiguration: get(selectedConf, 'content', undefined),
          })
        }
        return actionResults
      })
  }

  handleNewConf = (pluginMetadata) => {
    this.setState({
      openMenu: false,
      newConfSelected: true,
      currentPluginConfiguration: null,
    })
    this.props.onChange(null)
    this.props.onNewPluginConf(pluginMetadata.content)
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
      newConfSelected: false,
    })
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  /** User callback: clear selection */
  onClear = () => this.handleChange(null)

  /**
   * Builds a menu item content
   * @param {*} leftContent left content
   * @param {*} rightContent right content
   * @param {*} emphasis should display as emphasized?
   */
  buildMenuItemPrimaryText = (leftContent, rightContent, emphasis = false) => {
    const { moduleTheme: { pluginConfigurationPicker } } = this.context
    return (
      <div style={emphasis ? pluginConfigurationPicker.defaultItem : pluginConfigurationPicker.emphasisItem}>
        {leftContent}
        {rightContent ? <span style={pluginConfigurationPicker.rightItemContent}>{rightContent}</span> : null}
      </div>)
  }

  buildAvailablePluginItems = (plugins, pluginConfs, selectedPluginConf, onNewPluginConf) => map(plugins, (plugin) => {
    const pluginConfsForThisPluginMetaData = filter(pluginConfs, (pluginConfiguration) => pluginConfiguration.content.pluginId === plugin.content.pluginId)
    const isPluginConfigurationListEmpty = (isEmpty(pluginConfsForThisPluginMetaData) && !onNewPluginConf)
    return (
      <MenuItem
        key={plugin.content.pluginId}
        primaryText={this.buildMenuItemPrimaryText(plugin.content.pluginId, plugin.content.version)}
        rightIcon={<ArrowDropRight />}
        disabled={isPluginConfigurationListEmpty}
        menuItems={this.buildAvailableConfItems(plugin, pluginConfsForThisPluginMetaData, selectedPluginConf, onNewPluginConf)}
      />
    )
  })

  buildAvailableConfItems = (plugin, confs, selectedConf, onNewPluginConf) => {
    const { intl: { formatMessage } } = this.context
    const items = map(confs, (conf) => (<MenuItem
      key={conf.content.id}
      primaryText={this.buildMenuItemPrimaryText(conf.content.label, conf.content.version)}
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      onClick={() => this.handleChange(conf.content.id)} // eslint wont fix: cannot subclass menu items in MUI 0x (breaks menu auto closing)
      checked={selectedConf && conf.content.id === selectedConf.id}
    />))
    if (onNewPluginConf) {
      items.push(
        <MenuItem
          key="newPluginConf"
          primaryText={this.buildMenuItemPrimaryText(formatMessage({ id: 'component.plugin-parameter.new.conf.option' }), null, true)}
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onClick={() => this.handleNewConf(plugin)} // eslint wont fix: cannot subclass menu items in MUI 0x (breaks menu auto closing)
        />,
      )
    }
    return items
  }

  renderRemoveSelected = () => {
    const { rightRemoveIcon } = this.props
    const { currentPluginConfiguration } = this.state
    const { intl: { formatMessage } } = this.context
    if (rightRemoveIcon) {
      return (
        <ShowableAtRender show={currentPluginConfiguration != null}>
          <IconButton
            key="remove"
            title={formatMessage({ id: 'component.plugin-parameter.action.reset' })}
            onClick={this.onClear}
          >
            <Delete />
          </IconButton>
        </ShowableAtRender>
      )
    }
    return (
      <ShowableAtRender show={currentPluginConfiguration != null}>
        <Divider />
        <MenuItem
          key="none"
          primaryText={formatMessage({ id: 'component.plugin-parameter.action.reset' })}
          onClick={this.onClear}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const { pluginMetaDataList, pluginConfigurationList, onNewPluginConf } = this.props
    const { openMenu, currentPluginConfiguration, newConfSelected } = this.state
    const { intl: { formatMessage }, moduleTheme: { pluginConfigurationPicker } } = this.context
    const hasNoPlugin = isEmpty(pluginMetaDataList) || (isEmpty(pluginConfigurationList) && !onNewPluginConf)

    const defaultLabel = newConfSelected ? formatMessage({ id: 'component.plugin-parameter.action.create-plugin' })
      : formatMessage({ id: 'component.plugin-parameter.action.choose-plugin' })
    const buttonLabel = currentPluginConfiguration ? currentPluginConfiguration.label : defaultLabel

    return (
      <div>
        <br />
        <RaisedButton
          label={buttonLabel}
          onClick={this.handleOpenMenu}
          style={pluginConfigurationPicker.pluginButton}
          disabled={hasNoPlugin}
          title={hasNoPlugin ? this.context.intl.formatMessage({ id: 'component.plugin-parameter.no-plugin-available' }) : null}
        />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          open={openMenu}
          onRequestChange={this.handleOnRequestChange}
          desktop
          autoWidth
          style={pluginConfigurationPicker.iconMenu}
        >
          {this.buildAvailablePluginItems(pluginMetaDataList,
            pluginConfigurationList, currentPluginConfiguration, onNewPluginConf)}
        </IconMenu>
        {this.renderRemoveSelected()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(PluginConfigurationPickerComponent)
