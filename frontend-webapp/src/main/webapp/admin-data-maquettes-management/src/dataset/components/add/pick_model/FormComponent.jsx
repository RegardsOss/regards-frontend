
import { Card, CardText, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { map } from 'lodash'
import { CardActionsComponent } from '@regardsoss/components'
import PickModelModelAttributeDefaultValuesComponent from './DatasetModelAttributeComponent'

/**
 */
class FormComponent extends React.Component {

  state= {
    label: '',
    modelType: 0,
  }


  getAttributesDefined = () => (
    // We use refs here because we do not want these values to be reactive or connected to Redux
    this.refs.defaultModelAttributeValues.getAttributesDefined()
  )

  handleNextButton = () => {
    const { modelType, label } = this.state
    const attributesDefined = this.getAttributesDefined()
    this.props.save(label, modelType, attributesDefined)
    this.props.handleNextStep()
  }


  handleNewModel = () => {
    this.props.goToNewModel()
  }

  handleDatasetLabelChange = (event) => {
    const newLabel = event.target.value
    this.setState({
      label: newLabel,
    })
  }

  handleModelTypeChange = (event, index, value) => {
    this.setState({
      modelType: value,
    })
  }
  handleGetBack = () => (
    this.props.handleGetBack()
)

  render() {
    const { datasetModels } = this.props
    const { modelType, label } = this.state
    const isNextButtonVisible = modelType > 0 && label.length > 0
    const isModelListAttributeVisible = modelType > 0
    const defaultModelValuesComponent = isModelListAttributeVisible ? (
      <PickModelModelAttributeDefaultValuesComponent
        model={datasetModels[modelType]}
        ref="defaultModelAttributeValues"
      />
    ) : null
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={<FormattedMessage id="datamanagement.dataset.add.header" />}
          children={this.props.children}
        />

        <CardText>
          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.dataset.add.1.label" />}
            fullWidth
            onChange={this.handleDatasetLabelChange}
          />
          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.dataset.add.1.modelType" />}
            value={modelType}
            onChange={this.handleModelTypeChange}
          >
            {map(datasetModels, (datasetModel, id) => (
              <MenuItem key={id} value={datasetModel.id} primaryText={datasetModel.name} />
            ))}
          </SelectField>
          <FlatButton
            label={<FormattedMessage id="datamanagement.dataset.add.1.action.createNewModel" />}
            primary
            onTouchTap={this.handleNewModel}
          />

        </CardText>
        <CardText>
          {defaultModelValuesComponent}

          <CardActionsComponent
            secondaryButtonLabel={<FormattedMessage id="datamanagement.dataset.add.1.action.back" />}
            secondaryButtonTouchTap={this.handleGetBack}
            mainButtonLabel={<FormattedMessage id="datamanagement.dataset.add.1.action.next" />}
            mainButtonTouchTap={this.handleNextButton}
            isMainButtonVisible={isNextButtonVisible}
          />
        </CardText>
      </Card>
    )
  }
}
FormComponent.propTypes = {
  handleNextStep: React.PropTypes.func.isRequired,
  goToNewModel: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  handleGetBack: React.PropTypes.func.isRequired,
  datasetModels: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
  children: React.PropTypes.element.isRequired,
}
export default FormComponent
/*

 <TimePicker
 format="24hr"
 hintText="Attribut 3 de type date"
 fullWidth={true}
 />
 */
