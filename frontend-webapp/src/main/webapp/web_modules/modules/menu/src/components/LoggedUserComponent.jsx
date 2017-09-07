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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import AccountMenuIcon from 'material-ui/svg-icons/action/account-box'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ChangeRole from 'material-ui/svg-icons/maps/directions-run'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { Role } from '@regardsoss/model'
import ProfileEditionContainer from '../containers/ProfileEditionContainer'


/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
class LoggedUserComponent extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    borrowableRoles: PropTypes.objectOf(Role).isRequired,
    onBorrowRole: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    showProfileEdition: PropTypes.bool.isRequired,
    onShowProfileEdition: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    const { name, currentRole, borrowableRoles, onBorrowRole, onLogout, showProfileEdition, onShowProfileEdition } = this.props
    const showBorrowableRoles = !isEmpty(borrowableRoles)
    const hasMoreOption = showProfileEdition || showBorrowableRoles

    const anchorStyle = { horizontal: 'right', vertical: 'bottom' }
    const ActionExit = <ActionExitToApp />
    const iconButton = <IconButton><MoreVertIcon /></IconButton>
    const accountIcon = <AccountMenuIcon />
    const changeRoleIcon = <ChangeRole />
    const arrowIcon = <ArrowDropRight />

    const profileContainer = showProfileEdition ? <ProfileEditionContainer /> : null
    return (
      <div
        style={this.context.moduleTheme.loggedUser.text}
        title={intl.formatMessage({ id: 'menu.form.displayauthentication.logged' })}
      >
        <span>{name}</span>
        {profileContainer}
        <IconMenu
          iconButtonElement={iconButton}
          anchorOrigin={anchorStyle}
          targetOrigin={anchorStyle}
          iconStyle={this.context.moduleTheme.loggedUser.icon}
        >
          {/* Access user profile */}
          <ShowableAtRender show={showProfileEdition}>
            <MenuItem
              primaryText={intl.formatMessage({ id: 'accountLabel' })}
              leftIcon={accountIcon}
              onTouchTap={onShowProfileEdition}
            />
          </ShowableAtRender>

          {/* Show borrowables roles submenu, only when there are borrowable roles */}
          <ShowableAtRender show={showBorrowableRoles}>
            <MenuItem
              primaryText={intl.formatMessage({ id: 'changeRole' })}
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
            />
          </ShowableAtRender>
          { /** Divider, only when there are more options than disconnect*/}
          <ShowableAtRender show={hasMoreOption}>
            <Divider />
          </ShowableAtRender>
          { /** Logout option*/}
          <MenuItem
            primaryText={intl.formatMessage({ id: 'logoutLabel' })}
            leftIcon={ActionExit}
            onTouchTap={onLogout}
          />
        </IconMenu>
      </div >
    )
  }
}

export default LoggedUserComponent
