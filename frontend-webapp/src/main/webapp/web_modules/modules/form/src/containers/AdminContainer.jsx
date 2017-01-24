/**
 * LICENSE_PLACEHOLDER
 **/
import { join, map, isEqual } from 'lodash'
import { getFormValues, change } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel } from '@regardsoss/model'
import ModelAttributeActions from '../models/attributes/ModelAttributeActions'
import ModelAttributeSelector from '../models/attributes/ModelAttributeSelector'
import { DATASET_MODEL_TYPE, DATASET_TYPE } from '../models/datasets/DatasetSelectionTypes'
import FormTabsComponent from '../components/admin/FormTabsComponent'
import Form from '../models/Form'
import DatasetConfShape from '../models/datasets/DatasetsConfShape'

/**
 * Main container to display administration view of the module form.
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
    // Set by mapDispatchToProps
    fetchModelsAttributes: React.PropTypes.func,
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
    }
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
  selectableAttributes: ModelAttributeSelector.getList(state),
  selectableAttributesFectching: ModelAttributeSelector.isFetching(state),
})

const listToQueryParam = (list, key) => {
  let param = ''
  if (list && list.length > 0) {
    param = `&${join(map(list, element => `${key}=${element}`), ',')}`
  }
  return [param]
}

const mapDispatchToProps = dispatch => ({
  // Function to retrieve attributes associated to the selected models
  fetchModelsAttributes: modelsId => dispatch(
    ModelAttributeActions.fetchPagedEntityList(dispatch, 0, 100, listToQueryParam(modelsId, 'model'))),
  // Function to retrieve attributes associated to the selected datasets
  fetchDatasetsAttributes: datasetsId => dispatch(
    ModelAttributeActions.fetchPagedEntityList(dispatch, 0, 100, listToQueryParam(datasetsId, 'dataset'))),
  // funcution to update a value of the current redux-form
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

