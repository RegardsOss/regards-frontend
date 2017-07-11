/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { withI18n, i18nContextType } from '@regardsoss/i18n'

/**
 * possible dialog types
 */
export const ConfirmDialogComponentTypes = {
  DELETE: {
    messageId: 'confirm.dialog.delete',
  },
  REFUSE: {
    messageId: 'confirm.dialog.refuse',
  },
  CONFIRM: {
    messageId: 'confirm.dialog.confirm',
  },
}

/**
 * Confirm action dialog component. Switches dialog mode,
 */
class ConfirmDialogComponent extends React.Component {

  static propTypes = {
    dialogType: PropTypes.oneOf(values(ConfirmDialogComponentTypes)),
    title: PropTypes.string.isRequired,
    message: PropTypes.string, // optional
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }

  static defaultProps = {
    dialogType: ConfirmDialogComponentTypes.CONFIRM,
    open: true,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  handleDelete = () => {
    Promise.resolve(this.props.onConfirm()).then(this.props.onClose)
  }

  renderActions = () => {
    const { dialogType, onClose } = this.props
    const { intl: { formatMessage } } = this.context
    const confirmMessageKey = dialogType.messageId
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'confirm.dialog.cancel' })}
        primary
        keyboardFocused
        onTouchTap={onClose}
      />,
      <FlatButton
        key={confirmMessageKey}
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: confirmMessageKey })}
        onTouchTap={this.handleDelete}
      />,
    ]
  }

  render() {
    const { title, message, onClose, open } = this.props
    return (
      <Dialog
        title={title}
        actions={this.renderActions()}
        modal={false}
        open={open}
        onRequestClose={onClose}
      >
        {message}
      </Dialog>

    )
  }

}

export default withI18n('components/src/i18n')(ConfirmDialogComponent)
