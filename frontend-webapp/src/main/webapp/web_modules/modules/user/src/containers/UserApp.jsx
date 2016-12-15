/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { isAuthenticated, AuthenticationSelectors, AuthenticateShape } from '@regardsoss/authentication'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { EndpointActions } from '@regardsoss/display-control'
import UserLayout from './UserLayout'

/**
 * React components to manage the project user application.
 * This components displays project user layout
 */
class UserApp extends React.Component {

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
   * On authentication fetch authorized endpoints
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
   * @returns {React.Component}
   */
  render() {
    const { theme, authentication, content } = this.props
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    // Authentication
    const isAuth = isAuthenticated(authentication)

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <UserLayout key="2" {...this.props}>
            {content}
          </UserLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserApp)
