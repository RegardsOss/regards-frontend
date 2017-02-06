/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import { LazyModuleComponent, ModuleListProvider, ModuleShape } from '@regardsoss/modules'
import { PluginConf } from '@regardsoss/model'
import { PluginProvider } from '@regardsoss/plugins'
import ContainerShape from '../model/ContainerShape'
import ContainerHelper from '../ContainerHelper'

/**
 * Component to display a container into an application layout.
 * This element display the children containers and  modules.
 * @author Sébastien Binda
 */
class Container extends React.PureComponent {

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
          />,
        )
      ))
    }

    const renderModules = []
    const renderPlugins = []
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
    } else {
      // Render modules and plugins of this static container
      if (this.props.modules) {
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

      if (this.props.plugins) {
        const containerPlugins = this.props.plugins.filter(plugin => plugin.container === this.props.container.id)
        forEach(containerPlugins, (plugin, idx) => {
          renderPlugins.push(
            <PluginProvider
              key={idx}
              pluginInstanceId={idx}
              pluginId={plugin.pluginId}
              pluginConf={plugin.pluginConf}
              pluginProps={this.props.pluginProps}
              displayPlugin
            />,
          )
        })
      }
    }

    return (
      <div
        className={containerClasses.join(' ')}
        style={containerStyles}
        key={this.props.container.id}
      >
        {renderModules}
        {renderPlugins}
        {renderContainers}
      </div>
    )
  }
}

export default Container
