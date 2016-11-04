import { ThemeContextType, ThemeContextInterface } from '@regardsoss/theme'
import Authentication from './AuthenticationContainer'

export class AuthenticationLayout extends React.Component {

  static contextTypes = ThemeContextType
  context


  render() {
    const layoutStyle = this.context.muiTheme.adminApp.loginForm
    return (
      <div style={layoutStyle}>
        <Authentication />
      </div>
    )
  }
}
/*
 <SelectTheme />
 <SelectLanguage locales={['en','fr']}/>
 */

export default AuthenticationLayout // connect<{}, {}, any> (mapStateToProps) (Authentication)
