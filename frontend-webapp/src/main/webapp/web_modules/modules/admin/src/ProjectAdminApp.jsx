/** @module AdminApp */

import { connect } from 'react-redux'
import { logout, isAuthenticated } from '@regardsoss/authentication'
import { ThemeHelper } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainAdminLayout from './MainAdminLayout'
import AuthenticationLayout from './authentication/containers/AuthenticationLayout'

/**
 * React component to manage Administration application.
 * This component displays admin layout or login form if the user is not connected
 */
class ProjectAdminApp extends React.Component {
  constructor() {
    super()
    this.state = { instance: false }
  }

  render() {
    const { theme, authentication, content } = this.props
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)
    // Authentication
    const authenticated = isAuthenticated(authentication)
    const hmi = []
    if (authenticated === false) {
      hmi.push(<AuthenticationLayout key="1" />)
    } else {
      hmi.push(<MainAdminLayout key="2" {...this.props}>
        {content}
      </MainAdminLayout>)
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {hmi}
        </div>
      </MuiThemeProvider>
    )
  }
}
/* interface ProjectAdminAppProps {
 router: any,
 route: any,
 params: any,
 theme: string,
 authentication: AuthenticationType,
 content: any,
 location: any,
 onLogout: () => void
 }*/
ProjectAdminApp.propTypes = {
  // From mapStateToProps
  theme: React.PropTypes.string,
  authentication: React.PropTypes.shape({
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
    }).isRequired,
    authenticateDate: React.PropTypes.number.isRequired,
    error: React.PropTypes.string.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
  }),
  content: React.PropTypes.element,
}
// TODO: Use selector instead of direct extraction
// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: state.common.theme,
  authentication: state.common.authentication,
})
const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdminApp)
