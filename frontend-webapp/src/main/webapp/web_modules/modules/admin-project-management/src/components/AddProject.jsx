
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { FormattedMessage } from 'react-intl'
import { ActionButtonComponent } from '@regardsoss/components'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class AddProject extends React.Component {

  state = {
    open: false,
    value: '',
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSave = () => {
    this.handleClose()
    this.props.onSave(this.state.value)
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const actions = [
      <FlatButton
        label={<FormattedMessage id="projects.cancel.button" />}
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage id="projects.submit.button" />}
        primary
        keyboardFocused
        onTouchTap={this.handleSave}
      />,
    ]

    return (
      <div>
        <ActionButtonComponent
          primary
          label={<FormattedMessage id="projects.add.button.title" />}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={'Ajouter un projet'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText={<FormattedMessage id="projects.project.name.label" />}
            onChange={this.handleChange}
          />
        </Dialog>
      </div>
    )
  }
}


AddProject.propTypes = {
  onSave: React.PropTypes.func.isRequired,
}

export default AddProject
