/**
 * LICENSE_PLACEHOLDER
 **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { I18nProvider } from '@regardsoss/i18n'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import connect from './Connect'

/**
 * Component to allow theme and i18n management throught refux-form
 */
class ReduxFormComponent extends React.Component {

  static propTypes = {
    children: React.PropTypes.element,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func.isRequired,
    i18nMessagesDir: React.PropTypes.string.isRequired,
    // Set by redux store connection
    theme: React.PropTypes.string,
  }

  render() {
    const muiTheme = ThemeHelper.getByName(this.props.theme)
    return (
      <form onChange={this.props.onChange} onSubmit={this.props.onSubmit}>
        <I18nProvider messageDir={this.props.i18nMessagesDir}>
          <MuiThemeProvider muiTheme={muiTheme}>
            {this.props.children}
          </MuiThemeProvider>
        </I18nProvider>
      </form>
    )
  }

}

const mapStateToProps = state => ({
  // Add theme from store to the components props
  theme: ThemeSelectors.getCurrentTheme(state),
})

export default connect(mapStateToProps)(ReduxFormComponent)

