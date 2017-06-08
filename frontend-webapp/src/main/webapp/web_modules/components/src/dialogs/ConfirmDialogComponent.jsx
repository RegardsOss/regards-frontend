/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import { I18nProvider } from '@regardsoss/i18n'
import ConfirmDialogImpl from './ConfirmDialogImpl'

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
    dialogType: PropTypes.oneOf(values(ConfirmDialogComponent.dialogTypes)),
    title: PropTypes.string.isRequired,
    message: PropTypes.string, // optional
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
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
    return (
      <I18nProvider messageDir={'components/src/i18n'}>
        <ConfirmDialogImpl
          title={title}
          message={message}
          confirmMessageKey={dialogType.messageId}
          onDelete={this.handleDelete}
          onCancel={onClose}
        />
      </I18nProvider>
    )
  }
}

export default ConfirmDialogComponent
