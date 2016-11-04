
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PickModelFormComponent from '../components/add/pick_model/FormComponent'
import StepperCreateDatasetComponent from '../components/add/StepperCreateDatasetComponent'
import PickDatasourceFormComponent from '../components/add/pick_datasource/FormComponent'
import CreateDatasetSuccessComponent from '../components/add/CreateDatasetSuccessComponent'
import * as DatasetCreationFormActions from '../model/datasetCreation.form.actions'
import DatasetCreationFormSelectors from '../model/datasetCreation.form.selectors'
import * as DatasetActions from '../model/dataset.actions'
import { FORM_STATES_ENUM as STATES } from './../model/FormStatesEnum'


/**
 */
export class DatasetCreateContainer extends React.Component {

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
        throw new Error(`Undefined state ${this.props.viewState}`)
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
        throw new Error(`Undefined state ${this.props.viewState}`)
    }
  }

  resetStepAndData = () => {
    this.props.setViewState(STATES.SELECT_MODELE)
  }
  handleNextStepPickModelForm = () => {
    this.setNextStep()
  }
  handleNextStepPickDatasourceForm = () => {
    this.setNextStep()
  }

  goToNewModel = () => {
    const from = encodeURIComponent(this.props.location.pathname)
    const urlTo = `/admin/${this.props.params.project}/datamanagement/datasetmodel/create/${from}`
    browserHistory.push(urlTo)
  }
  goToNewDatasource = () => {
    const from = encodeURIComponent(this.props.location.pathname)
    const urlTo = `/admin/${this.props.params.project}/datamanagement/datasource/create/${from}`
    browserHistory.push(urlTo)
  }

  savePickModelForm = (label, modelType, attributesDefined) => {
    this.props.setDatasetLabel(label)
    this.props.setDatasetModelType(modelType)
    this.props.setDatasetDefaultModelAttributes(attributesDefined)
  }
  savePickDatasourceForm = (datasourceId) => {
    this.props.setDatasource(datasourceId)
  }
  saveDataset = () => {
    // Todo: comment fait t'on pour récuperer les données déjà enregistrées dans le store ???
    const urlTo = `/admin/${this.props.params.projectName}/datamanagement/`
    browserHistory.push(urlTo)
    this.props.addDataset('Dataset #1')
    this.resetStepAndData()
  }
  handleGetBack = (state) => {
    switch (state) {
      case STATES.SELECT_MODELE:
        this.resetStepAndData()
        browserHistory.push(`/admin/${this.props.params.project}/datamanagement/dataset/`)
        break
      case STATES.SELECT_SOURCE:
        this.props.setViewState(STATES.SELECT_MODELE)
        break
      case STATES.DONE:
        this.props.setViewState(STATES.SELECT_SOURCE)
        break
      default:
        throw new Error(`Undefined state ${state}`)
    }
  }
  handleGetBackToPickModel = () => {
    this.props.setViewState(STATES.DONE)
  }

  render() {
    const { viewState, datasetModels } = this.props
    const stepper = (
      <StepperCreateDatasetComponent
        getStepperIndex={this.getStepperIndex}
      />
    )
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <div>
          {(() => {
            switch (viewState) {
              case STATES.SELECT_MODELE:
                return (<PickModelFormComponent
                  handleNextStep={this.handleNextStepPickModelForm}
                  goToNewModel={this.goToNewModel}
                  save={this.savePickModelForm}
                  handleGetBack={() => { this.handleGetBack(STATES.SELECT_MODELE) }}
                  datasetModels={datasetModels}
                >
                  {stepper}
                </PickModelFormComponent>)
              case STATES.SELECT_SOURCE:
                return (<PickDatasourceFormComponent
                  handleNextStep={this.handleNextStepPickDatasourceForm}
                  handleGetBack={() => { this.handleGetBack(STATES.SELECT_SOURCE) }}
                  goToNewDatasource={this.goToNewDatasource}
                  save={this.savePickDatasourceForm}
                >
                  {stepper}
                </PickDatasourceFormComponent>)
              case STATES.DONE:
                return (<CreateDatasetSuccessComponent
                  handleNextStep={this.saveDataset}
                >
                  {stepper}
                </CreateDatasetSuccessComponent>)
              default:
                throw new Error(`Undefined state ${viewState}`)
            }
          })()}
        </div>
      </I18nProvider>
    )
  }
}
DatasetCreateContainer.propTypes = {

  // From mapStateToProps
  viewState: React.PropTypes.string,
  datasetModels: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
  // From router
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  location: React.PropTypes.string.isRequired,

  // From mapDispatchToProps
  setViewState: React.PropTypes.func,
  setDatasetLabel: React.PropTypes.func,
  setDatasetModelType: React.PropTypes.func,
  setDatasetDefaultModelAttributes: React.PropTypes.func,
  setDatasource: React.PropTypes.func,
  addDataset: React.PropTypes.func,

}
const mapStateToProps = (state, ownProps) => {
  const viewState = DatasetCreationFormSelectors.getViewState(state)
  const models = null
  return {
    viewState,
    datasetModels: models,
  }
}
const mapDispatchToProps = dispatch => ({
  setViewState: newState => dispatch(DatasetCreationFormActions.setViewState(newState)),
  setDatasetLabel: label => dispatch(DatasetCreationFormActions.setDatasetLabel(label)),
  setDatasetModelType: modelType => dispatch(DatasetCreationFormActions.setDatasetModelType(modelType)),
  setDatasetDefaultModelAttributes: attributesDefined =>
    dispatch(DatasetCreationFormActions.setDatasetDefaultModelAttributes(attributesDefined)),
  setDatasource: datasourceId => dispatch(DatasetCreationFormActions.setDatasource(datasourceId)),
  addDataset: name => dispatch(DatasetActions.addDataset(name)),
})
export default connect(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
