/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import LoginIcon from 'material-ui/svg-icons/action/account-circle'
import AccountMenuIcon from 'material-ui/svg-icons/action/account-box'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ChangeRole from 'material-ui/svg-icons/maps/directions-run'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import { ShowableAtRender, DropDownButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'

import ProfileEditionContainer from '../containers/ProfileEditionContainer'


/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
class LoggedUserComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    borrowableRoles: AdminShapes.RoleList.isRequired,
    onBorrowRole: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    showProfileEdition: PropTypes.bool.isRequired,
    onShowProfileEdition: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getLabel = () => this.context.intl.formatMessage({ id: 'loggedButtonLabel' }, { login: this.props.name })

  render() {
    const { intl: { formatMessage }, moduleTheme: { user: { optionsLabelStyle } } } = this.context
    const {
      name, currentRole, borrowableRoles, onBorrowRole, onLogout, showProfileEdition, onShowProfileEdition,
    } = this.props
    const showBorrowableRoles = !isEmpty(borrowableRoles)
    const hasMoreOption = showProfileEdition || showBorrowableRoles

    const ActionExit = <ActionExitToApp />
    const accountIcon = <AccountMenuIcon />
    const changeRoleIcon = <ChangeRole />
    const arrowIcon = <ArrowDropRight />

    const profileContainer = showProfileEdition ? <ProfileEditionContainer /> : null
    return (
      <div>
        { /* add the prodile edition capacity (external dialog) */
          profileContainer
        }
        {/* Build and show drop down menu */}
        <DropDownButton
          getLabel={this.getLabel}
          title={formatMessage({ id: 'loggedButtonTooltip' }, { login: name })}
          icon={<LoginIcon />}
          labelStyle={optionsLabelStyle}
          hasSubMenus
        >
          { /* Access user profile (do not insert a showable to not block menu auto-closing) */
            showProfileEdition ? (
              <MenuItem
                key="profile.edition"
                primaryText={formatMessage({ id: 'accountLabel' })}
                leftIcon={accountIcon}
                onTouchTap={onShowProfileEdition}
                value={null}
              />) :
              null
          }
          { /* Show borrowables roles submenu, only when there are borrowable roles (do not insert a showable to not block menu auto-closing) */
            showBorrowableRoles ? (
              <MenuItem
                key="borrowable.roles"
                primaryText={formatMessage({ id: 'changeRole' })}
                leftIcon={changeRoleIcon}
                rightIcon={arrowIcon}
                value={currentRole}
                menuItems={
                  map(borrowableRoles, (role) => {
                    const roleName = role.content.name
                    return (<MenuItem
                      onTouchTap={() => onBorrowRole(roleName)}
                      key={roleName}
                      primaryText={roleName}
                      checked={roleName === currentRole}
                      insetChildren
                    />)
                  })
                }
              />) : null
          }
          { /* Divider, only when there are more options than disconnect */}
          <ShowableAtRender
            key="menu.divider"
            show={hasMoreOption}
          >
            <Divider />
          </ShowableAtRender>
          { /* Logout option */}
          <MenuItem
            key="loggout"
            primaryText={formatMessage({ id: 'logoutLabel' })}
            leftIcon={ActionExit}
            onTouchTap={onLogout}
          />
        </DropDownButton>
      </div>
    )
  }
}

export default LoggedUserComponent
