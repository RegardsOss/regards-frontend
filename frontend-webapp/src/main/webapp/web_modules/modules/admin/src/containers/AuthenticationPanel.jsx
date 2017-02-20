/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'
import { CenteredDiv } from '@regardsoss/components'

/**
 * Authentication page before access to admin layout
 */
class AuthenticationPanel extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }

  render() {
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
        showCancel: false,
        showAskProjectAccess: false,
        project: this.props.project,
        loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
      },
    }
    return (
      <div className={style.app.classes} style={style.app.styles}>
        <CenteredDiv>
          <LazyModuleComponent
            module={module}
            appName={'admin'}
          />
        </CenteredDiv>
      </div>
    )
  }
}

export default AuthenticationPanel
