/**
 * LICENSE_PLACEHOLDER
 **/
import { LazyModuleComponent } from '@regardsoss/modules'
import ContainerShape from '../model/ContainerShape'
import ContainerHelper from '../ContainerHelper'

/**
 * Component to display a container into an application layout.
 * This element display the children containers and  modules.
 */
class Container extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    container: ContainerShape,
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
      children = this.props.container.containers.map(c => <Container key={c.id} appName={this.props.appName} container={c} />)
    }

    let modules = []
    if (this.props.container.modules) {
      modules = this.props.container.modules.map(m => <LazyModuleComponent key={m.id} module={m} appName={this.props.appName} />)
    }

    return (
      <div
        className={containerClasses.join(' ')}
        style={containerStyles}
        key={this.props.container.id}
      >
        {modules}
        {children}
      </div>
    )
  }
}

export default Container
