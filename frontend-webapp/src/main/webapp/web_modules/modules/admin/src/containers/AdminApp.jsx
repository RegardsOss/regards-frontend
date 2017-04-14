/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { AuthenticationParametersActions, AuthenticationParametersSelectors, AuthenticateSelectors } from '@regardsoss/authentication-manager'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { EndpointActions } from '@regardsoss/endpoint'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { ThemeProvider } from '@regardsoss/theme'
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
    currentRole: React.PropTypes.string.isRequired,
    isAuthenticated: React.PropTypes.bool,
    project: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    isInstance: React.PropTypes.bool,
    // from mapDispatchToProps
    initializeApplication: React.PropTypes.func.isRequired,
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
    // init with project parameter if available
    const project = (this.props.params && this.props.params.project)
    this.props.initializeApplication(project)
  }

  /**
   * On authentication-manager fetch autorized endpoints
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // if project changed reinitialize application
    if (nextProps.params && nextProps.params.project !== this.props.project) {
      this.props.initializeApplication(nextProps.params.project)
    }

    // when user has a new role (and is is authenticated)
    if (this.props.currentRole !== nextProps.currentRole && nextProps.isAuthenticated && !nextProps.isInstance) {
      // Prevent the HMI to show the admin app before endpoints have been retrieved
      this.setState({
        isLoadingEndpoints: true,
      })
      // fetch endpoints only if current route is admin project.
      if (this.props.params.project) {
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


  render() {
    const { isAuthenticated, content, project } = this.props
    const { isLoadingEndpoints } = this.state

    return (
      <ThemeProvider>
        <I18nProvider messageDir={'modules/admin/src/i18n'}>
          <AuthenticationContainer project={project} isAuthenticated={isAuthenticated}>
            <LoadableContentDisplayDecorator isLoading={isLoadingEndpoints}>
              <AdminLayout {...this.props}>
                {content}
              </AdminLayout>
            </LoadableContentDisplayDecorator>
          </AuthenticationContainer>
        </I18nProvider>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  const authenticationResult = AuthenticateSelectors.getResult(state)
  return {
    currentRole: authenticationResult ? authenticationResult.role : '',
    isAuthenticated: AuthenticateSelectors.isAuthenticated(state),
    project: AuthenticationParametersSelectors.getProject(state),
    isInstance: AuthenticationParametersSelectors.isInstance(state),
  }
}

const mapDispatchToProps = dispatch => ({
  initializeApplication: project => dispatch(AuthenticationParametersActions.applicationStarted(project)),
  fetchEndpoints: () => dispatch(EndpointActions.fetchPagedEntityList(0, 10000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
