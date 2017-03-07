/**
 * LICENSE_PLACEHOLDER
 **/
import { join, map, isEqual } from 'lodash'
import { getFormValues, change } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel, PluginDefinition } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
import CriterionActions from '../models/criterion/CriterionActions'
import CriterionSelector from '../models/criterion/CriterionSelector'
import { DATASET_MODEL_TYPE, DATASET_TYPE } from '../models/datasets/DatasetSelectionTypes'
import FormTabsComponent from '../components/admin/FormTabsComponent'
import AttributeConfiguration from '../models/attributes/AttributeConfiguration'
import AttributesRegroupementConfiguration from '../models/attributes/AttributesRegroupementConfiguration'
import Form from '../models/Form'
import DatasetConfShape from '../models/datasets/DatasetsConfShape'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: React.PropTypes.string,
    // Props supplied by redux-form to get the current form values
    changeField: React.PropTypes.func,
    form: Form,
    // Default props given to the form
    datasets: DatasetConfShape,
    criterion: React.PropTypes.arrayOf(PluginConf),
    layout: React.PropTypes.string,
    resultType: React.PropTypes.string,
    attributes: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupements: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Calculated attributes set by mapstatetoprops
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    availableCriterion: React.PropTypes.objectOf(PluginDefinition),
    // Set by mapDispatchToProps
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

  componentDidMount() {
    if (this.props.form && this.props.form.conf && this.props.form.conf.datasets) {
      this.updateSelectableAttributes(this.props.form.conf.datasets.type,
        this.props.form.conf.datasets.datasets,
        this.props.form.conf.datasets.models)
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
    if (this.props.form && this.props.form.conf && !isEqual(this.props.form.conf.datasets, nextProps.form.conf.datasets)) {
      this.updateSelectableAttributes(nextProps.form.conf.datasets.type,
        nextProps.form.conf.datasets.datasets,
        nextProps.form.conf.datasets.models)
    }
  }

  updateSelectableAttributes = (type, models, datasets) => {
    // TODO : Manage retreive of availables attributs with backend.
    let task
    if (type === DATASET_MODEL_TYPE) {
      task = this.props.fetchModelsAttributes(models)
    } else if (type === DATASET_TYPE) {
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
      changeField: this.props.changeField,
      currentConf: this.props.form.conf,
      module: this.props.form,
      defaultConf: {
        enableFacettes: this.props.enableFacettes,
        resultType: this.props.resultType ? this.props.resultType : 'datasets',
        datasets: this.props.datasets ? this.props.datasets : {
          type: 'all',
        },
        criterion: this.props.criterion ? this.props.criterion : [],
        layout: this.props.layout,
        attributes: this.props.attributes ? this.props.attributes : [],
        attributesRegroupements: this.props.attributesRegroupements ? this.props.attributesRegroupements : [],
      },
      selectableAttributes: this.props.selectableAttributes,
      selectableAttributesFectching: this.state.attributesLoading,
      disableChangeDatasets: this.props.selectableAttributesFectching,
      availableCriterion: this.props.availableCriterion,
      criterionFetching: this.state.criterionLoading,
    }
  }

  render() {
    if (this.props.form) {
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
  form: getFormValues('edit-module-form')(state),
  selectableAttributes: AttributeModelSelector.getList(state),
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
  fetchAllModelsAttributes: () => dispatch(AttributeModelActions.fetchPagedEntityList(0, 100)),
  // Function to retrieve attributes associated to the selected models
  fetchModelsAttributes: modelsId => dispatch(
    AttributeModelActions.fetchPagedEntityList(dispatch, 0, 100, { queryParam: listToQueryParam(modelsId, 'model') })),
  // Function to retrieve attributes associated to the selected datasets
  fetchDatasetsAttributes: datasetsId => dispatch(
    AttributeModelActions.fetchPagedEntityList(dispatch, 0, 100, { queryPAram: listToQueryParam(datasetsId, 'dataset') })),
  // funcution to update a value of the current redux-form
  // TODO get form name from upper container (admin-ui-configuration module)
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})

const UnconnectedAdminContainer = AdminContainer
export {
  UnconnectedAdminContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

