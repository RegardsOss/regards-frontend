/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import find from 'lodash/find'
import map from 'lodash/map'
import DropDownMenu from 'material-ui/DropDownMenu'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { CommonShapes } from '@regardsoss/shape'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import PluginDescriptionDialog from './PluginDescriptionDialog'
import messages from '../i18n'
import moduleStyles from '../styles'

/**
 * Displays a selectable list of plugins (PluginMetaData)
 * @author Sébastien Binda
 */
export class PluginListComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    pluginList: CommonShapes.PluginMetaDataList,
    defaultSelectedPluginId: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static styles = {
    display: 'flex',
    alignItems: 'center',
  }

  static menuStyles = { top: '-7px' }

  constructor(props) {
    super(props)
    this.state = {
      selectedPluginId: props.defaultSelectedPluginId,
      descriptionOpen: false,
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.defaultSelectedPluginId !== newProps.defaultSelectedPluginId) {
      this.setState({
        selectedPluginId: newProps.defaultSelectedPluginId,
      })
    }
  }

  /**
   * Callback function to select a pluginMetadata from the list
   */
  handleSelect = (event, index, pluginId) => {
    this.setState({ selectedPluginId: pluginId })
    const plugin = find(this.props.pluginList, p => p.content.pluginId === pluginId, null)
    this.props.onChange(plugin ? plugin.content : null)
  }

  handleOpenDescriptionDialog = () => {
    this.setState({
      descriptionOpen: true,
    })
  }

  handleCloseDescriptionDialog = () => {
    this.setState({
      descriptionOpen: false,
    })
  }

  /**
   * Render one pluginMetadata to display in the list
   */
  renderItem = (plugin) => {
    const { moduleTheme } = this.context
    const infos = (
      <div>
        <div style={moduleTheme.pluginListSelector.version}>{`${plugin.content.author} | ${plugin.content.version}`}</div>
        <div style={moduleTheme.pluginListSelector.description}> {plugin.content.description}</div>
      </div>
    )

    return (
      [
        <MenuItem
          innerDivStyle={moduleTheme.pluginListSelector.menuItem}
          key={plugin.content.pluginId}
          value={plugin.content.pluginId}
          primaryText={plugin.content.pluginId}
        >{infos}
        </MenuItem>,
        <Divider key={`divider-${plugin.content.pluginId}`} />,
      ]
    )
  }

  renderDescription = () => {
    const {
      moduleTheme: { markdownDialog },
    } = this.context
    const { selectedPluginId } = this.state
    let button
    if (!selectedPluginId) {
      return null
    }
    // Find plugin
    const plugin = find(this.props.pluginList, p => p.content.pluginId === selectedPluginId)
    if (get(plugin, 'content.markdown')) {
      button = (
        <a
          style={markdownDialog.moreInfoButtonStyle}
          onClick={this.handleOpenDescriptionDialog}
          href="#"
        >
          <FormattedMessage id="plugin.configuration.form.description.more" />
        </a>
      )
    }
    if (plugin != null) {
      return (
        <div>
          {button}
          <PluginDescriptionDialog
            opened={this.state.descriptionOpen}
            onClose={this.handleCloseDescriptionDialog}
            pluginMetaData={plugin.content}
          />
        </div>
      )
    }
    return null
  }

  /**
   * Returns React component
     * @returns {XML}
        */
  render() {
    const { moduleTheme: { renderer: { errorStyle } } } = this.context
    return (
      <div style={PluginListComponent.styles}>
        <div>
          {this.props.title ? this.props.title : null}
        </div>
        <DropDownMenu
          value={this.state.selectedPluginId || '__default__'}
          onChange={this.handleSelect}
          style={PluginListComponent.menuStyles}
          disabled={this.props.disabled}
        >
          <MenuItem value="__default__" primaryText={this.props.selectLabel || 'none'} />
          {map(this.props.pluginList, this.renderItem)}
        </DropDownMenu>
        {this.renderDescription()}
        <div style={errorStyle}>
          {this.props.errorText}
        </div>
      </div>
    )
  }
}

export default withModuleStyle(moduleStyles)(withI18n(messages)(PluginListComponent))
