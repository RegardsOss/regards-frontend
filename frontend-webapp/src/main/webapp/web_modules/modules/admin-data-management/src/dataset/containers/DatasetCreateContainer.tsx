import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import PickModelFormComponent from "../components/add/pick_model/FormComponent"
import StepperCreateDatasetComponent from "../components/add/StepperCreateDatasetComponent"
import PickDatasourceFormComponent from "../components/add/pick_datasource/FormComponent"
import CreateDatasetSuccessComponent from "../components/add/CreateDatasetSuccessComponent"
import { connect } from "react-redux"
import * as DatasetCreationFormActions from "../model/datasetCreation.form.actions"
import DatasetCreationFormSelectors from "../model/datasetCreation.form.selectors"
import * as DatasetActions from "../model/dataset.actions"
import { browserHistory } from "react-router"
import { DatasetModel } from "@regardsoss/models"
import { DatasetDefaultModelAttribute } from "@regardsoss/models"

import { FORM_STATES_ENUM as STATES} from "./../model/FormStatesEnum"



interface DatasetCreateProps {
  // From mapStateToProps
  viewState?: string,
  // From router
  router: any,
  route: any,
  params: any,
  location: any,

  // From mapDispatchToProps
  setViewState?: (newState: string) => void
  setDatasetLabel: (label: string) => void
  setDatasetModelType: (modelType: number) => void
  setDatasetDefaultModelAttributes: (attributesDefined: Array<DatasetDefaultModelAttribute>) => void
  setDatasource: (datasourceId: any) => void
  addDataset: (dataset: any) => void

  datasetModels?: Array<DatasetModel>
}
/**
 */
export class DatasetCreateContainer extends React.Component<DatasetCreateProps, any> {
  handleNextStepPickModelForm = () => {
    this.setNextStep()
  }
  handleNextStepPickDatasourceForm = () => {
    this.setNextStep()
  }

  resetStepAndData = () => {
    this.props.setViewState(STATES.SELECT_MODELE)
  }
  setNextStep = () => {
    switch (this.props.viewState) {
      case STATES.SELECT_MODELE:
        this.props.setViewState(STATES.SELECT_SOURCE)
        break
      case STATES.SELECT_SOURCE:
        this.props.setViewState(STATES.DONE)
        break
      case STATES.DONE:
        break
      default:
        throw 'Undefined state ' + this.props.viewState
    }
  }

  getStepperIndex = () => {
    switch (this.props.viewState) {
      case STATES.SELECT_MODELE:
        return 0
      case STATES.SELECT_SOURCE:
        return 1
      case STATES.DONE:
        return 2
      default:
        throw 'Undefined state ' + this.props.viewState
    }
  }

  goToNewModel = () => {
    const from = encodeURIComponent(this.props.location.pathname)
    const urlTo = "/admin/" + this.props.params.project + "/datamanagement/datasetmodel/create/" + from
    browserHistory.push(urlTo)
  }
  goToNewDatasource = () => {
    const from = encodeURIComponent(this.props.location.pathname)
    const urlTo = "/admin/" + this.props.params.project + "/datamanagement/datasource/create/" + from
    browserHistory.push(urlTo)
  }

  savePickModelForm = (label: string, modelType: number, attributesDefined: Array<DatasetDefaultModelAttribute>) => {
    this.props.setDatasetLabel(label)
    this.props.setDatasetModelType(modelType)
    this.props.setDatasetDefaultModelAttributes(attributesDefined)
  }
  savePickDatasourceForm = (datasourceId: any) => {
    this.props.setDatasource(datasourceId)
  }
  saveDataset = () => {
    // Todo: comment fait t'on pour récuperer les données déjà enregistrées dans le store ???
    const urlTo = "/admin/" + this.props.params.projectName + "/datamanagement/"
    browserHistory.push(urlTo)
    this.props.addDataset("Dataset #1")
    this.resetStepAndData()
  }
  handleGetBack = (state: string) => {
    switch (state) {
      case STATES.SELECT_MODELE:
        this.resetStepAndData()
        const urlTo = "/admin/" + this.props.params.project + "/datamanagement/dataset/"
        browserHistory.push(urlTo)
        break
      case STATES.SELECT_SOURCE:
        this.props.setViewState(STATES.SELECT_MODELE)
        break
      case STATES.DONE:
        this.props.setViewState(STATES.SELECT_SOURCE)
        break
      default:
        throw 'Undefined state ' + state
    }
  }
  handleGetBackToPickModel = () => {
    this.props.setViewState(STATES.DONE)
  }

  render (): JSX.Element {
    const {viewState, datasetModels} = this.props
    const stepper = (
      <StepperCreateDatasetComponent
        getStepperIndex={this.getStepperIndex}
      />
    )
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <div>
          {(() => {
            switch (viewState) {
              case STATES.SELECT_MODELE:
                return <PickModelFormComponent
                  handleNextStep={this.handleNextStepPickModelForm}
                  goToNewModel={this.goToNewModel}
                  save={this.savePickModelForm}
                  handleGetBack={() => {this.handleGetBack(STATES.SELECT_MODELE)}}
                  datasetModels={datasetModels}
                >
                  {stepper}
                </PickModelFormComponent>
              case STATES.SELECT_SOURCE:
                return <PickDatasourceFormComponent
                  handleNextStep={this.handleNextStepPickDatasourceForm}
                  handleGetBack={() => {this.handleGetBack(STATES.SELECT_SOURCE)}}
                  goToNewDatasource={this.goToNewDatasource}
                  save={this.savePickDatasourceForm}
                >
                  {stepper}
                </PickDatasourceFormComponent>
              case STATES.DONE:
                return <CreateDatasetSuccessComponent
                  handleNextStep={this.saveDataset}
                >
                  {stepper}
                </CreateDatasetSuccessComponent>
              default:
                throw 'Undefined state ' + viewState
            }
          })()}
        </div>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const viewState = DatasetCreationFormSelectors.getViewState(state)
  const models: any = null
  return {
    viewState,
    datasetModels: models
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  setViewState: (newState: string) => dispatch(DatasetCreationFormActions.setViewState(newState)),
  setDatasetLabel: (label: string) => dispatch(DatasetCreationFormActions.setDatasetLabel(label)),
  setDatasetModelType: (modelType: number) => dispatch(DatasetCreationFormActions.setDatasetModelType(modelType)),
  setDatasetDefaultModelAttributes: (attributesDefined: Array<DatasetDefaultModelAttribute>) =>
    dispatch(DatasetCreationFormActions.setDatasetDefaultModelAttributes(attributesDefined)),
  setDatasource: (datasourceId: any) => dispatch(DatasetCreationFormActions.setDatasource(datasourceId)),
  addDataset: (name: string) => dispatch(DatasetActions.addDataset(name))
})
export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
