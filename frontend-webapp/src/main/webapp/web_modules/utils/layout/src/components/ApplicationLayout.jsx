/**
 * LICENSE_PLACEHOLDER
 **/
import Container from './Container'
import ContainerShape from '../model/ContainerShape'

/**
 * ApplicationLayout
 * Component to display a customizable layout. The layout configuration is the muiTheme from Theme module.
 */
class ApplicationLayout extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    layout: ContainerShape,
  }

  /**
   * Display the layout of the given appName (props parameter) from the current loaded theme.
   * @returns {React.Component}
   */
  render() {
    return (
      <Container appName={this.props.appName} container={this.props.layout} />
    )
  }
}

export default ApplicationLayout
