
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { map, find } from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Delete from 'material-ui/svg-icons/action/delete'
import { TableRowColumn, Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { CardActionsComponent } from '@regardsoss/components'
import { JavaTypes } from '@regardsoss/model'
import CreateAttributeModal from './CreateAttributeModal'


/**
 */
class ModelCreateComponent extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      label: '',
      attributes: [],
      openCreateParameterModal: false,
    }
  }

  handleSaveButton = () => (
     this.props.handleNextStep(this.state.label, this.state.attributes)
    )
  handleCancelUrl = () => (
     this.props.getCancelUrl()
    )
  handleModelLabelChange = (event) => {
    const newLabel = event.target.value
    this.setState({
      label: newLabel,
    })
  }
  handleCloseModal = () => {
    this.setState({
      openCreateParameterModal: false,
    })
  }
  handleCreateNewParameter = (label, type) => {
    const { attributes } = this.state
    attributes.push({
      name: label,
      type,
    })
    this.setState({
      attributes,
    })
  }
  handleOpenPopupCreateParameter = () => {
    this.setState({
      openCreateParameterModal: true,
    })
  }
  handleDeleteBtn = (entity) => {
    const { attributes } = this.state
    this.setState({
      attributes: attributes.filter(element => element.name !== entity.name),
    })
  }
  handleEditBtn = () => {
    console.log('todo')
  }

  printType = (typeValue) => {
    const type = find(JavaTypes, { value: typeValue })
    return (<FormattedMessage id={type.i18n} />)
  }

  render() {
    const { attributes, label, openCreateParameterModal } = this.state

    // display the modal if required
    const modal = openCreateParameterModal ? (
      <CreateAttributeModal
        handleCreateNewParameter={this.handleCreateNewParameter}
        handleCloseModal={this.handleCloseModal}
      />) : null


    // display the list of attributes if there is
    const currentListAttributes = attributes.length > 0 ? (
      <Table
        selectable={false}
        multiSelectable={false}
      >
        <TableHeader
          enableSelectAll={false}
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>
              <FormattedMessage
                id="datamanagement.datasetmodel.table.name"
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                id="datamanagement.datasetmodel.table.type"
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                id="datamanagement.datasetmodel.table.actions"
              />
            </TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} preScanRows={false}>
          {map(attributes, attribute => (
            <TableRow
              key={attribute.name}
            >
              <TableRowColumn>
                {attribute.name}
              </TableRowColumn>
              < TableRowColumn >
                {this.printType(attribute.type)}
              </ TableRowColumn >
              <TableRowColumn>
                <FlatButton
                  icon={<Edit />}
                  onTouchTap={() => this.handleEditBtn(attribute)}
                  disabled
                />
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  icon={<Delete />}
                  onTouchTap={() => this.handleDeleteBtn(attribute)}
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : null


    const labelAsTitle = label ? `"${label}"` : ''
    const isSaveButtonVisible = attributes.length > 0 && label.length > 0
    const styleAddAttribute = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={
            <FormattedMessage
              id="datamanagement.datasetmodel.add.header"
              values={{
                label: <i>{labelAsTitle}</i>,
              }}
            />
          }
        />
        <CardText>
          {modal}

          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.datasetmodel.add.input.name" />}
            fullWidth
            onChange={this.handleModelLabelChange}
          />
          <div style={styleAddAttribute}>
            <FlatButton
              label={<FormattedMessage id="datamanagement.datasetmodel.add.action.add_attribute" />}
              primary
              onClick={this.handleOpenPopupCreateParameter}
            />
          </div>

          {currentListAttributes}

          <CardActionsComponent
            secondaryButtonUrl={this.handleCancelUrl()}
            secondaryButtonLabel={
              <FormattedMessage
                id="datamanagement.datasetmodel.add.action.cancel"
              />
            }
            isMainButtonVisible={isSaveButtonVisible}

            mainButtonTouchTap={this.handleSaveButton}
            mainButtonLabel={
              <FormattedMessage
                id="datamanagement.datasetmodel.add.action.save"
              />
            }
          />
        </CardText>
      </Card>
    )
  }
}
ModelCreateComponent.propTypes = {
  getCancelUrl: React.PropTypes.func.isRequired,
  handleNextStep: React.PropTypes.func.isRequired,
}
export default ModelCreateComponent
