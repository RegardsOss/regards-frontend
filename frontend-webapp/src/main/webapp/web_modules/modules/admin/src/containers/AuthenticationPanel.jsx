/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules-manager'
import { CenteredDiv } from '@regardsoss/components'

/**
 * Authentication page before access to admin layout
 */
class AuthenticationPanel extends React.Component {

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
    return (
      <div className={style.app.classes} style={style.app.styles}>
        <LazyModuleComponent
          moduleId={'authentication'}
          appName={'admin'}
          decorator={{ element: CenteredDiv }}
          moduleConf={{ title: this.context.intl.formatMessage({ id: 'loginFormTitle' }) }}
        />
      </div>
    )
  }
}

export default AuthenticationPanel
