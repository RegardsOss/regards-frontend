/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationLayout } from '@regardsoss/modules-manager'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
/**
 * Provides the theme to sub containers
 */
export class PortalApp extends React.Component {

  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
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
        <ApplicationLayout appName="portalApp" />
      </MuiThemeProvider>
    )
  }
}
// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: ThemeSelectors.getCurrentTheme(state),
})
export default connect(mapStateToProps, null)(PortalApp)
