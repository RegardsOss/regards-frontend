import * as React from "react"
import { connect } from "react-redux"
import { fetchAuthenticate } from "../common/authentication/AuthenticateActions"
import Layout from "./modules/layout/Layout"
import ThemeHelper from "../common/theme/ThemeHelper"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import SelectTheme from "../common/theme/containers/SelectTheme"

interface UserAppProps {
  params: any,
  location: any,
  content: any,
  theme: string,
  authentication?: any,
  publicAuthenticate?: () => void
}

class UserApp extends React.Component<UserAppProps, any> {

  componentWillMount (): void {
    if (!this.props.authentication.user) {
      this.props.publicAuthenticate()
    }
  }

  render (): JSX.Element {
    // Location ,params and content are set in this containers props by react-router
    const {location, params, content, theme} = this.props
    const {project} = params

    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    if (!this.props.authentication.user)
      return <div>Loading ... </div>

    if (!content) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout location={location} project={project}>
            Hello world
          </Layout>
        </MuiThemeProvider>
      )
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <SelectTheme />
            <Layout location={location} project={project}>
              {this.props.content}
            </Layout>
          </div>
        </MuiThemeProvider>
      )
    }
  }
}

const mapStateToProps = (state: any) => ({
  theme: state.common.theme,
  plugins: state.common.plugins,
  authentication: state.common.authentication
})
const mapDispatchToProps = (dispatch: any) => ({
  publicAuthenticate: () => dispatch(fetchAuthenticate("public", "public"))
})

const userAppConnected = connect<{}, {}, UserAppProps>(mapStateToProps, mapDispatchToProps)(UserApp)
export default userAppConnected
