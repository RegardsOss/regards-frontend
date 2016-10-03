/** @module AdminApp */
import * as React from "react"
import { connect } from "react-redux"
import { logout, isAuthenticated } from "@regardsoss/authentication"
import { AuthenticationType } from "@regardsoss/models"
import { ThemeHelper } from "@regardsoss/theme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import MainAdminLayout from "./MainAdminLayout"
import AuthenticationLayout from "./authentication/containers/AuthenticationLayout"
interface AdminAppProps {
  router: any,
  route: any,
  params: any,
  theme: string,
  authentication: AuthenticationType,
  content: any,
  location: any,
  onLogout: () => void
}


/**
 * React component to manage Administration application.
 * This component displays admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component<AdminAppProps, any> {
  constructor () {
    super()
    this.state = {instance: false}
  }

  render (): JSX.Element {
    const {theme, authentication, content} = this.props
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    // Authentication
    const authenticated = isAuthenticated(authentication)
    let hmi: any = []
    if (authenticated === false) {
      hmi.push(<AuthenticationLayout key="1"/>)
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
const mapStateToProps = (state: any) => ({
  theme: state.common.theme,
  authentication: state.common.authentication
})
const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(logout())
})
export default connect<{}, {}, AdminAppProps>(mapStateToProps, mapDispatchToProps)(AdminApp)
