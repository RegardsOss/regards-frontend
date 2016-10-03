import * as React from "react"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import { FormattedMessage, intlShape } from "react-intl"
import Checkbox from "material-ui/Checkbox"
import { JavaTypes } from "./../../../JavaTypes"

interface CreateAttributeModalProps {
  handleCreateNewParameter: (label: string, type: string) => void
  handleCloseModal: () => void
}
export default class CreateAttributeModal extends React.Component<CreateAttributeModalProps, any> {
  static contextTypes: Object = {
    intl: intlShape
  }
  state: any = {
    label: "",
    type: 0
  }
  context: any


  handleClose = () => {
    this.props.handleCloseModal()
  }
  addAttribute = () => {
    const {label, type} = this.state
    this.props.handleCreateNewParameter(label, type)
  }
  handleAddAndReset = (event: React.FormEvent) => {
    this.addAttribute()
    this.setState({
      label: "",
      type: 0
    })
  }
  handleAddAndClose = (event: React.FormEvent) => {
    this.addAttribute()
    this.handleClose()
  }

  handleAttributeLabelChange = (event: React.FormEvent): any => {
    const newLabel = (event.target as any).value
    this.setState({
      label: newLabel
    })
  }
  handleAttributeTypeChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      type: value
    })
  }

  render (): JSX.Element {
    const {label, type} = this.state
    const title = this.context.intl.formatMessage({id: "datamanagement.datasetmodel.add.modal.header"})

    let actions = [
      <FlatButton
        label={<FormattedMessage id="datamanagement.datasetmodel.add.modal.action.close" />}
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]
    // Display save buttons only if attribute is well defined
    if (label.length > 0 && type !== 0) {
      actions.push(<FlatButton
        label={<FormattedMessage id="datamanagement.datasetmodel.add.modal.action.create_and_close" />}
        primary={true}
        onTouchTap={this.handleAddAndClose}
      />)
      actions.push(<FlatButton
        label={<FormattedMessage id="datamanagement.datasetmodel.add.modal.action.create_and_reset" />}
        primary={true}
        onTouchTap={this.handleAddAndReset}
      />)
    }

    let selectTypeItems: Array<JSX.Element> = []
    for (const i in JavaTypes) {
      selectTypeItems.push(
        (<MenuItem
          key={JavaTypes[i].value}
          value={JavaTypes[i].value}
          primaryText={<FormattedMessage id={JavaTypes[i].i18n}/>}
        />)
      )
    }

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.datasetmodel.add.modal.input.name" />}
            value={label}
            fullWidth={true}
            onChange={this.handleAttributeLabelChange}
          />

          <Checkbox
            label="Attribut calculé"
            defaultChecked={false}
          />
          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.datasetmodel.add.modal.input.type" />}
            value={type}
            fullWidth={true}
            onChange={this.handleAttributeTypeChange}
          >
            {selectTypeItems}
          </SelectField>
        </Dialog>
      </div>
    )
  }
}
