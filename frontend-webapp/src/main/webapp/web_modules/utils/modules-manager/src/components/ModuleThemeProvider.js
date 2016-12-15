/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'

/**
 * Provide specific module theme styles into the context of children component.
 * Each module surrounded by the ModuleThemeProvider must expose a public Styles
 * function as : export Styles = (theme) => {}
 */
class ModuleThemeProvider extends React.Component {

  /**
   * Retrieve mui theme from context provide by upper MuiThemeProvider
   * @type {{}}
   */
  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @type {{children: *, module: *}}
   */
  static propTypes = {
    children: React.PropTypes.element,
    module: React.PropTypes.shape({
      Styles: React.PropTypes.func,
    }).isRequired,
  }

  /**
   * Add computed moduleTheme into children context
   * @type {{moduleTheme: *}}
   */
  static childContextTypes = {
    moduleTheme: React.PropTypes.object.isRequired,
  };

  /**
   * Return child context override with computed moduleTheme
   * @returns {{moduleTheme: *}}
   */
  getChildContext() {
    return {
      moduleTheme: this.props.module.Styles(this.context.muiTheme),
    }
  }

  /**
   * Render provider
   */
  render() {
    return this.props.children
  }
}

export default ModuleThemeProvider
