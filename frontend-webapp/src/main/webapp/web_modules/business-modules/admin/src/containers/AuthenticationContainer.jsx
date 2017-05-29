/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'
import getModuleStyles from '../styles/styles'

/**
 * Authentication container before access to admin layout (if logged, passes through)
 */
class AuthenticationContainer extends React.Component {

  static propTypes = {
    project: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.any, // eslint-disable-line
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { isAuthenticated, children } = this.props
    const moduleStyles = getModuleStyles(this.context.muiTheme)
    const module = {
      type: 'authentication',
      active: true,
      conf: {
        showLoginWindow: !isAuthenticated,
        showCancel: false,
        showAskProjectAccess: false,
        loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
        onCancelAction: null,
      },
    }

    return (
      <div className={moduleStyles.adminApp.layout.app.classes.join(' ')} style={moduleStyles.adminApp.layout.app.styles}>
        <LazyModuleComponent
          module={module}
          appName={'admin'}
          project={this.props.project}
        />
        {isAuthenticated && children ? children : null}
      </div>
    )
  }
}


export default AuthenticationContainer
