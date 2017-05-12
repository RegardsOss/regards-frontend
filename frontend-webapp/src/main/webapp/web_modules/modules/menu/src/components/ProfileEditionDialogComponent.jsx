/**
* LICENSE_PLACEHOLDER
**/
import Dialog from 'material-ui/Dialog'
import { MetadataList } from '@regardsoss/user-metadata-common'
import { themeContextType } from '@regardsoss/theme'
import ProfileEditionFormComponent from './ProfileEditionFormComponent'

/**
* Profile menu component: shows menu item and handles the profile dialog.
* Note that this component is always visible when mounted (the container unmounts it when it is not visible)
*/
class ProfileEditionDialogComponent extends React.Component {

  static propTypes = {
    userMetadata: MetadataList.isRequired,
    onHideDialog: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { userMetadata, onHideDialog, onEdit } = this.props
    const { moduleTheme: { profile: { dialog } } } = this.context

    return (
      <Dialog open onRequestClose={onHideDialog} bodyStyle={dialog.styles}>
        <ProfileEditionFormComponent
          userMetadata={userMetadata}
          onEdit={onEdit}
          onCancel={onHideDialog}
        />
      </Dialog>
    )
  }
}


export default ProfileEditionDialogComponent
