import * as React from "react"
import { Card, CardText, CardTitle } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"
import { DatasetModel } from "@regardsoss/models"
import { map } from "lodash"
import PickModelModelAttributeDefaultValuesComponent from "./DatasetModelAttributeComponent"
import { CardActionsComponent } from "@regardsoss/components"

interface FormProps {
  handleNextStep: () => void
  goToNewModel: () => void
  save: (label: string, modelType: number, attributesDefined: Array<any>) => void
  handleGetBack: () => void
  datasetModels: Array<DatasetModel>
}
/**
 */
class FormComponent extends React.Component<FormProps, any> {

  state: any = {
    label: "",
    modelType: 0
  }
  refs: {
    defaultModelAttributeValues: PickModelModelAttributeDefaultValuesComponent
  }

  handleGetBack = () => {
    return this.props.handleGetBack()
  }

  handleNextButton = () => {
    const {modelType, label} = this.state
    const attributesDefined = this.getAttributesDefined()
    this.props.save(label, modelType, attributesDefined)
    this.props.handleNextStep()
  }


  handleNewModel = () => {
    this.props.goToNewModel()
  }

  handleDatasetLabelChange = (event: React.FormEvent): any => {
    const newLabel = (event.target as any).value
    this.setState({
      label: newLabel
    })
  }

  handleModelTypeChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      modelType: value
    })
  }
  getAttributesDefined = () => {
    // We use refs here because we do not want these values to be reactive or connected to Redux
    return this.refs.defaultModelAttributeValues.getAttributesDefined()
  }

  render (): JSX.Element {
    const {datasetModels} = this.props
    const {modelType, label} = this.state
    const isNextButtonVisible = modelType > 0 && label.length > 0
    const isModelListAttributeVisible = modelType > 0
    const defaultModelValuesComponent = isModelListAttributeVisible ? (
      <PickModelModelAttributeDefaultValuesComponent
        model={datasetModels[modelType]}
        ref="defaultModelAttributeValues"
      ></PickModelModelAttributeDefaultValuesComponent>
    ) : null
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={<FormattedMessage id="datamanagement.dataset.add.header"/>}
          children={this.props.children}
        />

        <CardText>
          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.dataset.add.1.label"/>}
            fullWidth={true}
            onChange={this.handleDatasetLabelChange}
          />
          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.dataset.add.1.modelType" />}
            value={modelType}
            onChange={this.handleModelTypeChange}
          >
            {map(datasetModels, (datasetModel: DatasetModel, id: string) => (
              <MenuItem key={id} value={datasetModel.id} primaryText={datasetModel.name}/>
            ))}
          </SelectField>
          <FlatButton
            label={<FormattedMessage id="datamanagement.dataset.add.1.action.createNewModel" />}
            primary={true}
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

export default FormComponent
/*

 <TimePicker
 format="24hr"
 hintText="Attribut 3 de type date"
 fullWidth={true}
 />
 */
