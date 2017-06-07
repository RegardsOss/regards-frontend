/**
 * LICENSE_PLACEHOLDER
 **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PageNotFoundComponent from './PageNotFoundComponent'

/**
 *
 * 404 Not found page
 *
 * @author Sébastien Binda
 */
class PageNotFoundProvider extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <PageNotFoundComponent />
      </MuiThemeProvider>
    )
  }
}

export default PageNotFoundProvider
