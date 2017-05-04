/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { ProjectUser } from '@regardsoss/model'
import { metadataV1 } from '@regardsoss/user-metadata-common'
import profileDialogActions from '../model/ProfileDialogActions'
import profileDialogSelectors from '../model/ProfileDialogSelectors'
import { myUserActions, myUserSelectors } from '../client/MyUserClient'
import ProfileEditionDialogComponent from '../components/ProfileEditionDialogComponent'

/**
* Profile edition container
*/
export class ProfileEditionContainer extends React.Component {

  /**
   * Finds in user model (optional) the metadata for key as parameter
   * @param metadataKey searched metadata key
   * @param myUser fetched myUser data (optional)
   * @return found metadata server model or undefined
   */
  static findUserMetaData = (metadataKey, myUser) => {
    const metaData = (myUser && myUser.content && myUser.content.metaData) || []
    return metaData.find(({ key }) => key === metadataKey)
  }

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
    visible: React.PropTypes.bool.isRequired,
    myUser: ProjectUser,
    // from mapDispatchToProps
    hideDialog: React.PropTypes.func.isRequired, // hide edition dialog (cancel)
    fetchMyUser: React.PropTypes.func.isRequired, // fetch user data
    updateMyUser: React.PropTypes.func.isRequired, // update user data (which also updates user data by return value)
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

    // rebuild the metadata from UI model
    const metaData = metadataV1.map(({ key }) => {
      const metadataEntity = ProfileEditionContainer.findUserMetaData(key, myUser)
      return {
        id: metadataEntity && metadataEntity.id, // undefined when metadata does not yet exist on server side
        key,
        value: formValues[key],
      }
    })

    // now rebuild a user as expected by server (remove the content)
    const updatedUser = {
      ...(myUser.content),
      metaData, // put metadata with new value
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
  updateMetadata = (user) => {
    const userMetadata = metadataV1.map((metadata) => {
      const correspondingServerMetadata = ProfileEditionContainer.findUserMetaData(metadata.key, user)
      return {
        // find in server data the metadata matching current UI model. If undefined, let the field undefined
        currentValue: correspondingServerMetadata && correspondingServerMetadata.value, // undefined when no meta or no value
        ...metadata,
      }
    })
    this.setState({ userMetadata })
  }

  render() {
    const { visible, hideDialog } = this.props
    const { userMetadata } = this.state
    return (
      // here we unmount the inner component when not visible, so that fields get resetted when dialog is closed
      visible ?
        <ProfileEditionDialogComponent
          userMetadata={userMetadata}
          onHideDialog={hideDialog}
          onEdit={this.onEdit}
        /> : null
    )
  }
}
export default connect(
  ProfileEditionContainer.mapStateToProps,
  ProfileEditionContainer.mapDispatchToProps,
)(ProfileEditionContainer)
