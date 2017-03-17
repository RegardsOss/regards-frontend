/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { AuthenticateSelectors } from '@regardsoss/authentication-manager'
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
  	if (this.props.params.project){
    	this.props.fetchEndpoints()
    }
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
      if (this.props.params.project){
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
    const { isAuthenticated, content } = this.props
    const { isLoadingEndpoints } = this.state
    const project = this.props.params.project ? this.props.params.project : 'instance'
    
    const isLoading = isLoadingEndpoints && this.props.params.project

    return (
      <ThemeProvider>
        <I18nProvider messageDir={'modules/admin/src/i18n'}>
          <AuthenticationContainer project={project} isAuthenticated={isAuthenticated}>
            <LoadableContentDisplayDecorator isLoading={isLoading}>
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

const mapStateToProps = state => ({
  isAuthenticated: AuthenticateSelectors.isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  fetchEndpoints: () => dispatch(EndpointActions.fetchPagedEntityList(0, 10000)), // TODO
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
