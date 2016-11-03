
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage, intlShape } from 'react-intl'
import Checkbox from 'material-ui/Checkbox'
import JavaTypes from './../../../JavaTypes'
/*
interface CreateAttributeModalProps {
  handleCreateNewParameter: (label: string, type: string) => void
  handleCloseModal: () => void
}*/
export default class CreateAttributeModal extends React.Component {
  static contextTypes = {
    intl: intlShape,
  }
  state= {
    label: '',
    type: 0,
  }


  handleClose = () => {
    this.props.handleCloseModal()
  }
  addAttribute = () => {
    const { label, type } = this.state
    this.props.handleCreateNewParameter(label, type)
  }
  handleAddAndReset = (event) => {
    this.addAttribute()
    this.setState({
      label: '',
      type: 0,
    })
  }
  handleAddAndClose = (event) => {
    this.addAttribute()
    this.handleClose()
  }

  handleAttributeLabelChange = (event) => {
    const newLabel = event.target.value
    this.setState({
      label: newLabel,
    })
  }
  handleAttributeTypeChange = (event, index, value) => {
    this.setState({
      type: value,
    })
  }

  render() {
    const { label, type } = this.state
    const title = this.context.intl.formatMessage({ id: 'datamanagement.datasetmodel.add.modal.header' })

    const actions = [
      <FlatButton
        label={<FormattedMessage id="datamanagement.datasetmodel.add.modal.action.close" />}
        primary
        onTouchTap={this.handleClose}
      />,
    ]
    // Display save buttons only if attribute is well defined
    if (label.length > 0 && type !== 0) {
      actions.push(<FlatButton
        label={<FormattedMessage id="datamanagement.datasetmodel.add.modal.action.create_and_close" />}
        primary
        onTouchTap={this.handleAddAndClose}
      />)
      actions.push(<FlatButton
        label={<FormattedMessage id="datamanagement.datasetmodel.add.modal.action.create_and_reset" />}
        primary
        onTouchTap={this.handleAddAndReset}
      />)
    }

    const selectTypeItems = []
    for (const i in JavaTypes) {
      selectTypeItems.push(
        (<MenuItem
          key={JavaTypes[i].value}
          value={JavaTypes[i].value}
          primaryText={<FormattedMessage id={JavaTypes[i].i18n} />}
        />)
      )
    }

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open
          onRequestClose={this.handleClose}
        >
          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.datasetmodel.add.modal.input.name" />}
            value={label}
            fullWidth
            onChange={this.handleAttributeLabelChange}
          />

          <Checkbox
            label="Attribut calculé"
            defaultChecked={false}
          />
          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.datasetmodel.add.modal.input.type" />}
            value={type}
            fullWidth
            onChange={this.handleAttributeTypeChange}
          >
            {selectTypeItems}
          </SelectField>
        </Dialog>
      </div>
    )
  }
}
