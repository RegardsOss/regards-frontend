/**
 * LICENSE_PLACEHOLDER
 **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { I18nProvider } from '@regardsoss/i18n'
import { ThemeHelper, getCurrentTheme } from '@regardsoss/theme'
import connect from './Connect'

/**
 * Component to allow theme and i18n management throught refux-form
 * @author Sébastien Binda
 */
class ReduxFormComponent extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.arrayOf(React.PropTypes.node)]),
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func.isRequired,
    i18nMessagesDir: React.PropTypes.string.isRequired,
    // Set by redux store connection
    theme: React.PropTypes.string,
  }
  /**
   * Handle when children is an array of node or single node
   * @returns {*}
   */
  renderChildren= () => {
    const { children } = this.props
    if (!React.isValidElement(children)) {
      return (<div>{children}</div>)
    }
    return (children)
  }

  render() {
    const muiTheme = ThemeHelper.getByName(this.props.theme)
    return (
      <form onChange={this.props.onChange} onSubmit={this.props.onSubmit}>
        <I18nProvider messageDir={this.props.i18nMessagesDir}>
          <MuiThemeProvider muiTheme={muiTheme}>
            {this.renderChildren()}
          </MuiThemeProvider>
        </I18nProvider>
      </form>
    )
  }

}

const mapStateToProps = state => ({
  // Add theme from store to the components props
  theme: getCurrentTheme(state),
})

export default connect(mapStateToProps)(ReduxFormComponent)

