/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { logout } from '@regardsoss/authentication-manager'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'
import { ApplicationErrorContainer } from '@regardsoss/global-sytem-error'
import InstanceSidebarComponent from '../menu/components/InstanceSidebarComponent'
import ProjectSidebarComponent from '../menu/components/ProjectSidebarComponent'

/*
interface MainAdminLayoutProps {
  content: any,
  onLogout?: () => void

  // Looks useless
  location: any,
  theme?: string,
  authentication-manager?: any,
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

    const menuModule = {
      name: 'menu',
      conf: {
        project: this.props.params.project ? this.props.params.project : 'instance',
        title: 'REGARDS admin dashboard',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
      },
    }

    return (
      <div className={style.app.classes} style={style.app.styles}>
        <LazyModuleComponent appName={'admin'} module={menuModule} />
        <div className={style.bodyContainer.classes} style={style.bodyContainer.styles}>
          {this.getSidebar(isOnInstanceDashboard)}
          <div className={style.contentContainer.classes} style={style.contentContainer.styles}>
            {content}
          </div>
        </div>
        <ApplicationErrorContainer />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(AdminLayout)
