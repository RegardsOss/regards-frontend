/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { ModuleShape } from '@regardsoss/modules'
import { LazyModuleComponent } from '@regardsoss/modules'
import ContainerShape from '../model/ContainerShape'
import ContainerHelper from '../ContainerHelper'

/**
 * Component to display a container into an application layout.
 * This element display the children containers and  modules.
 */
class Container extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
    appName: React.PropTypes.string.isRequired,
    container: ContainerShape,
    modules: React.PropTypes.arrayOf(ModuleShape),
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

    let children = []
    if (this.props.container.containers) {
      children = this.props.container.containers.map(c => <Container key={c.id} project={this.props.project} appName={this.props.appName} container={c} modules={this.props.modules} />)
    }

    let renderModules = []
    if (this.props.modules) {
      const containerModules = this.props.modules.filter(module => module.content.active && module.content.container === this.props.container.id && module.content.applicationId === this.props.appName)
      renderModules = containerModules.map((module) => {
        // Always add current project in module props.
        let moduleContent = module.content
        if (this.props.project) {
          moduleContent = merge({}, module.content, { conf: { project: this.props.project } })
        }
        return (
          <LazyModuleComponent key={moduleContent.id} module={moduleContent} appName={this.props.appName} />
        )
      })
    }

    return (
      <div
        className={containerClasses.join(' ')}
        style={containerStyles}
        key={this.props.container.id}
      >
        {renderModules}
        {children}
      </div>
    )
  }
}

export default Container
