/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import { PluginConf } from '@regardsoss/model'
import { ModuleShape } from '@regardsoss/modules'
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
    const bodyStyles = {
      backgroundColor: this.context.muiTheme.palette.canvasColor,
    }
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
        />
      </div>
    )
  }
}

export default ApplicationLayout
