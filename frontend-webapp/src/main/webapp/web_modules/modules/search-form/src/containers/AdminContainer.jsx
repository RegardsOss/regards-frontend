/**
 * LICENSE_PLACEHOLDER
 **/
import { join, map, isEqual } from 'lodash'
import { connect } from '@regardsoss/redux'
import { AttributeModel, PluginDefinition } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ModuleConfiguration from '../models/ModuleConfiguration'
import AttributeModelClient from '../clients/AttributeModelClient'
import CriterionActions from '../models/criterion/CriterionActions'
import CriterionSelector from '../models/criterion/CriterionSelector'
import DatasetSelectionTypes from '../models/datasets/DatasetSelectionTypes'
import FormTabsComponent from '../components/admin/FormTabsComponent'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: ModuleConfiguration,
    }),

    // Initial module configuration given by LayModuleComponent
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps and mapDispatchToProps
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    selectableAttributesFectching: React.PropTypes.bool,
    availableCriterion: React.PropTypes.objectOf(PluginDefinition),
    fetchCriterion: React.PropTypes.func,
    fetchModelsAttributes: React.PropTypes.func,
    fetchAllModelsAttributes: React.PropTypes.func,
    fetchDatasetsAttributes: React.PropTypes.func,
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
        this.props.adminForm.form.conf.datasets.datasets,
        this.props.adminForm.form.conf.datasets.models)
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
        nextProps.adminForm.form.conf.datasets.datasets,
        nextProps.adminForm.form.conf.datasets.models)
    }
  }

  updateSelectableAttributes = (type, models, datasets) => {
    // TODO : Manage retreive of availables attributs with backend.
    let task
    if (type === DatasetSelectionTypes.DATASET_MODEL_TYPE) {
      task = this.props.fetchModelsAttributes(models)
    } else if (type === DatasetSelectionTypes.DATASET_TYPE) {
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
  selectableAttributes: AttributeModelClient.AttributeModelSelectors.getList(state),
  availableCriterion: CriterionSelector.getList(state),
})

const listToQueryParam = (list, key) => {
  let param = ''
  if (list && list.length > 0) {
    param = `&${join(map(list, element => `${key}=${element}`), ',')}`
  }
  return param
}

const mapDispatchToProps = dispatch => ({
  // Function to retrieve all available criterion plugins
  fetchCriterion: () => dispatch(CriterionActions.fetchPagedEntityList(0, 100)),
  fetchAllModelsAttributes: () => dispatch(AttributeModelClient.AttributeModelActions.fetchPagedEntityList(0, 100)),
  // Function to retrieve attributes associated to the selected models
  fetchModelsAttributes: modelsId => dispatch(
    AttributeModelClient.AttributeModelActions.fetchPagedEntityList(dispatch, 0, 100, { queryParam: listToQueryParam(modelsId, 'model') })),
  // Function to retrieve attributes associated to the selected datasets
  fetchDatasetsAttributes: datasetsId => dispatch(
    AttributeModelClient.AttributeModelActions.fetchPagedEntityList(dispatch, 0, 100, { queryPAram: listToQueryParam(datasetsId, 'dataset') })),
  // funcution to update a value of the current redux-form
})

const UnconnectedAdminContainer = AdminContainer
export {
  UnconnectedAdminContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

