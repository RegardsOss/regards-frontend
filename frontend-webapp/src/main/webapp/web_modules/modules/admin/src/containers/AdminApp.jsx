/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AuthenticationSelectors, routeHelpers } from '@regardsoss/authentication-manager'
import { ThemeHelper, getCurrentTheme } from '@regardsoss/theme'
import { EndpointActions } from '@regardsoss/endpoint'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AdminLayout from './AdminLayout'
import AuthenticationPanel from './AuthenticationPanel'

/**
 * React components to manage the instance application.
 * This components displays admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component {

  static propTypes = {
    content: React.PropTypes.element,
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    theme: React.PropTypes.string,
    isAuthenticated: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchEndpoints: React.PropTypes.func,
  }

  static contextTypes = {
    intl: intlShape,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoadingEndpoints: false,
    }
  }

  componentWillMount() {
    this.props.fetchEndpoints()
  }

  /**
   * On authentication-manager fetch autorized endpoints
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // when authentication has been fetched:
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      // case A: back from authentication mail: do redirection to initial URL
      if (routeHelpers.isBackFromAuthenticationMail()) {
        routeHelpers.doRedirection()
      } else {
        // case B default login case
        // Prevent the HMI to show the admin app before endpoints have been retrieved
        this.setState({
          isLoadingEndpoints: true,
        })
        Promise.resolve(this.props.fetchEndpoints())
          .then((actionResult) => {
            // We receive here the action
            if (!actionResult.error) {
              this.setState({
                isLoadingEndpoints: false,
              })
            } else {
              throw new Error('Failed to retrieve endpoint list, which is required on the admin dashboard')
            }
          })
      }
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
    return (
      <AdminLayout key="2" {...this.props}>
        {content}
      </AdminLayout>
    )
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { theme, isAuthenticated, content } = this.props
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    if (!this.state.isLoadingEndpoints) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <I18nProvider messageDir={'modules/admin/src/i18n'}>
            <div>
              {this.getContent(isAuthenticated, content)}
            </div>
          </I18nProvider>
        </MuiThemeProvider>
      )
    }
    return null
  }
}
const mapStateToProps = state => ({
  // Add theme from store to the components props
  theme: getCurrentTheme(state),
  isAuthenticated: AuthenticationSelectors.isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  fetchEndpoints: () => dispatch(EndpointActions.fetchPagedEntityList(0, 10000)), // TODO
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
