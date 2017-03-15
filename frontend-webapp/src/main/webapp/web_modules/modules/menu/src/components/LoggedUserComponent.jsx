/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { map, isEmpty } from 'lodash'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import Settings from 'material-ui/svg-icons/action/settings'
import ChangeRole from 'material-ui/svg-icons/maps/directions-run'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import { FormattedMessage } from 'react-intl'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { Role } from '@regardsoss/model'


/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
class LoggedUserComponent extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    currentRole: React.PropTypes.string.isRequired,
    borrowableRoles: React.PropTypes.objectOf(Role).isRequired,
    onBorrowRole: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { name, currentRole, borrowableRoles, onBorrowRole, onLogout } = this.props
    return (
      <div style={this.context.moduleTheme.loggedUser.text}>
        <span>{name}</span>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          iconStyle={this.context.moduleTheme.loggedUser.icon}
        >
          <MenuItem primaryText={<FormattedMessage id="settingsLabel" />} leftIcon={<Settings />} />
          <ShowableAtRender show={!isEmpty(borrowableRoles)}>
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
          <Divider />
          <MenuItem
            primaryText={<FormattedMessage id="logoutLabel" />}
            leftIcon={<ActionExitToApp />}
            onTouchTap={onLogout}
          />
        </IconMenu>
      </div>
    )
  }
}

export default LoggedUserComponent
