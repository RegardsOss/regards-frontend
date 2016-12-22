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
      conf: {
        project: this.props.project,
        title: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
      },
    }
    return (
      <div className={style.app.classes} style={style.app.styles}>
        <LazyModuleComponent
          module={module}
          appName={'admin'}
          decorator={{ element: CenteredDiv }}
        />
      </div>
    )
  }
}

export default AuthenticationPanel
