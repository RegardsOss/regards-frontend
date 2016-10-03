import * as React from "react"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"
import { FormattedMessage } from "react-intl"
import { ActionButtonComponent } from "@regardsoss/components"

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */


interface AddProjectProps {
  onSave: (value: string) => void
}
export default class AddProject extends React.Component<AddProjectProps, any> {

  state: any = {
    open: false,
    value: ''
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleSave = () => {
    this.handleClose()
    this.props.onSave(this.state.value)
  }

  handleChange = (event: any) => {
    this.setState({
      value: event.target.value,
    })
  }

  render (): JSX.Element {
    const actions = [
      <FlatButton
        label={<FormattedMessage id='projects.cancel.button'/>}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage id='projects.submit.button'/>}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />,
    ]

    return (
      <div>
        <ActionButtonComponent
          primary={true}
          label={<FormattedMessage id='projects.add.button.title'/>}
          onTouchTap={this.handleOpen}/>
        <Dialog
          title={"Ajouter un projet"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText={<FormattedMessage id='projects.project.name.label'/>}
            onChange={this.handleChange}/>
        </Dialog>
      </div>
    )
  }
}
