/**
 * LICENSE_PLACEHOLDER
 **/
import {merge} from 'lodash'
import {themeContextType} from '@regardsoss/theme'
import {PluginConf} from '@regardsoss/model'
import {ModuleShape} from '@regardsoss/modules'
import Container from './Container'
import ContainerShape from '../model/ContainerShape'

/**
 * ApplicationLayout
 * Component to display a customizable layout. The layout configuration is the muiTheme from Theme module.
 * @author Sébastien Binda
 */
class ApplicationLayout extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
    appName: React.PropTypes.string.isRequired,
    layout: ContainerShape,
    modules: React.PropTypes.arrayOf(ModuleShape),
    plugins: React.PropTypes.arrayOf(PluginConf),
    layoutBodyStyles: React.PropTypes.object,
    style: React.PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: React.PropTypes.object,
    dynamicContent: React.PropTypes.element,
    onDynamicModuleSelection: React.PropTypes.func,
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
          backgroundSize: 'cover'
        }
      } else {
        bodyStyles = {
          background: this.context.muiTheme.palette.canvasColor
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
          onDynamicModuleSelection={this.props.onDynamicModuleSelection}
          mainContainer
        />
      </div>

    )
  }
}

export default ApplicationLayout
