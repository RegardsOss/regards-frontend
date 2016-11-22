
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { fetchAuthenticate } from '@regardsoss/authentication'
import { ThemeHelper, SelectThemeContainer } from '@regardsoss/theme'
import Layout from './modules/layout/Layout'

class UserApp extends React.Component {

  componentWillMount() {
    if (!this.props.authentication.user) {
      this.props.publicAuthenticate()
    }
  }

  render() {
    // Location ,params and content are set in this containers props by react-router
    const { location, params, content, theme } = this.props
    const { project } = params

    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    if (!this.props.authentication.user) {
      return <div>Loading ... </div>
    }

    if (!content) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout location={location} project={project}>
            Hello world
          </Layout>
        </MuiThemeProvider>
      )
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <SelectThemeContainer />
          <Layout location={location} project={project}>
            {this.props.content}
          </Layout>
        </div>
      </MuiThemeProvider>
    )
  }
}
UserApp.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  location: React.PropTypes.string.isRequired,
  content: React.PropTypes.element.isRequired,
  theme: React.PropTypes.string.isRequired,
  authentication: React.PropTypes.objectOf(React.PropTypes.string),
  publicAuthenticate: React.PropTypes.func,
}
const mapStateToProps = state => ({
  theme: state.common.theme,
  plugins: state.common.plugins,
  authentication: state.common.authentication,
})
const mapDispatchToProps = dispatch => ({
  publicAuthenticate: () => dispatch(fetchAuthenticate('public', 'public')),
})

const userAppConnected = connect(mapStateToProps, mapDispatchToProps)(UserApp)
export default userAppConnected
