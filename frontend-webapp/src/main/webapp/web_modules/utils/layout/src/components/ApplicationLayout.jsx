/**
 * LICENSE_PLACEHOLDER
 **/
import { Plugin } from '@regardsoss/model'
import { ModuleShape } from '@regardsoss/modules'
import Container from './Container'
import ContainerShape from '../model/ContainerShape'

/**
 * ApplicationLayout
 * Component to display a customizable layout. The layout configuration is the muiTheme from Theme module.
 */
class ApplicationLayout extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
    appName: React.PropTypes.string.isRequired,
    layout: ContainerShape,
    modules: React.PropTypes.arrayOf(ModuleShape),
    plugins: React.PropTypes.arrayOf(Plugin),
  }

  /**
   * Display the layout of the given appName (props parameter) from the current loaded theme.
   * @returns {React.Component}
   */
  render() {
    return (
      <Container
        appName={this.props.appName}
        project={this.props.project}
        container={this.props.layout}
        modules={this.props.modules}
        plugins={this.props.plugins}
      />
    )
  }
}

export default ApplicationLayout
