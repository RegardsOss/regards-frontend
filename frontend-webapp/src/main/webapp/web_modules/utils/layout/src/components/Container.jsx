/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { LazyModuleComponent, ModuleListProvider, ModuleShape } from '@regardsoss/modules'
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

  static propTypes = {
    project: React.PropTypes.string,
    appName: React.PropTypes.string.isRequired,
    container: ContainerShape,
    modules: React.PropTypes.arrayOf(ModuleShape),
    plugins: React.PropTypes.arrayOf(PluginConf),
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: React.PropTypes.object,
    dynamicContent: React.PropTypes.element,
    onDynamicModuleSelection: React.PropTypes.func,
    onContainerClick: React.PropTypes.func,
    configurationMode: React.PropTypes.bool,
    mainContainer: React.PropTypes.bool,
  }

  /**
   * Render the children containers of the current container
   * @returns {Array}
   */
  renderSubContainers = () => {
    const renderContainers = []
    if (this.props.container.containers) {
      forEach(this.props.container.containers, (c, idx) => (
        renderContainers.push(
          <Container
            key={c.id}
            project={this.props.project}
            appName={this.props.appName}
            container={c}
            modules={this.props.modules}
            plugins={this.props.plugins}
            pluginProps={this.props.pluginProps}
            dynamicContent={this.props.dynamicContent}
            onDynamicModuleSelection={this.props.onDynamicModuleSelection}
            onContainerClick={this.props.onContainerClick}
            configurationMode={this.props.configurationMode}
          />,
        )
      ))
    }
    return renderContainers
  }

  /**
   * Render the modules of the current container
   * @returns {Array}
   */
  renderModules = () => {
    const renderModules = []
    if (this.props.configurationMode) {
      return renderModules
    }
    if (this.props.container.dynamicContent) {
      // Render dynamic content in this dynamic container
      renderModules.push(this.props.dynamicContent)
      renderModules.push(<ModuleListProvider
        key="dynamicContent"
        modules={this.props.modules}
        container={this.props.container.id}
        onModuleSelection={this.props.onDynamicModuleSelection}
      />,
      )
      // Render modules and plugins of this static container
    } else if (this.props.modules) {
      const containerModules = this.props.modules.filter(module => module.content.container === this.props.container.id && module.content.applicationId === this.props.appName)
      forEach(containerModules, (module, idx) => (
        renderModules.push(<LazyModuleComponent
          key={idx}
          module={module.content}
          appName={this.props.appName}
          project={this.props.project}
        />,
        )
      ))
    }
    return renderModules
  }

  /**
   * Render the plugins of the current container
   * @returns {Array}
   */
  renderPlugins = () => {
    const renderPlugins = []
    if (this.props.configurationMode) {
      return renderPlugins
    }
    if (this.props.plugins) {
      const containerPlugins = this.props.plugins.filter(plugin => plugin.container === this.props.container.id)
      forEach(containerPlugins, (plugin, idx) => {
        renderPlugins.push(
          <Paper
            key={idx}
            style={{
              // display: 'flex',
              // justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <PluginProvider
              key={idx}
              pluginInstanceId={idx}
              pluginId={plugin.pluginId}
              pluginConf={plugin.pluginConf}
              pluginProps={this.props.pluginProps}
              displayPlugin
            />
          </Paper>,
        )
      })
    }
    return renderPlugins
  }

  /**
   * Render the configuration options of this container
   * @returns {*}
   */
  renderConfigurationMode = () => {
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
          <Toolbar style={{ height: 40 }}>
            <ToolbarGroup key="name">
              <ToolbarTitle text={this.props.container.id} />
            </ToolbarGroup>
            <ToolbarGroup key="actions">
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{
                  horizontal: 'left',
                  vertical: 'top',
                }}
                targetOrigin={{
                  horizontal: 'left',
                  vertical: 'top',
                }}
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

Container.defaultProps = {
  configurationMode: false,
  mainContainer: false,
}

export default Container
