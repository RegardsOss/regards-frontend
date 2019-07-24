/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import getModuleStyles from '../styles/styles'

/**
 * Authentication container before access to admin layout (if logged, passes through)
 */
class AuthenticationContainer extends React.Component {
  static propTypes = {
    scope: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { isAuthenticated, scope, children } = this.props
    const moduleStyles = getModuleStyles(this.context.muiTheme)
    const module = {
      type: modulesManager.AllDynamicModuleTypes.AUTHENTICATION,
      active: true,
      conf: {
        showLoginWindow: !isAuthenticated,
        showCancel: false,
        showAskProjectAccess: false,
        loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
        onCancelAction: null,
      },
    }
    return (
      <div className={moduleStyles.adminApp.layout.app.classes.join(' ')} style={moduleStyles.adminApp.layout.app.styles}>
        <LazyModuleComponent
          module={module}
          appName="admin"
          project={scope}
        />
        {isAuthenticated && children ? children : null}
      </div>
    )
  }
}


export default AuthenticationContainer
