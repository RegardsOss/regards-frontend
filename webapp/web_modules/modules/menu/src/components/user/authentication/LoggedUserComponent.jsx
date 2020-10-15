/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import AccountMenuIcon from 'mdi-material-ui/AccountBox'
import ActionExitToApp from 'mdi-material-ui/ExitToApp'
import ChangeRole from 'mdi-material-ui/Run'
import ArrowDropRight from 'mdi-material-ui/MenuRight'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { withQuotaInfo, QuotaInfo, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { ShowableAtRender, DropDownButton } from '@regardsoss/components'
import ProfileEditionContainer from '../../../containers/user/profile/ProfileEditionContainer'
import LoginIconComponent from './LoginIconComponent'

/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
export class LoggedUserComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    borrowableRoles: AdminShapes.RoleList.isRequired,
    onBorrowRole: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    showProfileEdition: PropTypes.bool.isRequired,
    onShowProfileEdition: PropTypes.func.isRequired,
    // from withQuotaInfo HOC
    quotaInfo: QuotaInfo,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { user: { optionsLabelStyle } } } = this.context
    const {
      name, currentRole, borrowableRoles, quotaInfo, onBorrowRole, onLogout, showProfileEdition, onShowProfileEdition,
    } = this.props
    const showBorrowableRoles = keys(borrowableRoles).length > 1 // at least 2 roles, otherwise, there is only the current role
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
          label={formatMessage({ id: 'loggedButtonLabel' }, { login: this.props.name })}
          title={formatMessage({ id: 'loggedButtonTooltip' }, { login: name })}
          labelStyle={optionsLabelStyle}
          icon={<LoginIconComponent quotaState={quotaInfo.quotaState} rateState={quotaInfo.rateState} />}
          login={name}
          quotaState={QUOTA_INFO_STATE_ENUM.CONSUMED}//quotaInfo.quotaState}
          rateState={QUOTA_INFO_STATE_ENUM.IDLE}//quotaInfo.rateState}
          hasSubMenus
        >
          { /* Access user profile (do not insert a showable to not block menu auto-closing) */
            showProfileEdition ? (
              <MenuItem
                key="profile.edition"
                primaryText={formatMessage({ id: 'accountLabel' })}
                leftIcon={accountIcon}
                onClick={onShowProfileEdition}
                value={null}
              />)
              : null
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
                      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                      onClick={() => onBorrowRole(roleName)} // eslint wont fix: cannot compose MUI 0x menu items (breaks menu auto closing)
                      key={roleName}
                      primaryText={AdminDomain.DEFAULT_ROLES.includes(roleName) ? this.context.intl.formatMessage({ id: `role.name.${roleName}` }) : roleName}
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
            onClick={onLogout}
          />
        </DropDownButton>
      </div>
    )
  }
}

export default withQuotaInfo(LoggedUserComponent)
