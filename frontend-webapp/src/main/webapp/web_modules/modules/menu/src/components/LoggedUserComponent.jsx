/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import Settings from 'material-ui/svg-icons/action/settings'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display action available on connected user.
 */
class LoggedUserComponent extends React.Component {

  /**
   *
   * @type {{name: *}}
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    return (
      <div style={this.context.moduleTheme.loggedUser.text}>
        <span>{this.props.name}</span>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          iconStyle={this.context.moduleTheme.loggedUser.icon}
        >
          <MenuItem primaryText={<FormattedMessage id="logoutLabel" />} leftIcon={<ActionExitToApp />} />
          <MenuItem primaryText={<FormattedMessage id="settingsLabel" />} leftIcon={<Settings />} />
        </IconMenu>
      </div>
    )
  }
}

export default LoggedUserComponent
