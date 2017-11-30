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
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { getMetadataArray, packMetadataField } from '@regardsoss/user-metadata-common'
import profileDialogActions from '../model/ProfileDialogActions'
import profileDialogSelectors from '../model/ProfileDialogSelectors'
import { myUserActions, myUserSelectors } from '../clients/MyUserClient'
import ProfileEditionDialogComponent from '../components/ProfileEditionDialogComponent'

/**
 * Profile edition container
 */
export class ProfileEditionContainer extends React.Component {
  static mapStateToProps = state => ({
    visible: profileDialogSelectors.isProfileEditionVisible(state),
    myUser: myUserSelectors.getMyUser(state),
    isFetching: myUserSelectors.isFetching(state),
  })

  static mapDispatchToProps = dispatch => ({
    hideDialog: () => dispatch(profileDialogActions.hideEdition()),
    fetchMyUser: () => dispatch(myUserActions.fetchMyUser()),
    updateMyUser: user => dispatch(myUserActions.updateMyUser(user)),
  })

  static propTypes = {
    // from mapStateToProps
    visible: PropTypes.bool.isRequired,
    myUser: AdminShapes.ProjectUser,
    // from mapDispatchToProps
    hideDialog: PropTypes.func.isRequired, // hide edition dialog (cancel)
    fetchMyUser: PropTypes.func.isRequired, // fetch user data
    updateMyUser: PropTypes.func.isRequired, // update user data (which also updates user data by return value)
  }

  state = {
    userMetadata: null,
  }

  componentWillMount = () => {
    // as this component mounts only when user is logged, it doesn't need to fetch when authentication data changes
    this.props.fetchMyUser()
    this.updateMetadata(this.props.myUser)
  }

  componentWillReceiveProps = (nextProps) => {
    // back from user fetching?
    if (this.props.myUser !== nextProps.myUser) {
      this.updateMetadata(nextProps.myUser)
    }
  }

  /** Interaction: On edition done */
  onEdit = (formValues) => {
    const { updateMyUser, hideDialog, myUser } = this.props

    // now rebuild a user as expected by server (remove the content)
    const updatedUser = {
      ...(myUser.content),
      metadata: packMetadataField(myUser, formValues), // put metadata with new value
    }
    updateMyUser(updatedUser)
    // finally request dialog hide
    hideDialog()
  }

  /**
   * Updates userMetadata in state  from loaded myUser data. This method always returns a list of metadata,
   * but when user is known, retrieves the current metadata values
   * @param user : myUser values
   */
  updateMetadata = user => this.setState({ userMetadata: getMetadataArray(user) })

  render() {
    const { visible, hideDialog } = this.props
    const { userMetadata } = this.state

    // here we unmount the inner component when not visible, so that fields get resetted when dialog is closed
    if (!visible) {
      return null
    }
    return (
      <ProfileEditionDialogComponent
        userMetadata={userMetadata}
        onHideDialog={hideDialog}
        onEdit={this.onEdit}
      />
    )
  }
}
export default connect(
  ProfileEditionContainer.mapStateToProps,
  ProfileEditionContainer.mapDispatchToProps,
)(ProfileEditionContainer)
