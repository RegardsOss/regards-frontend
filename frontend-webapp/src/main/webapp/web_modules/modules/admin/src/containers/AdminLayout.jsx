import { connect } from 'react-redux'
import { logout } from '@regardsoss/authentication'
import { themeContextType } from '@regardsoss/theme'
import InstanceSidebarComponent from '../menu/components/InstanceSidebarComponent'
import ProjectSidebarComponent from '../menu/components/ProjectSidebarComponent'
import MenuComponent from '../menu/components/MenuComponent'
/*
interface MainAdminLayoutProps {
  content: any,
  onLogout?: () => void

  // Looks useless
  location: any,
  theme?: string,
  authentication?: any,
}
*/

/**
 * React components to manage Administration application.
 * This components display admin layout or login form if the user is not connected
 */
export class AdminLayout extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    content: React.PropTypes.element,
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapDispatchToProps
    onLogout: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = { instance: false }
  }

  getSidebar = (isInstanceDashboard) => {
    const { onLogout, params } = this.props
    if (isInstanceDashboard) {
      return (<ProjectSidebarComponent
        onLogout={onLogout}
        projectName={params.project}
      />)
    }
    return (<InstanceSidebarComponent onLogout={onLogout} />)
  }

  render() {
    const { content, params } = this.props
    const isOnInstanceDashboard = params.project !== undefined
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
        <MenuComponent />
        <div className={style.bodyContainer.classes} style={style.bodyContainer.styles}>
          {this.getSidebar(isOnInstanceDashboard)}
          <div className={style.contentContainer.classes} style={style.contentContainer.styles}>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(AdminLayout)
