import * as React from "react"
import { ThemeContextType, ThemeContextInterface } from "@regardsoss/theme"
import Authentication from "./AuthenticationContainer"
export class AuthenticationLayout extends React.Component<any, any> {

  static contextTypes: Object = ThemeContextType
  context: ThemeContextInterface

  constructor () {
    super()
  }

  render (): JSX.Element {
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
