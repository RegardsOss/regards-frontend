/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { map, find, forEach, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Datasource, Model, ModelAttribute } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import DatasourceSelectors from './../model/DatasourceSelectors'
import DatasourceActions from './../model/DatasourceActions'
import DatasourceFormComponent from '../components/DatasourceFormComponent'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'


/**
 * Show the datasource form
 */
export class DatasourceFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasourceId: React.PropTypes.string,
      mode: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentDatasource: Datasource,
    isFetchingDatasource: React.PropTypes.bool,
    modelList: React.PropTypes.objectOf(Model),
    isFetchingModel: React.PropTypes.bool,
    // from mapDispatchToProps
    createDatasource: React.PropTypes.func,
    updateDatasource: React.PropTypes.func,
    fetchDatasource: React.PropTypes.func,
    fetchModelList: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.datasourceId === undefined,
      isEditing: props.params.datasourceId !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.datasourceId !== undefined && props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    this.props.fetchModelList()
    if (this.state.isCreating === false) {
      this.props.fetchDatasource(this.props.params.datasourceId)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/datasource/list`
  }

  redirectToLinksPage = (datasourceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/datasource/${datasourceId}/links`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    const model = this.props.modelList[values.model].content
    const updatedDatasource = Object.assign({}, {
      id: this.props.currentDatasource.content.id,
      type: this.props.currentDatasource.content.type,
    }, {
      label: values.label,
      model,
    })
    Promise.resolve(this.props.updateDatasource(this.props.currentDatasource.content.id, updatedDatasource))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLinksPage(this.props.params.datasourceId)
        }
      })
  }

  extractDatasourceFromActionResult = actionResult => actionResult.payload.entities.datasource[keys(actionResult.payload.entities.datasource)[0]].content

  /**
   * Handle form submission on duplication / creation
   * Create a new datasource
   * @param values
   */
  handleCreate = (values) => {
    const model = this.props.modelList[values.model].content
    const newDatasource = {
      label: values.label,
      model,
      type: 'DATASOURCE',
    }
    Promise.resolve(this.props.createDatasource(newDatasource))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the datasource id from the action
          const datasource = this.extractDatasourceFromActionResult(actionResult)
          this.redirectToLinksPage(datasource.id)
        }
      })
  }

  render() {
    const { isFetchingDatasource, currentDatasource, modelList, isFetchingModel } = this.props
    const { isEditing, isDuplicating } = this.state
    const isLoading = ((isEditing || isDuplicating) && (isFetchingDatasource || isFetchingModel)) || isFetchingModel
    return (
      <I18nProvider messageDir="modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasourceFormComponent
            modelList={modelList}
            currentDatasource={currentDatasource}
            isDuplicating={isDuplicating}
            onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
            backUrl={this.getBackUrl()}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDatasource: ownProps.params.datasourceId ? DatasourceSelectors.getById(state, ownProps.params.datasourceId) : null,
  isFetchingDatasource: DatasourceSelectors.isFetching(state),
  modelList: ModelSelectors.getList(state),
  isFetchingModel: ModelSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasource: id => dispatch(DatasourceActions.fetchEntity(id)),
  createDatasource: values => dispatch(DatasourceActions.createEntity(values)),
  updateDatasource: (id, values) => dispatch(DatasourceActions.updateEntity(id, values)),
  fetchModelList: () => dispatch(ModelActions.fetchEntityList({ type: 'OBJECT' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormContainer)
