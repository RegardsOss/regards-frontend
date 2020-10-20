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
import { FormattedMessage } from 'react-intl'
import { CardActions } from 'material-ui/Card'
import IdentityIcon from 'mdi-material-ui/AccountOutline'
import NotificationsIcon from 'mdi-material-ui/BellOutline'
import QuotaInfoIcon from 'mdi-material-ui/ProgressDownload'
import FlatButton from 'material-ui/FlatButton'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import { AdminShapes } from '@regardsoss/shape'
import { MetadataList } from '@regardsoss/user-metadata-common'
import { themeContextType } from '@regardsoss/theme'
import { PositionedDialog } from '@regardsoss/components'
import { QuotaInfo, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import ProfileEditionFormComponent from './ProfileEditionFormComponent'
import ProfileNotificationFormComponent from './ProfileNotificationFormComponent'
import { PROFILE_VIEW_STATES, PROFILE_VIEW_STATE_ENUM } from '../../../domain/ProfileViewStateEnum'
import ProfileQuotaInformationComponent from './ProfileQuotaInformationComponent'

/**
* Profile menu component: shows menu item and handles the profile dialog.
* Note that this component is always visible when mounted (the container unmounts it when it is not visible)
*/
class ProfileEditionDialogComponent extends React.Component {
  static propTypes = {
    quotaInfo: QuotaInfo.isRequired,
    view: PropTypes.oneOf(PROFILE_VIEW_STATES).isRequired,
    userMetadata: MetadataList.isRequired,
    notificationSettings: AdminShapes.NotificationSettings,

    onShowView: PropTypes.func.isRequired,
    onEditProfile: PropTypes.func.isRequired,
    onEditNotificationSettings: PropTypes.func.isRequired,
    onHideDialog: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static LIST_OPTIONS = {
    profileEdition: {
      value: PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE,
      i18nKey: 'user.menu.profile.leftbar.profile',
      Icon: IdentityIcon,
      callbackName: 'onOpenProfile',
    },
    notificationSettings: {
      value: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
      i18nKey: 'user.menu.profile.leftbar.notification',
      Icon: NotificationsIcon,
      callbackName: 'onOpenNotifications',
    },
    quotaInformation: {
      value: PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS,
      i18nKey: 'user.menu.profile.leftbar.quotaInformation',
      Icon: QuotaInfoIcon,
      callbackName: 'onOpenQuotaInformation',
    },
  }

  /** User callback: open profile */
  onOpenProfile = () => this.props.onShowView(PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE)

  /** User callback: open notifications */
  onOpenNotifications = () => this.props.onShowView(PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS)

  /** User callback: open quota information */
  onOpenQuotaInformation = () => this.props.onShowView(PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS)

  /**
   * @param {string} view, form PROFILE_VIEW_STATE_ENUM
   * @return {*} returns the list item style (depends on selected state)
   */
  getListItemStyle = (view) => {
    const { moduleTheme } = this.context
    return view === this.props.view ? moduleTheme.notifications.list.selectedItem.style : undefined
  }

  /**
   * @param {string} view, form PROFILE_VIEW_STATE_ENUM
   * @return {*} returns the list item icon color (depends on selected state
   */
  getListItemIconColor = (view) => {
    const { muiTheme } = this.context
    return view === this.props.view ? muiTheme.palette.accent1Color : muiTheme.palette.primary1Color
  }

  /**
   * @param {string} view, form PROFILE_VIEW_STATE_ENUM
   * @return {*} returns the list item text style (depends on selected state)
   */
  getListItemTextStyle = (view) => {
    const { muiTheme } = this.context
    return view === this.props.view ? { color: muiTheme.palette.accent1Color } : {}
  }

  render() {
    const {
      moduleTheme: {
        notifications,
      },
    } = this.context
    const {
      userMetadata, notificationSettings, view, quotaInfo,
      onHideDialog, onEditProfile, onEditNotificationSettings,
    } = this.props
    return (
      <PositionedDialog
        modal
        open
        onRequestClose={onHideDialog}
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
              { /** List options: add download information for users that have limited rate or quota */
              [
                ProfileEditionDialogComponent.LIST_OPTIONS.profileEdition,
                ProfileEditionDialogComponent.LIST_OPTIONS.notificationSettings,
                (quotaInfo.quotaState === QUOTA_INFO_STATE_ENUM.UNLIMITED && quotaInfo.rateState === QUOTA_INFO_STATE_ENUM.UNLIMITED)
                  ? null
                  : ProfileEditionDialogComponent.LIST_OPTIONS.quotaInformation,
              ].filter((c) => !!c) // remove null options if any
                .map(({
                  value, i18nKey, Icon, callbackName,
                }) => (
                  <ListItem
                    key={value}
                    primaryText={<FormattedMessage id={i18nKey} />}
                    leftIcon={<Icon color={this.getListItemIconColor(value)} />}
                    style={this.getListItemStyle(value)}
                    innerDivStyle={this.getListItemTextStyle(value)}
                    onClick={this[callbackName]}
                  />))
              }
            </List>
          </div>
          <div className="col-xs-65 col-lg-75" style={notifications.dialog.details.container.style}>
            {(() => {
              switch (view) {
                case PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE:
                  return <ProfileEditionFormComponent userMetadata={userMetadata} onEdit={onEditProfile} />
                case PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS:
                  return <ProfileNotificationFormComponent notificationSettings={notificationSettings} onEdit={onEditNotificationSettings} />
                case PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS:
                  return <ProfileQuotaInformationComponent quotaInfo={quotaInfo} />
                default:
                  throw new Error('Unexpected view type')
              }
            })()}
          </div>
        </div>
        <CardActions style={notifications.dialog.details.actions.style}>
          <FlatButton
            label={
              <FormattedMessage id="user.menu.profile.action.close" />
            }
            primary
            onClick={onHideDialog}
          />
        </CardActions>
      </PositionedDialog>
    )
  }
}

export default ProfileEditionDialogComponent
