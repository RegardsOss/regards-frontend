/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'
import { CenteredDiv } from '@regardsoss/components'
import getModuleStyles from '../styles/styles'

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
    const moduleStyles = getModuleStyles(this.context.muiTheme)

    const module = {
      name: 'authentication',
      active: true,
      conf: {
        showCancel: false,
        showCreateAccount: false,
        project: this.props.project,
        loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
      },
    }
    return (
      <div className={moduleStyles.adminApp.layout.app.classes.join(' ')} style={moduleStyles.adminApp.layout.app.styles}>
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
