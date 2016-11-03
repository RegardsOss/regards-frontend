/** @module AdminApp */

import { connect } from 'react-redux'
import { logout, isAuthenticated } from '@regardsoss/authentication'
import { ThemeHelper } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainAdminLayout from './MainAdminLayout'
import AuthenticationLayout from './authentication/containers/AuthenticationLayout'
/* interface AdminAppProps {
  router: any,
  route: any,
  params: any,
  theme: string,
  authentication: AuthenticationType,
  content: any,
  location: any,
  onLogout: () => void
}*/


/**
 * React component to manage Administration application.
 * This component displays admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component {
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

// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: state.common.theme,
  authentication: state.common.authentication,
})
const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
