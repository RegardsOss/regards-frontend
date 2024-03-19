/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { getMetadataArray, packMetadataField } from '@regardsoss/user-metadata-common'
import { QuotaInfo } from '@regardsoss/entities-common'
import { ProfileDialogActions } from '../../../model/ProfileDialogActions'
import profileDialogSelectors from '../../../model/ProfileDialogSelectors'
import { myUserActions, myUserSelectors } from '../../../clients/MyUserClient'
import { notificationSettingsActions, notificationSettingsSelectors } from '../../../clients/NotificationSettingsClient'
import ProfileEditionDialogComponent from '../../../components/user/profile/ProfileEditionDialogComponent'
import { PROFILE_VIEW_STATES } from '../../../domain/ProfileViewStateEnum'

/**
 * Profile edition container
 */
export class ProfileEditionContainer extends React.Component {
  static mapStateToProps = (state) => ({
    dialogState: profileDialogSelectors.getProfileDialogState(state),
    myUser: myUserSelectors.getMyUser(state),
    notificationSettings: notificationSettingsSelectors.getResult(state),
  })

  static mapDispatchToProps = (dispatch) => ({
    onShowView: (view) => dispatch(ProfileDialogActions.setView(view)),
    onHideDialog: () => dispatch(ProfileDialogActions.hideDialog()),
    fetchMyUser: () => dispatch(myUserActions.fetchMyUser()),
    updateMyUser: (user) => dispatch(myUserActions.updateMyUser(user)),
    fetchNotificationSettings: () => dispatch(notificationSettingsActions.fetchNotificationSettings()),
    updateNotificationSettings: (settings) => dispatch(notificationSettingsActions.updateNotificationSettings(settings)),
  })

  static propTypes = {
    quotaInfo: QuotaInfo.isRequired,
    // from mapStateToProps
    dialogState: PropTypes.shape({
      open: PropTypes.bool.isRequired,
      view: PropTypes.oneOf(PROFILE_VIEW_STATES).isRequired,
    }).isRequired,
    myUser: AccessShapes.ProjectUser,
    notificationSettings: AdminShapes.NotificationSettings,
    // from mapDispatchToProps
    onShowView: PropTypes.func.isRequired,
    onHideDialog: PropTypes.func.isRequired, // hide edition dialog (cancel)
    fetchMyUser: PropTypes.func.isRequired, // fetch user data
    updateMyUser: PropTypes.func.isRequired, // update user data (which also updates user data by return value)
    fetchNotificationSettings: PropTypes.func.isRequired,
    updateNotificationSettings: PropTypes.func.isRequired,
  }

  state = {
    userMetadata: null,
    isLoading: true,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // back from user fetching?
    if (this.props.myUser !== nextProps.myUser) {
      this.updateMetadata(nextProps.myUser)
    }
    if (this.props.dialogState.open !== nextProps.dialogState.open) {
      if (nextProps.dialogState.open) {
        // Load data
        this.props.fetchMyUser()
        this.props.fetchNotificationSettings()
      } else {
        // reset to initial state
        this.setState({
          isLoading: true,
          userMetadata: null,
        })
      }
    }
  }

  /** Interaction: On profile edition done */
  onEditProfile = (formValues) => {
    const { updateMyUser, myUser } = this.props

    // now rebuild a user as expected by server (remove the content)
    const updatedUser = {
      ...(myUser.content),
      metadata: packMetadataField(myUser, formValues), // put metadata with new value
    }
    return updateMyUser(updatedUser)
  }

  onEditNotificationSettings = (newSettings) => this.props.updateNotificationSettings(newSettings)

  /**
   * Updates userMetadata in state  from loaded myUser data. This method always returns a list of metadata,
   * but when user is known, retrieves the current metadata values
   * @param user : myUser values
   */
  updateMetadata = (user) => this.setState({
    userMetadata: getMetadataArray(user),
    isLoading: false,
  })

  render() {
    const {
      quotaInfo, dialogState: { open, view }, notificationSettings,
      onShowView, onHideDialog,
    } = this.props
    const { userMetadata, isLoading } = this.state

    // here we unmount the inner component when not visible, so that fields get resetted when dialog is closed
    if (!open || isLoading) {
      return null
    }
    return (
      <ProfileEditionDialogComponent
        view={view}
        quotaInfo={quotaInfo}
        userMetadata={userMetadata}
        notificationSettings={notificationSettings}
        onShowView={onShowView}
        onEditProfile={this.onEditProfile}
        onEditNotificationSettings={this.onEditNotificationSettings}
        onHideDialog={onHideDialog}
      />
    )
  }
}
export default connect(
  ProfileEditionContainer.mapStateToProps,
  ProfileEditionContainer.mapDispatchToProps,
)(ProfileEditionContainer)
