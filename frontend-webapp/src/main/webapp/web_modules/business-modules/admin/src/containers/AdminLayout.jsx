/**
 * LICENSE_PLACEHOLDER
 **/
import { locationShape } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent } from '@regardsoss/modules'
import { I18nProvider } from '@regardsoss/i18n'
import { ApplicationErrorContainer } from '@regardsoss/global-system-error'
import InstanceSidebarComponent from '../menu/components/InstanceSidebarComponent'
import ProjectSidebarComponent from '../menu/components/ProjectSidebarComponent'
import NotificationsManagerContainer from './NotificationsManagerContainer'
import getModuleStyles from '../styles/styles'

/**
 * React components to manage Administration application.
 * This components display admin layout or login form if the user is not connected
 */
export class AdminLayout extends React.Component {

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static propTypes = {
    content: PropTypes.element,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    location: locationShape.isRequired,
    project: PropTypes.string,
    // from mapDispatchToProps
    onLogout: PropTypes.func,
  }

  getSidebar = (isInstanceDashboard) => {
    const { onLogout, params, location } = this.props
    if (isInstanceDashboard) {
      return (<ProjectSidebarComponent
        onLogout={onLogout}
        projectName={params.project}
        currentPath={location.pathname}
      />)
    }
    return (<InstanceSidebarComponent
      currentPath={location.pathname}
      onLogout={onLogout}
    />)
  }

  render() {
    const { content, params } = this.props
    const isOnInstanceDashboard = params.project !== undefined
    const moduleStyles = getModuleStyles(this.context.muiTheme)
    const style = {
      app: {
        classes: moduleStyles.adminApp.layout.app.classes.join(' '),
        styles: moduleStyles.adminApp.layout.app.styles,
      },
      menu: {
        classes: moduleStyles.menu.classes.join(' '),
      },
      bodyContainer: {
        classes: moduleStyles.adminApp.layout.bodyContainer.classes.join(' '),
        styles: moduleStyles.adminApp.layout.bodyContainer.styles,
      },
      contentContainer: {
        classes: moduleStyles.adminApp.layout.contentContainer.classes.join(' '),
        styles: moduleStyles.adminApp.layout.contentContainer.styles,
      },
    }

    const menuModule = {
      type: 'menu',
      active: true,
      conf: {
        title: 'REGARDS admin dashboard',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
      },
    }

    // install notification manager and application error containers when starting app
    const { project } = this.props
    return (
      <NotificationsManagerContainer isOnInstanceDashboard={isOnInstanceDashboard} >
        <div className={`selenium-adminLayout ${style.app.classes}`} style={style.app.styles}>
          <div className={style.menu.classes}>
            <LazyModuleComponent
              appName={'admin'}
              project={project}
              module={menuModule}
            />
          </div>
          <div className={style.bodyContainer.classes} style={style.bodyContainer.styles}>
            <I18nProvider messageDir="business-modules/admin/src/menu/i18n">
              {this.getSidebar(isOnInstanceDashboard)}
            </I18nProvider>
            <div className={style.contentContainer.classes} style={style.contentContainer.styles}>
              {content}
            </div>
          </div>
        </div>
        <ApplicationErrorContainer />
      </NotificationsManagerContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthenticationClient.authenticationActions.logout()),
})

export default connect(null, mapDispatchToProps)(AdminLayout)
