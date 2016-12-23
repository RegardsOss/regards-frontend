import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import ModelActions from '../model/ModelActions'
import ModelFormComponent from '../components/ModelFormComponent'
import ModelSelectors from '../model/ModelSelectors'

export class ProjectFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      model_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    model: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        type: React.PropTypes.string,
      }),
    }),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createProject: React.PropTypes.func,
    fetchProject: React.PropTypes.func,
    updateProject: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.model_id !== undefined,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchModel(this.props.params.model_id)
    }
  }
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/model/list`
  }

  getFormComponent = () => {
    if (this.state.isEditing) {
      const { model, isFetching } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      if (model) {
        return (<ModelFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentModel={model}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<ModelFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }
  handleUpdate = (values) => {
    const updatedProject = Object.assign({}, this.props.model.content, {
      description: values.description,
    })
    Promise.resolve(this.props.updateModel(this.props.model.content.id, updatedProject))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createModel({
      name: values.name,
      description: values.description,
      type: values.type,
    }))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }
  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-model-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  model: ownProps.params.model_id ? ModelSelectors.getById(state, ownProps.params.model_id) : null,
  isFetching: ModelSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createModel: values => dispatch(ModelActions.createEntity(values)),
  updateModel: (id, values) => dispatch(ModelActions.updateEntity(id, values)),
  fetchModel: id => dispatch(ModelActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
