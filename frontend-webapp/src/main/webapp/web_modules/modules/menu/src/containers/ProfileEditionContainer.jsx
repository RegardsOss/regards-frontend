/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { metadataV1 } from '@regardsoss/user-metadata-common'
import ProfileDialogActions from '../model/ProfileDialogActions'
import ProfileDialogSelectors from '../model/ProfileDialogSelectors'
import ProfileEditionDialogComponent from '../components/ProfileEditionDialogComponent'

/**
* Profile edition container
*/
class ProfileEditionContainer extends React.Component {

  static mapStateToProps = state => ({
    visible: ProfileDialogSelectors.isProfileEditionVisible(state),
  })

  static mapDispatchToProps = dispatch => ({
    hideDialog: () => dispatch(ProfileDialogActions.hideEdition()),
    // TODO save inputs then hide
  })

  static propTypes = {
    // from mapStateToProps
    visible: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
    hideDialog: React.PropTypes.func.isRequired, // hide edition dialog (cancel)
  }

  /** Interaction: On edition done */
  onEdit = (formValues) => {
    console.error('OK here are the elements to edit!!!!, TBCODED', formValues)
  }

  render() {
    const { visible, hideDialog } = this.props

    return (
      visible ? // here we unmount the inner component when not visible, so that fields get resetted
        <ProfileEditionDialogComponent
          projectMetadata={metadataV1}
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
