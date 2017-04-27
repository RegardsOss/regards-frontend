import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Model } from '@regardsoss/model'
import { modelActions, modelSelectors } from '../client/ModelClient'
import ModelListComponent from '../components/ModelListComponent'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class ProjectListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    modelList: React.PropTypes.objectOf(Model),
    // from mapDispatchToProps
    fetchModelList: React.PropTypes.func,
    deleteModel: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchModelList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/model/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleEdit = (modelId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/model/${modelId}`
    browserHistory.push(url)
  }

  handleBindAttributes = (modelId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/model-attribute/${modelId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(projectName) => {
    this.props.deleteModel(projectName)
  }

  render() {
    const { modelList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-model-management/src/i18n">
        <ModelListComponent
          modelList={modelList}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleBindAttributes={this.handleBindAttributes}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  modelList: modelSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(modelActions.fetchEntityList()),
  deleteModel: id => dispatch(modelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

