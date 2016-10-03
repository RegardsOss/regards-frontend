/** @module AdminApp */
import * as React from "react"
import { ThemeContextInterface, ThemeContextType } from "@regardsoss/theme"
import SidebarContainer from "./menu/containers/SidebarContainer"
import MenuContainer from "./menu/containers/MenuContainer"
interface MainAdminLayoutProps {
  content: any,
  onLogout?: () => void

  // Looks useless
  location: any,
  theme?: string,
  authentication?: any,
}

/**
 * React component to manage Administration application.
 * This component display admin layout or login form if the user is not connected
 */
export class MainAdminLayout extends React.Component<MainAdminLayoutProps, any> {

  static contextTypes: Object = ThemeContextType
  context: ThemeContextInterface

  constructor () {
    super()
    this.state = {instance: false}
  }


  render (): JSX.Element {
    const {content} = this.props
    const style = {
      app: {
        classes: this.context.muiTheme.adminApp.layout.app.classes.join(' '),
        styles: this.context.muiTheme.adminApp.layout.app.styles,
      },
      bodyContainer: {
        classes: this.context.muiTheme.adminApp.layout.bodyContainer.classes.join(' '),
        styles: this.context.muiTheme.adminApp.layout.bodyContainer.styles,
      },
      contentContainer: {
        classes: this.context.muiTheme.adminApp.layout.contentContainer.classes.join(' '),
        styles: this.context.muiTheme.adminApp.layout.contentContainer.styles,
      },
    }
    return (
      <div className={style.app.classes} style={style.app.styles}>
        <MenuContainer/>
        <div className={style.bodyContainer.classes} style={style.bodyContainer.styles}>
          <SidebarContainer />
          <div className={style.contentContainer.classes} style={style.contentContainer.styles}>
            {content}
          </div>
        </div>
      </div>
    )
  }
}
export default MainAdminLayout
