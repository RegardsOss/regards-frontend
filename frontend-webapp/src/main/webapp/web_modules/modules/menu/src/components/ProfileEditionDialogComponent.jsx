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
    projectMetadata: MetadataList.isRequired,
    onHideDialog: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { projectMetadata, onHideDialog, onEdit } = this.props
    const { moduleTheme: { profile: { dialog } } } = this.context

    return (
      <div>
        <Dialog open onRequestClose={onHideDialog} bodyStyle={dialog.styles}>
          <ProfileEditionFormComponent
            projectMetadata={projectMetadata}
            onEdit={onEdit}
            onCancel={onHideDialog}
          />
        </Dialog>
      </div>
    )
  }
}


export default ProfileEditionDialogComponent
