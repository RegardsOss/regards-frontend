/**
 * LICENSE_PLACEHOLDER
 **/
import { join, map, isEqual } from 'lodash'
import { getFormValues, change } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel, PluginDefinition } from '@regardsoss/model'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
import CriterionActions from '../models/criterion/CriterionActions'
import CriterionSelector from '../models/criterion/CriterionSelector'
import { DATASET_MODEL_TYPE, DATASET_TYPE } from '../models/datasets/DatasetSelectionTypes'
import FormTabsComponent from '../components/admin/FormTabsComponent'
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
    // Calculated attributes set by mapstatetoprops
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    selectableAttributesFectching: React.PropTypes.bool,
    availableCriterion: React.PropTypes.objectOf(PluginDefinition),
    criterionFetching: React.PropTypes.bool,
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

  componentWillMount() {
    if (this.props.form && this.props.form.conf && this.props.form.conf.datasets) {
      this.updateSelectableAttributes(this.props.form.conf.datasets.type,
        this.props.form.conf.datasets.datasets,
        this.props.form.conf.datasets.models)
    } else {
      this.updateSelectableAttributes()
    }
    // Load available criterion plugins
    this.props.fetchCriterion()
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
    if (type === DATASET_MODEL_TYPE) {
      this.props.fetchModelsAttributes(models)
    } else if (type === DATASET_TYPE) {
      this.props.fetchDatasetsAttributes(datasets)
    } else {
      this.props.fetchAllModelsAttributes()
    }
  }

  initEmptyProps() {
    return {
      appName: this.props.appName,
      changeField: this.props.changeField,
      currentConf: this.props.form.conf,
      module: this.props.form,
      defaultConf: {
        resultType: this.props.resultType ? this.props.resultType : 'datasets',
        datasets: this.props.datasets ? this.props.datasets : {
          type: 'all',
        },
        criterion: this.props.criterion ? this.props.criterion : [],
        layout: this.props.layout,
      },
      selectableAttributes: this.props.selectableAttributes,
      disableChangeDatasets: this.props.selectableAttributesFectching,
      availableCriterion: this.props.availableCriterion,
      criterionFetching: this.props.criterionFetching,
    }
  }

  render() {
    if (this.props.form) {
      const props = this.initEmptyProps()
      return (
        <div>
          <FormTabsComponent
            {...props}
          />
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  form: getFormValues('edit-module-form')(state),
  selectableAttributes: AttributeModelSelector.getList(state),
  selectableAttributesFectching: AttributeModelSelector.isFetching(state),
  availableCriterion: CriterionSelector.getList(state),
  criterionFetching: CriterionSelector.isFetching(state),
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

