/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'
import getModuleStyles from '../styles/styles'

/**
 * Authentication container before access to admin layout (if logged, passes through)
 */
class AuthenticationContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
    isAuthenticated: React.PropTypes.bool.isRequired,
    children: React.PropTypes.any, // eslint-disable-line
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }

  render() {
    const { isAuthenticated, children } = this.props
    const moduleStyles = getModuleStyles(this.context.muiTheme)
    const module = {
      name: 'authentication',
      active: true,
      conf: {
        showLoginWindow: !isAuthenticated,
        showCancel: false,
        showAskProjectAccess: false,
        project: this.props.project,
        loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
        onCancelAction: null,
      },
    }

    return (
      <div className={moduleStyles.adminApp.layout.app.classes.join(' ')} style={moduleStyles.adminApp.layout.app.styles}>
        <LazyModuleComponent
          module={module}
          appName={'admin'}
        />
        {isAuthenticated && children ? children : null}
      </div>
    )
  }
}

export default AuthenticationContainer
