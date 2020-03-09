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
import { MetadataList } from '@regardsoss/user-metadata-common'
import { themeContextType } from '@regardsoss/theme'
import { List, ListItem } from 'material-ui/List'
import { AdminShapes } from '@regardsoss/shape'
import { FormattedMessage } from 'react-intl'
import { CardActions } from 'material-ui/Card'
import { PositionedDialog } from '@regardsoss/components'
import Bell from 'mdi-material-ui/BellOutline'
import FlatButton from 'material-ui/FlatButton'
import Identity from 'mdi-material-ui/AccountOutline'
import Subheader from 'material-ui/Subheader'
import ProfileEditionFormComponent from './ProfileEditionFormComponent'
import ProfileNotificationFormComponent from './ProfileNotificationFormComponent'

const PROFILE_FORMS = {
  PROFILE: 'PROFILE',
  NOTIFICATIONS: 'NOTIFICATIONS',
}

/**
* Profile menu component: shows menu item and handles the profile dialog.
* Note that this component is always visible when mounted (the container unmounts it when it is not visible)
*/
class ProfileEditionDialogComponent extends React.Component {
  static propTypes = {
    userMetadata: MetadataList.isRequired,
    notificationSettings: AdminShapes.NotificationSettings,

    onHideDialog: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditNotificationSettings: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    view: PROFILE_FORMS.PROFILE,
  }

  getItemStyle = viewName => viewName === this.state.view ? this.context.moduleTheme.notifications.list.selectedItem.style : {}

  getIconColor = (viewName) => {
    const { muiTheme } = this.context
    return viewName === this.state.view ? muiTheme.palette.accent1Color : muiTheme.palette.primary1Color
  }

  getTextStyle = (viewName) => {
    const { muiTheme } = this.context
    return viewName === this.state.view ? { color: muiTheme.palette.accent1Color } : {}
  }

  handleOpen = (view) => {
    this.setState({
      view,
    })
  }

  /**
   * Render the corresponding view depending of the current state
   */
  renderCurrentForm = () => {
    const {
      userMetadata, notificationSettings, onEdit, onEditNotificationSettings,
    } = this.props

    switch (this.state.view) {
      case PROFILE_FORMS.PROFILE:
        return (<ProfileEditionFormComponent
          userMetadata={userMetadata}
          onEdit={onEdit}
        />)
      case PROFILE_FORMS.NOTIFICATIONS:
        return (<ProfileNotificationFormComponent
          notificationSettings={notificationSettings}
          onEdit={onEditNotificationSettings}
        />)
      default:
        throw new Error('Unexpect view type to display')
    }
  }

  render() {
    const {
      moduleTheme: {
        notifications,
      },
    } = this.context
    return (
      <PositionedDialog
        modal
        open
        onRequestClose={this.props.onHideDialog}
        bodyStyle={notifications.dialog.style}
        dialogHeightPercent={60}
        dialogWidthPercent={78}
      >
        <div style={notifications.dialog.wrapper.style}>
          <div className="col-xs-35 col-lg-25">
            <List>
              <Subheader style={notifications.list.subHeader.style}>
                <FormattedMessage id="user.menu.profile.leftbar.title" />
              </Subheader>
              <ListItem
                onClick={() => this.handleOpen(PROFILE_FORMS.PROFILE)}
                style={this.getItemStyle(PROFILE_FORMS.PROFILE)}
                key={`notification-${PROFILE_FORMS.PROFILE}`}
                leftIcon={<Identity color={this.getIconColor(PROFILE_FORMS.PROFILE)} />}
                innerDivStyle={this.getTextStyle(PROFILE_FORMS.PROFILE)}
                primaryText={
                  <FormattedMessage id="user.menu.profile.leftbar.profile" />
                }
              />
              <ListItem
                onClick={() => this.handleOpen(PROFILE_FORMS.NOTIFICATIONS)}
                style={this.getItemStyle(PROFILE_FORMS.NOTIFICATIONS)}
                key={`notification-${PROFILE_FORMS.NOTIFICATIONS}`}
                leftIcon={<Bell color={this.getIconColor(PROFILE_FORMS.NOTIFICATIONS)} />}
                primaryText={
                  <FormattedMessage id="user.menu.profile.leftbar.notification" />
                }
              />
            </List>
          </div>
          <div className="col-xs-65 col-lg-75" style={notifications.dialog.details.container.style}>
            {this.renderCurrentForm()}
          </div>
        </div>
        <CardActions style={notifications.dialog.details.actions.style}>
          <FlatButton
            label={
              <FormattedMessage id="user.menu.profile.action.close" />
            }
            primary
            onClick={this.props.onHideDialog}
          />
        </CardActions>
      </PositionedDialog>
    )
  }
}


export default ProfileEditionDialogComponent
