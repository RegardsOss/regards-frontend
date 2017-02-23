/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AuthenticateSelectors } from '@regardsoss/authentication-manager'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import { EndpointActions } from '@regardsoss/endpoint'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AdminLayout from './AdminLayout'
import AuthenticationContainer from './AuthenticationContainer'

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

  /**
   * @returns {React.Component}
   */
  render() {
    const { theme, isAuthenticated, content } = this.props
    const project = this.props.params.project ? this.props.params.project : 'instance'
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <I18nProvider messageDir={'modules/admin/src/i18n'}>
          <div>
            <AuthenticationContainer project={project} isAuthenticated={isAuthenticated}>
              {!this.state.isLoadingEndpoints ?
                (
                  <AdminLayout key="2" {...this.props}>
                    {content}
                  </AdminLayout>
                ) : null}
            </AuthenticationContainer>
          </div>
        </I18nProvider>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  // Add theme from store to the components props
  theme: ThemeSelectors.getCurrentTheme(state),
  isAuthenticated: AuthenticateSelectors.isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  fetchEndpoints: () => dispatch(EndpointActions.fetchPagedEntityList(0, 10000)), // TODO
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
