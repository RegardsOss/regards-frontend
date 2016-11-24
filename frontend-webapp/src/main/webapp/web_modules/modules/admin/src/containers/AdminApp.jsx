import { connect } from 'react-redux'
import { isAuthenticated, AuthenticationSelectors, AuthenticateShape } from '@regardsoss/authentication'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { EndpointActions } from '@regardsoss/display-control'
import AdminLayout from './AdminLayout'
import AuthenticationContainer from '../authentication/containers/AuthenticationContainer'

/**
 * React component to manage the instance application.
 * This component displays admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component {

  /**
   * @type {{theme: *, authentication: *, content: *}}
   */
  static propTypes = {
    content: React.PropTypes.element,
    // from mapStateToProps
    theme: React.PropTypes.string,
    authentication: AuthenticateShape,
    // from mapDispatchToProps
    fetchEndpoints: React.PropTypes.func,
  }

  /**
   * On authentication fetch autorized endpoints
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
      return (<AuthenticationContainer key="1" />)
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
        <div>
          {hmi}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  // Add theme from store to the component props
  theme: ThemeSelectors.getCurrentTheme(state),
  authentication: AuthenticationSelectors.getAuthentication(state),
})

const mapDispatchToProps = dispatch => ({
  fetchEndpoints: () => dispatch(EndpointActions.fetchEndpoints()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
