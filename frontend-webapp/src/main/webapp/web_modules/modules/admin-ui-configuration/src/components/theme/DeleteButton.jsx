/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { muiTheme } from '@regardsoss/vendors'
import moduleStyles from '../../styles/styles'

/**
 * Toolbar icon button for deleting  with a confirm dialog.
 *
 * @author Xavier-Alexandre Brochard
 */
class DeleteButton extends React.Component {

  static propTypes = {
    onDelete: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleDiscard = () => {
    const { onDelete } = this.props
    Promise.resolve(onDelete()).then(actionRes => this.handleClose())
  }

  render() {
    const style = moduleStyles(this.context.muiTheme).theme

    const actions = [
      <FlatButton
        label={<FormattedMessage id="application.theme.remove.confirm.cancel"/>}
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage id="application.theme.remove.confirm.remove"/>}
        primary={true}
        onTouchTap={this.handleDiscard}
      />,
    ]

    return (
      <div>
        <IconButton
          onTouchTap={this.handleOpen}
          tooltip={<FormattedMessage id="application.theme.remove.tooltip"/>}
        ><Delete color={style.toolbar.icon.color}/></IconButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width:'auto'}}
        >
          <FormattedMessage id="application.theme.remove.confirm"/>
        </Dialog>
      </div>
    )
  }
}

export default DeleteButton
