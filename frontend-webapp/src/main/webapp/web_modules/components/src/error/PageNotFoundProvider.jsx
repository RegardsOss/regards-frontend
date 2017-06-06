/**
 * LICENSE_PLACEHOLDER
 **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {I18nProvider} from '@regardsoss/i18n'
import PageNotFoundComponent from './PageNotFoundComponent'

/**
 *
 * 404 Not found page
 *
 * @author Sébastien Binda
 */
class PageNotFoundProvider extends React.Component {
  render() {
    const cardStyle = {padding: 5}
    const iconStyle = {
      color: 'Red',
      width: 30,
      height: 30,
      marginRight: 20,
    }

    return (
      <MuiThemeProvider>
        <PageNotFoundComponent />
      </MuiThemeProvider>
    )
  }
}

export default PageNotFoundProvider