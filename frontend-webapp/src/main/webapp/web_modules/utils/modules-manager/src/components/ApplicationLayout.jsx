/**
 * LICENSE_PLACEHOLDER
 **/
import { ModuleFactory } from '@regardsoss/modules-manager'

/**
 * ApplicationLayout
 * Component to display a customizable layout. The layout configuration is the muiTheme from Theme module.
 */
class ApplicationLayout extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string.isRequired,
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  /**
   * Display the layout of the given appName (props parameter) from the current loaded theme.
   * @returns {React.Component}
   */
  render() {
    if (this.context && this.context.muiTheme && this.context.muiTheme[this.props.appName] && this.context.muiTheme[this.props.appName].layout) {
      return ModuleFactory.renderContainer(this.context.muiTheme[this.props.appName].layout, this.props.appName)
    }
    return <div>Application layout {this.props.appName} not define for current theme</div>
  }
}

export default ApplicationLayout
