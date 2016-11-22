
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage, intlShape } from 'react-intl'

/**
 * Dialog with action buttons.
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

/**
 *
 */
class ProjectAccountDeleteComponent extends React.Component {

  /**
   *
   * @type {{intl: ReactIntl.IntlShape}}
   */
  static contextTypes = {
    intl: intlShape,
  }
  context


  /**
   *
   */
  handleClose = () => {
    this.props.onClose()
  }

  /**
   *
   */
  handleDelete = () => {
    this.props.onDelete()
  }

  /**
   *
   * @returns {any}
   */
  render() {
    const title = this.context.intl.formatMessage({ id: 'dialog.delete.title' })
    const actions = [
      <FlatButton
        label={<FormattedMessage id="dialog.delete.cancel" />}
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage id="dialog.delete.accept" />}
        primary
        keyboardFocused
        onTouchTap={this.handleDelete}
      />,
    ]
    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open
        onRequestClose={this.handleClose}
      />
    )
  }
}

ProjectAccountDeleteComponent.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
}

export default ProjectAccountDeleteComponent
