/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationLayout } from '@regardsoss/layout'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import PortalAppLayout from '@regardsoss/layout/src/default/PortalAppLayout'
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
        <ApplicationLayout appName="portalApp" layout={PortalAppLayout} />
      </MuiThemeProvider>
    )
  }
}
// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: ThemeSelectors.getCurrentTheme(state),
})
export default connect(mapStateToProps, null)(PortalApp)
