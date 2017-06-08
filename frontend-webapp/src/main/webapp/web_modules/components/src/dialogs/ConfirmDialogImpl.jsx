/**
* LICENSE_PLACEHOLDER
**/
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Confirm dialog implementation, that has the i18n module context
*/
class ConfirmDialogImpl extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string, // optional
    confirmMessageKey: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  renderActions = () => {
    const { confirmMessageKey, onCancel, onDelete } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key={confirmMessageKey}
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: confirmMessageKey })}
        onTouchTap={onDelete}
      />,
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'confirm.dialog.cancel' })}
        primary
        keyboardFocused
        onTouchTap={onCancel}
      />,
    ]
  }

  render() {
    const { title, message, onCancel } = this.props
    return (
      <Dialog
        title={title}
        actions={this.renderActions()}
        modal={false}
        open
        onRequestClose={onCancel}
      >
        {message}
      </Dialog>

    )
  }
}
export default ConfirmDialogImpl
