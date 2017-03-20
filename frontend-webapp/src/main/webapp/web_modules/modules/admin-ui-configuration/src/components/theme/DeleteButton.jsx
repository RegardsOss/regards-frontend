/**
 * LICENSE_PLACEHOLDER
 **/
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { HateoasIconAction, HateoasKeys, HateoasLinks } from '@regardsoss/display-control'
import moduleStyles from '../../styles/styles'

/**
 * Toolbar icon button for deleting  with a confirm dialog.
 *
 * @author Xavier-Alexandre Brochard
 */
class DeleteButton extends React.Component {

  static propTypes = {
    onDelete: React.PropTypes.func.isRequired,
    entityLinks: React.PropTypes.arrayOf(HateoasLinks).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleDiscard = () => {
    const { onDelete } = this.props
    Promise.resolve(onDelete()).then(actionRes => this.handleClose())
  }

  render() {
    const style = moduleStyles(this.context.muiTheme).theme

    const actions = [
      <FlatButton
        label={<FormattedMessage id="application.theme.remove.confirm.cancel" />}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage id="application.theme.remove.confirm.remove" />}
        primary
        onTouchTap={this.handleDiscard}
      />,
    ]

    return (
      <div>
        <HateoasIconAction
          entityLinks={this.props.entityLinks}
          hateoasKey={HateoasKeys.DELETE}
          onTouchTap={this.handleOpen}
          tooltip={<FormattedMessage id="application.theme.remove.tooltip" />}
        ><Delete color={style.toolbar.icon.color} /></HateoasIconAction>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{ width: 'auto' }}
        >
          <FormattedMessage id="application.theme.remove.confirm" />
        </Dialog>
      </div>
    )
  }
}

export default DeleteButton
