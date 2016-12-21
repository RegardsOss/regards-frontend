/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationLayout } from '@regardsoss/layout'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import UserAppLayout from '@regardsoss/layout/src/default/UserAppLayout'
/**
 * Provides the theme to sub containers
 */
export class UserApp extends React.Component {

  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // From MuiThemeProvider
    theme: React.PropTypes.string,
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { theme } = this.props
    const muiTheme = ThemeHelper.getByName(theme)
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <ApplicationLayout appName="userApp" project={this.props.params.project} layout={UserAppLayout} />
      </MuiThemeProvider>
    )
  }
}
// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: ThemeSelectors.getCurrentTheme(state),
})
export default connect(mapStateToProps, null)(UserApp)
