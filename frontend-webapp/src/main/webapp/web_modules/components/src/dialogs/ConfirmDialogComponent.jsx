import values from 'lodash/values'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'

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

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
        className="selenium-confirmDialogButton"
        label={<FormattedMessage id={dialogType.messageId} />}
        onTouchTap={this.handleDelete}
      />,
      <FlatButton
        label={this.context.intl.formatMessage({ id: 'confirm.dialog.cancel' })}
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
