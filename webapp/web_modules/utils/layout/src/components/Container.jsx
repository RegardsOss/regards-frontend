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
 **/
import map from 'lodash/map'
import fpmap from 'lodash/fp/map'
import fpfilter from 'lodash/fp/filter'
import flow from 'lodash/flow'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'mdi-material-ui/DotsVertical'
import Bookmark from 'mdi-material-ui/Bookmark'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { FormattedMessage } from 'react-intl'
import { LazyModuleComponent } from '@regardsoss/modules'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { PluginProvider } from '@regardsoss/plugins'
import { themeContextType } from '@regardsoss/theme'
import ContainerShape from '../model/ContainerShape'
import ContainerHelper from '../ContainerHelper'
import messages from '../i18n'

/** actions names */
export const DELETE_ACTION = 'DELETE_ACTION'
export const ADD_ACTION = 'ADD_ACTION'
export const EDIT_ACTION = 'EDIT_ACTION'

/**
 * Component to display a container into an application layout.
 * This element display the children containers and  modules.
 * @author Sébastien Binda
 */
class Container extends React.Component {
  static defaultProps = {
    configurationMode: false,
    mainContainer: false,
    modules: [],
  }

  static propTypes = {
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    container: ContainerShape,
    modules: AccessShapes.ModuleArray,
    plugins: AccessShapes.UIPluginConfArray,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    dynamicContent: PropTypes.element,
    onContainerClick: PropTypes.func,
    configurationMode: PropTypes.bool,
    mainContainer: PropTypes.bool,
  }

  static iconMenu = (<IconButton><MoreVertIcon /></IconButton>)

  static PLUGIN_WRAPPER_STYLE = {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: on element add
   */
  onAdd = () => {
    const { onContainerClick, container } = this.props
    onContainerClick(ADD_ACTION, container)
  }

  /**
   * User callback: on element edit
   */
  onEdit = () => {
    const { onContainerClick, container } = this.props
    onContainerClick(EDIT_ACTION, container)
  }

  /**
   * User callback: on element delete
   */
  onDelete = () => {
    const { onContainerClick, container } = this.props
    onContainerClick(DELETE_ACTION, container)
  }

  /**
   * Render the children containers of the current container
   * @returns {Array}
   */
  renderSubContainers = () => {
    if (this.props.container.containers) {
      return map(this.props.container.containers, (c, idx) => (
        <Container
          key={c.id}
          project={this.props.project}
          appName={this.props.appName}
          container={c}
          modules={this.props.modules}
          plugins={this.props.plugins}
          pluginProps={this.props.pluginProps}
          dynamicContent={this.props.dynamicContent}
          onContainerClick={this.props.onContainerClick}
          configurationMode={this.props.configurationMode}
        />
      ))
    }
    return []
  }

  /**
   * Render the modules of the current container
   * @returns {Array}
   */
  renderModules = () => {
    if (this.props.configurationMode) {
      return []
    }
    if (this.props.container.dynamicContent) {
      // Render dynamic content in this dynamic container
      return [this.props.dynamicContent]
      // Render modules and plugins of this static container
    }
    return flow(
      fpfilter((module) => module.content.container === this.props.container.id && module.content.applicationId === this.props.appName),
      fpmap((module) => (
        <LazyModuleComponent
          key={module.content.id}
          module={module.content}
          appName={this.props.appName}
          project={this.props.project}
        />)),
    )(this.props.modules)
  }

  /**
   * Render the plugins of the current container
   * @returns {Array}
   */
  renderPlugins = () => {
    const { configurationMode, plugins, container } = this.props
    if (configurationMode || !plugins) {
      return null
    }
    return plugins.filter((plugin) => plugin.container === container.id)
      .map((plugin) => (
        <PluginProvider
          key={plugin.pluginInstanceId}
          pluginInstanceId={plugin.pluginInstanceId}
          pluginId={plugin.pluginId}
          pluginConf={plugin.conf}
          pluginProps={this.props.pluginProps}
          displayPlugin
        />
      ))
  }

  /**
   * Render the configuration options of this container
   * @returns {*}
   */
  renderConfigurationMode = () => {
    const anchorOrigin = {
      horizontal: 'left',
      vertical: 'top',
    }
    const targetOrigin = {
      horizontal: 'left',
      vertical: 'top',
    }
    const toolbarStyle = { height: 40 }
    if (this.props.configurationMode) {
      let deleteAction = null
      if (this.props.mainContainer === false) {
        deleteAction = (<MenuItem
          key="delete"
          onClick={this.onDelete}
          primaryText={<FormattedMessage id="container.configuration.delete.section" />}
        />
        )
      }
      return (
        <I18nProvider messages={messages}>
          <div className="row">
            <Toolbar style={toolbarStyle}>
              <ToolbarGroup key="name">
                <ToolbarTitle text={this.props.container.id} />
                {this.props.container.dynamicContent
                  ? <div title={this.context.intl.formatMessage({ id: 'container.form.dynamicContent' })}>
                    <Bookmark color={this.context.muiTheme.palette.accent1Color} />
                  </div>
                  : null}
              </ToolbarGroup>
              <ToolbarGroup key="actions" lastChild>
                <IconMenu
                  iconButtonElement={Container.iconMenu}
                  anchorOrigin={anchorOrigin}
                  targetOrigin={targetOrigin}
                >
                  <MenuItem
                    key="add"
                    onClick={this.onAdd}
                    primaryText={<FormattedMessage id="container.configuration.add.subsection" />}
                  />
                  <MenuItem
                    key="edit"
                    onClick={this.onEdit}
                    primaryText={<FormattedMessage id="container.configuration.edit.section" />}
                  />
                  {deleteAction}
                </IconMenu>
              </ToolbarGroup>
            </Toolbar>
          </div>
        </I18nProvider>
      )
    }
    return null
  }

  /**
   * Display a container for the application.
   * @param pContainer container to display
   * @param appName application name. Must be a entry in the layout configuration file
   * @returns {XML}
   */
  render() {
    const containerClasses = ContainerHelper.getContainerClassNames(this.props.container)
    const containerStyles = ContainerHelper.getContainerStyles(this.props.container)

    const containerStylesRender = this.props.configurationMode ? { // eslint wont fix: a merge with context is required, what is not detectable outside render...
      ...containerStyles,
      border: `1px solid ${this.context.muiTheme.toolbar.separatorColor}`,
      padding: '1px 2px',
      margin: '2px',
      position: 'relative',
    } : containerStyles

    return (
      <div
        className={containerClasses.join(' ')}
        style={containerStylesRender}
        key={this.props.container.id}
      >
        {this.renderConfigurationMode()}
        {this.renderModules()}
        <div
          style={Container.PLUGIN_WRAPPER_STYLE}
        >
          {this.renderPlugins()}
        </div>
        {this.renderSubContainers()}
      </div>
    )
  }
}

export default Container
