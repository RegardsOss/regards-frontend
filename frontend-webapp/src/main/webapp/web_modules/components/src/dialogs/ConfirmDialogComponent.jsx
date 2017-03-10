import { values } from 'lodash'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
import { I18nProvider } from '@regardsoss/i18n'

/**
 * Confirm action dialog component. Switches dialog mode,
 */
class ConfirmDialogComponent extends React.Component {

  /**
   * possible dialog types
   */
  static dialogTypes = {
    DELETE: {
      messageId: 'confirm.dialog.delete',
    },
    CONFIRM: {
      messageId: 'confirm.dialog.confirm',
    },
  }

  static propTypes = {
    dialogType: React.PropTypes.oneOf(values(ConfirmDialogComponent.dialogTypes)),
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.string, // optional
    onConfirm: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    dialogType: ConfirmDialogComponent.dialogTypes.CONFIRM,
  }

  handleDelete = () => {
    Promise.resolve(this.props.onConfirm()).then(this.props.onClose)
  }

  /**
   *
   * @returns {any}
   */
  render() {
    const { title, message, onClose, dialogType } = this.props
    const actions = [
      <FlatButton
        label={<FormattedMessage id={dialogType.messageId} />}
        onTouchTap={this.handleDelete}
      />,
      <FlatButton
        label={<FormattedMessage id="confirm.dialog.cancel" />}
        primary
        keyboardFocused
        onTouchTap={onClose}
      />,
    ]
    return (
      <I18nProvider messageDir={'components/src/i18n'}>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open
          onRequestClose={onClose}
        >
          {message}
        </Dialog>
      </I18nProvider>
    )
  }
}

export default ConfirmDialogComponent
