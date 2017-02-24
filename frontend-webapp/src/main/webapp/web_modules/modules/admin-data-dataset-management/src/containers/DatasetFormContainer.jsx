/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { map, find, forEach, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Dataset, Model, ModelAttribute, Datasource } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import DatasetSelectors from './../model/DatasetSelectors'
import DatasetActions from './../model/DatasetActions'
import DatasetFormComponent from '../components/DatasetFormComponent'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'
import DatasourceSelectors from './../model/DatasourceSelectors'
import DatasourceActions from './../model/DatasourceActions'


/**
 * Show the dataset form
 */
export class DatasetFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasetId: React.PropTypes.string,
      datasourceId: React.PropTypes.string,
    }),
    // from redux-form
    unregisterField: React.PropTypes.func,
    // from mapStateToProps
    currentDataset: Dataset,
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    isFetchingDataset: React.PropTypes.bool,
    modelList: React.PropTypes.objectOf(Model),
    currentDatasource: Datasource,
    isFetchingModelAttribute: React.PropTypes.bool,
    isFetchingModel: React.PropTypes.bool,
    isFetchingDatasource: React.PropTypes.bool,
    // from mapDispatchToProps
    createDataset: React.PropTypes.func,
    updateDataset: React.PropTypes.func,
    fetchDataset: React.PropTypes.func,
    fetchModelList: React.PropTypes.func,
    fetchModelAttributeList: React.PropTypes.func,
    fetchDatasource: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.datasourceId !== undefined,
      isEditing: props.params.datasetId !== undefined,
    }
  }

  componentDidMount() {
    this.props.fetchModelList()
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchDataset(this.props.params.datasetId))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            // We extract the dataset id from the action
            const dataset = this.extractDatasetFromActionResult(actionResult)
            this.props.fetchModelAttributeList(dataset.model.id)
          }
        })
    } else {
      this.props.fetchDatasource(this.props.params.datasourceId)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    if (this.state.isCreating === false) {
      return `/admin/${project}/data/dataset/list`
    }
    return `/admin/${project}/data/dataset/create/datasource`
  }

  redirectToLinksPage = (datasetId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/${datasetId}/links`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    const model = this.props.modelList[values.model].content
    const attributes = this.extractAttributesFromValues(values)
    const updatedDataset = Object.assign({}, {
      id: this.props.currentDataset.content.id,
      tags: this.props.currentDataset.content.tags,
      type: this.props.currentDataset.content.type,
      datasource: this.props.currentDataset.content.datasource,
    }, {
      label: values.label,
      model,
      attributes,
    })
    Promise.resolve(this.props.updateDataset(this.props.currentDataset.content.id, updatedDataset))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLinksPage(this.props.params.datasetId)
        }
      })
  }

  /**
   * Retrieve model attributes values from form values
   * and returns the value of dataset "attributes" sendeable to the API
   * @param values
   * @returns {{}}
   */
  extractAttributesFromValues = (values) => {
    const result = {}
    map(values.attributes, (attrValue, attrName) => {
      const modelAttr = find(this.props.modelAttributeList, modelAttribute => modelAttribute.content.attribute.name === attrName)
      const fragment = modelAttr.content.attribute.fragment
      if (fragment.id !== 1) {
        if (!result[fragment.name]) {
          result[fragment.name] = {}
        }
        result[fragment.name][attrName] = attrValue
      } else {
        result[attrName] = attrValue
      }
    })
    return result
  }

  extractDatasetFromActionResult = actionResult => actionResult.payload.entities.datasets[keys(actionResult.payload.entities.datasets)[0]].content

  /**
   * Handle form submission on creation
   * Create a new dataset
   * @param values
   */
  handleCreate = (values) => {
    const model = this.props.modelList[values.model].content
    const datasource = this.props.currentDatasource.content
    const attributes = this.extractAttributesFromValues(values)
    const newDataset = {
      label: values.label,
      model,
      attributes,
      datasource,
      type: 'DATASET',
      tags: [],
    }
    Promise.resolve(this.props.createDataset(newDataset))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the dataset id from the action
          const dataset = this.extractDatasetFromActionResult(actionResult)
          this.redirectToLinksPage(dataset.id)
        }
      })
  }

  /**
   * Used when the user change the value of the model selected
   * In charge to fetch new list of model attributes
   * @param modelId
   */
  handleUpdateModel = (modelId) => {
    // Remove any value defined in the current form if modelAttributeList existed
    forEach(this.props.modelAttributeList, (modelAttribute) => {
      this.props.unregisterField('dataset-form', `attributes.${modelAttribute.content.attribute.name}`)
    })
    this.props.fetchModelAttributeList(modelId)
  }

  render() {
    const { isFetchingDataset, currentDataset, modelList, modelAttributeList, currentDatasource, isFetchingModel, isFetchingModelAttribute, isFetchingDatasource } = this.props
    const { isEditing, isCreating } = this.state
    const isLoading = (isEditing && ((isFetchingDataset || currentDataset === undefined) || (isFetchingModelAttribute && Object.keys(modelAttributeList).length === 0))) || isFetchingModel || (isCreating && (isFetchingDatasource || currentDatasource === undefined))
    console.log(isLoading, isFetchingDataset, currentDataset === undefined)
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetFormComponent
            modelList={modelList}
            modelAttributeList={modelAttributeList}
            currentDataset={currentDataset}
            currentDatasource={currentDatasource}
            onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
            handleUpdateModel={this.handleUpdateModel}
            backUrl={this.getBackUrl()}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  currentDataset: ownProps.params.datasetId ? DatasetSelectors.getById(state, ownProps.params.datasetId) : null,
  isFetchingDataset: DatasetSelectors.isFetching(state),
  modelAttributeList: ModelAttributeSelectors.getList(state),
  modelList: ModelSelectors.getList(state),
  currentDatasource: ownProps.params.datasourceId ? DatasourceSelectors.getById(state, ownProps.params.datasourceId) : null,
  isFetchingModel: ModelSelectors.isFetching(state),
  isFetchingModelAttribute: ModelAttributeSelectors.isFetching(state),
  isFetchingDatasource: DatasourceSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDataset: id => dispatch(DatasetActions.fetchEntity(id)),
  createDataset: values => dispatch(DatasetActions.createEntity(values)),
  updateDataset: (id, values) => dispatch(DatasetActions.updateEntity(id, values)),
  fetchModelList: () => dispatch(ModelActions.fetchEntityList({ type: 'DATASET' })),
  fetchModelAttributeList: id => dispatch(ModelAttributeActions.fetchEntityList({ id })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
  fetchDatasource: id => dispatch(DatasourceActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormContainer)
