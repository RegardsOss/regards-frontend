
import { connect } from 'react-redux'
import { ThemeHelper } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PortalLayout from './PortalLayout'
/* interface AdminAppProps {
  router: any,
  route: any,
  params: any,
  theme: string,
  content: any,
  location: any
}*/


/**
 * React component to manage Administration application.
 * This component displays admin layout or login form if the user is not connected
 */
class PortailApp extends React.Component {
  constructor() {
    super()
    this.state = { instance: false }
  }

  render() {
    const { theme, content } = this.props
    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <PortalLayout key="2" {...this.props}>
            {content}
          </PortalLayout>
        </div>
      </MuiThemeProvider>
    )
  }
}
PortailApp.propTypes = {
  theme: React.PropTypes.string,
  content: React.PropTypes.element.isRequired,
}
// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: state.common.theme,
})
export default connect(mapStateToProps, null)(PortailApp)
