/**
 * LICENSE_PLACEHOLDER
 **/
import join from 'lodash/join'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AttributeModel, PluginDefinition } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ModuleConfiguration from '../models/ModuleConfiguration'
import { datasetDataAttributesActions, datasetDataAttributesSelectors } from '../clients/DatasetDataAttributesClient'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../clients/UIPluginDefinitionClient'
import DatasetSelectionTypes from '../models/datasets/DatasetSelectionTypes'
import FormTabsComponent from '../components/admin/FormTabsComponent'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: ModuleConfiguration,
    }),

    // Initial module configuration given by LayModuleComponent
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps and mapDispatchToProps
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    selectableAttributesFectching: PropTypes.bool,
    availableCriterion: PropTypes.objectOf(PluginDefinition),
    fetchCriterion: PropTypes.func,
    fetchModelsAttributes: PropTypes.func,
    fetchAllModelsAttributes: PropTypes.func,
    fetchDatasetsAttributes: PropTypes.func,
  }

  static defaultProps = {
    selectableAttributes: [],
    selectableAttributesFectching: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      attributesLoading: true,
      criterionLoading: true,
    }
  }

  componentWillMount() {
    if (this.props.adminForm.form && this.props.adminForm.form.conf && this.props.adminForm.form.conf.datasets) {
      this.updateSelectableAttributes(this.props.adminForm.form.conf.datasets.type,
        this.props.adminForm.form.conf.datasets.selectedModels,
        this.props.adminForm.form.conf.datasets.selectedDatasets)
    } else {
      this.updateSelectableAttributes()
    }
    // Load available criterion plugins
    Promise.resolve(this.props.fetchCriterion()).then(() => {
      this.setState({
        criterionLoading: false,
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    // Check if the selectable attributes have to be updated
    if (this.props.adminForm.form && this.props.adminForm.form.conf && !isEqual(this.props.adminForm.form.conf.datasets, nextProps.adminForm.form.conf.datasets)) {
      this.updateSelectableAttributes(nextProps.adminForm.form.conf.datasets.type,
        nextProps.adminForm.form.conf.datasets.selectedModels,
        nextProps.adminForm.form.conf.datasets.selectedDatasets)
    }
  }

  updateSelectableAttributes = (type, models, datasets) => {
    let task
    if (type === DatasetSelectionTypes.DATASET_MODEL_TYPE && models && models.length > 0) {
      task = this.props.fetchModelsAttributes(models)
    } else if (type === DatasetSelectionTypes.DATASET_TYPE && datasets && datasets.length > 0) {
      task = this.props.fetchDatasetsAttributes(datasets)
    } else {
      task = this.props.fetchAllModelsAttributes()
    }

    Promise.resolve(task).then(() => {
      this.setState({ attributesLoading: false })
    })
  }

  initEmptyProps() {
    return {
      appName: this.props.appName,
      project: this.props.project,
      adminForm: this.props.adminForm,
      changeField: this.props.adminForm.changeField,
      defaultConf: {
        enableFacettes: this.props.moduleConf.enableFacettes,
        resultType: this.props.moduleConf.resultType ? this.props.moduleConf.resultType : 'datasets',
        datasets: this.props.moduleConf.datasets ? this.props.moduleConf.datasets : {
          type: 'all',
        },
        criterion: this.props.moduleConf.criterion ? this.props.moduleConf.criterion : [],
        layout: this.props.moduleConf.layout,
        attributes: this.props.moduleConf.attributes ? this.props.moduleConf.attributes : [],
        attributesRegroupements: this.props.moduleConf.attributesRegroupements ? this.props.moduleConf.attributesRegroupements : [],
      },
      selectableAttributes: this.props.selectableAttributes,
      selectableAttributesFectching: this.state.attributesLoading,
      disableChangeDatasets: this.props.selectableAttributesFectching,
      availableCriterion: this.props.availableCriterion,
      criterionFetching: this.state.criterionLoading,
    }
  }

  render() {
    if (this.props.adminForm.form) {
      const props = this.initEmptyProps()
      return (
        <LoadableContentDisplayDecorator
          isLoading={this.state.attributesLoading || this.state.criterionLoading}
        >
          <FormTabsComponent
            {...props}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectableAttributes: datasetDataAttributesSelectors.getList(state),
  availableCriterion: uiPluginDefinitionSelectors.getList(state),
})

const listToQueryParam = (list) => {
  let param = ''
  if (list && list.length > 0) {
    param = `${join(list, ',')}`
  }
  return param
}

const mapDispatchToProps = dispatch => ({
  // Function to retrieve all available criterion plugins
  fetchCriterion: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 100, {}, { type: 'CRITERIA' })),
  fetchAllModelsAttributes: () => dispatch(datasetDataAttributesActions.fetchPagedEntityList(0, 10000)),
  // Function to retrieve attributes associated to the selected models
  fetchModelsAttributes: modelsId => dispatch(
    datasetDataAttributesActions.fetchPagedEntityList(0, 10000, {}, { modelId: listToQueryParam(modelsId) })),
  // Function to retrieve attributes associated to the selected datasets
  fetchDatasetsAttributes: datasetsId => dispatch(
    datasetDataAttributesActions.fetchPagedEntityList(0, 10000, {}, { datasetIds: listToQueryParam(datasetsId) })),
  // funcution to update a value of the current redux-form
})

const UnconnectedAdminContainer = AdminContainer
export {
  UnconnectedAdminContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

