import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { Model } from '@regardsoss/model'
import { modelActions, modelSelectors } from '../client/ModelClient'
import ModelFormComponent from '../components/ModelFormComponent'

export class ProjectFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      model_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    model: Model,
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createModel: React.PropTypes.func,
    fetchModel: React.PropTypes.func,
    updateModel: React.PropTypes.func,
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
  model: ownProps.params.model_id ? modelSelectors.getById(state, ownProps.params.model_id) : null,
  isFetching: modelSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createModel: values => dispatch(modelActions.createEntity(values)),
  updateModel: (id, values) => dispatch(modelActions.updateEntity(id, values)),
  fetchModel: id => dispatch(modelActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
