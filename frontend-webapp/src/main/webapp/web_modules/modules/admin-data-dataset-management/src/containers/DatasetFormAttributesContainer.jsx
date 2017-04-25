/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find, forEach, has } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Dataset, Model, ModelAttribute, Datasource } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import DatasetFormAttributesComponent from '../components/DatasetFormAttributesComponent'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributesActions from '../model/ModelAttributesActions'
import ModelAttributesSelectors from '../model/ModelAttributesSelectors'
import DatasourceSelectors from './../model/DatasourceSelectors'
import DatasourceActions from './../model/DatasourceActions'


/**
 * Show the dataset form
 */
export class DatasetFormAttributesContainer extends React.Component {

  static propTypes = {
    currentDataset: Dataset,
    currentDatasourceId: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    handleSave: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
    // from redux-form
    unregisterField: React.PropTypes.func,
    // from mapStateToProps
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    modelList: React.PropTypes.objectOf(Model),
    currentDatasource: Datasource,
    // from mapDispatchToProps
    fetchModelList: React.PropTypes.func,
    fetchModelAttributeList: React.PropTypes.func,
    fetchDatasource: React.PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchModelList(),
      this.props.fetchDatasource(this.props.currentDatasourceId),
    ]
    if (has(this.props.currentDataset, 'content.model.id')) {
      tasks.push(this.props.fetchModelAttributeList(this.props.currentDataset.content.model.id))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onSubmit = (values) => {
    const datasourceObjectModelId = this.props.currentDatasource.content.mapping.model
    const attributes = this.extractAttributesFromValues(values)
    this.props.handleSave(values.label, values.model, attributes, datasourceObjectModelId, values.descriptionFileContent, values.descriptionUrl)
  }

  /**
   * Retrieve model attributes values from form values
   * and returns the value of collection "attributes" sendeable to the API
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


  /**
   * Used when the user change the value of the model selected
   * In charge to fetch new list of model attributes
   * @param modelId
   */
  handleUpdateModel = (modelId) => {
    // Remove any value defined in the current form if modelAttributeList existed
    forEach(this.props.modelAttributeList, (modelAttribute) => {
      this.props.unregisterField('dataset-attributes-form', `attributes.${modelAttribute.content.attribute.name}`)
    })
    this.props.fetchModelAttributeList(modelId)
  }

  render() {
    const { backUrl, currentDataset, modelList, modelAttributeList, currentDatasource, isEditing } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetFormAttributesComponent
            modelList={modelList}
            modelAttributeList={modelAttributeList}
            currentDataset={currentDataset}
            currentDatasource={currentDatasource}
            onSubmit={this.onSubmit}
            handleUpdateModel={this.handleUpdateModel}
            backUrl={backUrl}
            isEditing={isEditing}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  modelAttributeList: ModelAttributesSelectors.getList(state),
  modelList: ModelSelectors.getList(state),
  currentDatasource: DatasourceSelectors.getById(state, ownProps.currentDatasourceId),
})

const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(ModelActions.fetchEntityList({}, { type: 'DATASET' })),
  fetchModelAttributeList: id => dispatch(ModelAttributesActions.fetchEntityList({ id })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
  fetchDatasource: id => dispatch(DatasourceActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormAttributesContainer)
