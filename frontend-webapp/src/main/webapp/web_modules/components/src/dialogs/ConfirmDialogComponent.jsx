import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage, intlShape } from 'react-intl'
import { I18nProvider } from '@regardsoss/i18n'

/**
 * Confirm action dialog component
 */
class ConfirmDialogComponent extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  /**
   *
   */
  handleDelete = () => {
    Promise.resolve(this.props.onDelete()).then(this.props.onClose)
  }

  /**
   *
   * @returns {any}
   */
  render() {
    const title = this.props.title
    const actions = [
      <FlatButton
        label={<FormattedMessage id="dialog.delete.cancel" />}
        primary
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label={<FormattedMessage id="dialog.delete.accept" />}
        primary
        keyboardFocused
        onTouchTap={this.handleDelete}
      />,
    ]
    return (
      <I18nProvider messageDir={'components/src/i18n'}>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open
          onRequestClose={this.props.onClose}
        />
      </I18nProvider>
    )
  }
}

export default ConfirmDialogComponent
