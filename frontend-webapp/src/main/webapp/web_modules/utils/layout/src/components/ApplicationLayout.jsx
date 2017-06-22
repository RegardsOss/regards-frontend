/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes  } from '@regardsoss/shape'
import Container from './Container'

/**
 * ApplicationLayout
 * Component to display a customizable layout. The layout configuration is the muiTheme from Theme module.
 * @author Sébastien Binda
 */
class ApplicationLayout extends React.Component {

  static propTypes = {
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    layout: AccessShapes.ContainerContent,
    modules: PropTypes.arrayOf(AccessShapes.Module),
    plugins: PropTypes.arrayOf(AccessShapes.UIPluginConf),
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    dynamicContent: PropTypes.element,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Display the layout of the given appName (props parameter) from the current loaded theme.
   * @returns {React.Component}
   */
  render() {
    let bodyStyles = {}
    if (this.context.muiTheme) {
      if (this.context.muiTheme.palette.backgroundImage) {
        bodyStyles = {
          background: `url('${this.context.muiTheme.palette.backgroundImage}') no-repeat fixed center center`,
          backgroundSize: 'cover',
        }
      } else {
        bodyStyles = {
          background: this.context.muiTheme.palette.canvasColor,
        }
      }
    }

    bodyStyles = merge({}, bodyStyles, this.props.style)
    return (
      <div style={bodyStyles}>
        <Container
          appName={this.props.appName}
          project={this.props.project}
          container={this.props.layout}
          modules={this.props.modules}
          plugins={this.props.plugins}
          pluginProps={this.props.pluginProps}
          dynamicContent={this.props.dynamicContent}
          mainContainer
        />
      </div>

    )
  }
}

export default ApplicationLayout
