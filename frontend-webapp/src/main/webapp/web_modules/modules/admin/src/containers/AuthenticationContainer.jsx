/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'

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
    const style = {
      app: {
        classes: this.context.muiTheme.adminApp.layout.app.classes.join(' '),
        styles: this.context.muiTheme.adminApp.layout.app.styles,
      },
    }
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
      <div className={style.app.classes} style={style.app.styles}>
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
