import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import HomepageContainer from './HomepageContainer'
import PortalLayout from './PortalLayout'
/**
 * Provides the theme to sub containers
 */
export class PortalHomepageContainer extends React.Component {

  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    theme: React.PropTypes.string,
    content: React.PropTypes.element,
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { theme, content } = this.props
    const muiTheme = ThemeHelper.getByName(theme)
    const contentToDisplay = React.Children.count() > 0 ? content : <HomepageContainer />
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <PortalLayout>
          {contentToDisplay}
        </PortalLayout>
      </MuiThemeProvider>
    )
  }
}
// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: ThemeSelectors.getCurrentTheme(state),
})
export default connect(mapStateToProps, null)(PortalHomepageContainer)
