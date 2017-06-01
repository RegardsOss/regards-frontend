import Dialog from 'material-ui/Dialog'
import { i18nContextType } from '@regardsoss/i18n'
import FlatButton from 'material-ui/FlatButton'
import UserForm from './UserForm'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
function UserDialog(props) {
  const actions = [
    <FlatButton
      key="projects.cancel.button"
      label={this.context.intl.formatMessage({ id: 'projects.cancel.button' })}
      primary
      onTouchTap={props.onClose}
    />,
    <FlatButton
      key="projects.submit.button"
      label={this.context.intl.formatMessage({ id: 'projects.submit.button' })}
      primary
      keyboardFocused
      onTouchTap={props.onSave}
    />,
  ]

  const dialogStyle = { zIndex: 10000 }
  return (
    <Dialog
      title="Modifer un utilisateur"
      actions={actions}
      modal={false}
      open={props.open}
      onRequestClose={props.onClose}
      style={dialogStyle}
    >
      <UserForm
        handleSubmit={null} // this.props.onUserFormSubmit
        onSubmit={null} // this.props.onUserFormSubmit
        onCancelClick={null}
      />
    </Dialog>
  )
}

UserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
UserDialog.contextTypes = {
  ...i18nContextType,
}
export default UserDialog
