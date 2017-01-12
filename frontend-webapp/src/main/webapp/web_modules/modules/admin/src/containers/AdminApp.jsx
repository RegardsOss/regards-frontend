/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { isAuthenticated, AuthenticationSelectors, AuthenticateShape } from '@regardsoss/authentication-manager'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import { EndpointActions } from '@regardsoss/display-control'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AdminLayout from './AdminLayout'
import AuthenticationPanel from './AuthenticationPanel'


/**
 * React components to manage the instance application.
 * This components displays admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component {

  /**
   * @type {{theme: *, authentication-manager: *, content: *}}
   */
  static propTypes = {
    content: React.PropTypes.element,
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    theme: React.PropTypes.string,
    authentication: AuthenticateShape,
    // from mapDispatchToProps
    fetchEndpoints: React.PropTypes.func,
  }

  static contextTypes = {
    intl: intlShape,
  }

  /**
   * On authentication-manager fetch autorized endpoints
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.authentication &&
      this.props.authentication.user === undefined &&
      nextProps.authentication.user !== undefined) {
      this.props.fetchEndpoints()
    }
  }

  /**
   *
   * @param {boolean} isAuth
   * @param {React.Component} content
   * @returns {React.Component}
   */
  getContent = (isAuth, content) => {
    if (!isAuth) {
      return (
        <AuthenticationPanel project={this.props.params.project ? this.props.params.project : 'instance'} />
      )
    }
    return (<AdminLayout key="2" {...this.props}>
      {content}
    </AdminLayout>)
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { theme, authentication, content } = this.props
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    // Authentication
    const isAuth = isAuthenticated(authentication)
    const hmi = this.getContent(isAuth, content)

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <I18nProvider messageDir={'modules/admin/src/i18n'}>
          <div>
            {hmi}
          </div>
        </I18nProvider>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  // Add theme from store to the components props
  theme: ThemeSelectors.getCurrentTheme(state),
  authentication: AuthenticationSelectors.getAuthentication(state),
})

const mapDispatchToProps = dispatch => ({
  fetchEndpoints: () => dispatch(EndpointActions.fetchEndpoints()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
