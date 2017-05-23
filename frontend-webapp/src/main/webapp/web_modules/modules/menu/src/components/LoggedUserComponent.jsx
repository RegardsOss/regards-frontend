/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { map, isEmpty } from 'lodash'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import AccountMenuIcon from 'material-ui/svg-icons/action/account-box'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ChangeRole from 'material-ui/svg-icons/maps/directions-run'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import { FormattedMessage } from 'react-intl'
import { ShowableAtRender } from '@regardsoss/components'
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
  }

  render() {
    const { name, currentRole, borrowableRoles, onBorrowRole, onLogout, showProfileEdition, onShowProfileEdition } = this.props
    const showBorrowableRoles = !isEmpty(borrowableRoles)
    const hasMoreOption = showProfileEdition || showBorrowableRoles
    return (
      <div style={this.context.moduleTheme.loggedUser.text}>
        <span>{name}</span>
        <ProfileEditionContainer />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          iconStyle={this.context.moduleTheme.loggedUser.icon}
        >
          {/* Access user profile */}
          <ShowableAtRender show={showProfileEdition}>
            <MenuItem
              primaryText={<FormattedMessage id="accountLabel" />}
              leftIcon={<AccountMenuIcon />}
              onTouchTap={onShowProfileEdition}
            />
          </ShowableAtRender>

          {/* Show borrowables roles submenu, only when there are borrowable roles */}
          <ShowableAtRender show={showBorrowableRoles}>
            <MenuItem
              primaryText={<FormattedMessage id="changeRole" />}
              leftIcon={<ChangeRole />}
              rightIcon={<ArrowDropRight />}
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
            primaryText={<FormattedMessage id="logoutLabel" />}
            leftIcon={<ActionExitToApp />}
            onTouchTap={onLogout}
          />
        </IconMenu>
      </div >
    )
  }
}

export default LoggedUserComponent
