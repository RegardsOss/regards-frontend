/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import Icon from 'material-ui/svg-icons/content/report'

/**
 *
 * 404 Not found page
 *
 * @author Sébastien Binda
 */
class PageNotFoundComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const iconStyle = { width: '128px', height: '128px', opacity: '0.2' }
    const theme = this.context.muiTheme

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '30vh', width: '100%' }}>
          <Icon color={theme.palette.primary1Color} style={iconStyle} />
          <div style={{ maxWidth: '40%', marginTop: '0.2em', color: theme.palette.textColor, fontSize: '1.5em' }}>
            REGARDS : Page Not Found !
          </div>
          <div style={{ maxWidth: '40%', marginTop: '0.6em', color: theme.palette.secondaryTextColor, textAlign: 'center', fontSize: '1em' }}>
            Requested page does not exists
          </div>
        </div>
      </div>
    )
  }
}

export default PageNotFoundComponent
