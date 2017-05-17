import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
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
      label={<FormattedMessage id="projects.cancel.button" />}
      primary
      onTouchTap={props.onClose}
    />,
    <FlatButton
      label={<FormattedMessage id="projects.submit.button" />}
      primary
      keyboardFocused
      onTouchTap={props.onSave}
    />,
  ]

  return (
    <Dialog
      title="Modifer un utilisateur"
      actions={actions}
      modal={false}
      open={props.open}
      onRequestClose={props.onClose}
      style={{ zIndex: 10000 }}
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
export default UserDialog
