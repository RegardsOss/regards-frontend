/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { chain } from 'lodash'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { LazyModuleComponent, ModuleShape } from '@regardsoss/modules'
import { PluginConf } from '@regardsoss/model'
import { PluginProvider } from '@regardsoss/plugins'
import ContainerShape from '../model/ContainerShape'
import ContainerHelper from '../ContainerHelper'
import { DELETE_ACTION, ADD_ACTION, EDIT_ACTION } from './LayoutConfigurationComponent'

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
    modules: PropTypes.arrayOf(ModuleShape),
    plugins: PropTypes.arrayOf(PluginConf),
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    dynamicContent: PropTypes.element,
    onContainerClick: PropTypes.func,
    configurationMode: PropTypes.bool,
    mainContainer: PropTypes.bool,
  }

  static iconMenu = (<IconButton><MoreVertIcon /></IconButton>)

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
    return chain(this.props.modules)
        .filter(module => module.content.container === this.props.container.id && module.content.applicationId === this.props.appName)
      .map((module, idx) => (
        <LazyModuleComponent
          key={module.content.id}
          module={module.content}
          appName={this.props.appName}
          project={this.props.project}
        />),
    )
      .value()
  }

  /**
   * Render the plugins of the current container
   * @returns {Array}
   */
  renderPlugins = () => {
    if (this.props.configurationMode) {
      return []
    }
    if (this.props.plugins) {
      const stylePaper = {
        // display: 'flex',
        // justifyContent: 'space-between',
        width: '100%',
      }
      return chain(this.props.plugins)
        .filter(plugin => plugin.container === this.props.container.id)
        .map((plugin, idx) => (
          <Paper
            key={`${this.props.container.id}-${plugin.pluginId}`}
            style={stylePaper}
          >
            <PluginProvider
              key={`${this.props.container.id}-${plugin.pluginId}`}
              pluginInstanceId={`${this.props.container.id}-${idx}`}
              pluginId={plugin.pluginId}
              pluginConf={plugin.pluginConf}
              pluginProps={this.props.pluginProps}
              displayPlugin
            />
          </Paper>
      )).value()
    }
    return []
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
          onTouchTap={() => {
            this.props.onContainerClick(DELETE_ACTION, this.props.container)
          }}
          primaryText="Delete section"
        />
        )
      }
      return (
        <div className="row">
          <Toolbar style={toolbarStyle}>
            <ToolbarGroup key="name">
              <ToolbarTitle text={this.props.container.id} />
            </ToolbarGroup>
            <ToolbarGroup key="actions">
              <IconMenu
                iconButtonElement={Container.iconMenu}
                anchorOrigin={anchorOrigin}
                targetOrigin={targetOrigin}
              >
                <MenuItem
                  key="add"
                  onTouchTap={() => {
                    this.props.onContainerClick(ADD_ACTION, this.props.container)
                  }}
                  primaryText="Add sub-section"
                />
                <MenuItem
                  key="edit"
                  onTouchTap={() => {
                    this.props.onContainerClick(EDIT_ACTION, this.props.container)
                  }}
                  primaryText="Edit section"
                />
                {deleteAction}
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
        </div>
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

    if (this.props.configurationMode) {
      containerStyles.border = '1px dotted black'
      containerStyles.padding = '5px'
      containerStyles.margin = '5px'
    }

    return (
      <div
        className={containerClasses.join(' ')}
        style={containerStyles}
        key={this.props.container.id}
      >
        {this.renderConfigurationMode()}
        {this.renderModules()}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          {this.renderPlugins()}
        </div>
        {this.renderSubContainers()}
      </div>
    )
  }
}

export default Container
