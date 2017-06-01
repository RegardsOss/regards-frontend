import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Model } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { modelActions, modelSelectors } from '../clients/ModelClient'
import ModelFormComponent from '../components/ModelFormComponent'

export class ProjectFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      model_id: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    model: Model,
    // from mapDispatchToProps
    createModel: PropTypes.func,
    fetchModel: PropTypes.func,
    updateModel: PropTypes.func,
    duplicateModel: PropTypes.func,
    createModelUsingFile: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.model_id === undefined
    this.state = {
      isCreating,
      isLoading: !isCreating,
      isEditing: props.params.mode === 'edit',
      isDuplicating: props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    if (!this.state.isCreating) {
      this.props.fetchModel(this.props.params.model_id)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/model/list`
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
    let task
    if (values.file) {
      task = this.props.createModelUsingFile({
        file: values.file,
      })
    } else {
      task = this.props.createModel({
        name: values.name,
        description: values.description,
        type: values.type,
      })
    }
    Promise.resolve(task)
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleDuplicate = (values) => {
    const { model } = this.props
    Promise.resolve(this.props.duplicateModel(model.content.id, {
      type: model.content.type,
      name: values.name,
      description: values.description,
    }))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleSubmit = (values) => {
    const { isCreating, isEditing } = this.state
    if (isCreating) {
      return this.handleCreate(values)
    }
    if (isEditing) {
      return this.handleUpdate(values)
    }
    return this.handleDuplicate(values)
  }

  render() {
    const { isCreating, isEditing, isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-model-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          <ModelFormComponent
            onSubmit={this.handleSubmit}
            backUrl={this.getBackUrl()}
            isEditing={isEditing}
            isCreating={isCreating}
            currentModel={this.props.model}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  model: ownProps.params.model_id ? modelSelectors.getById(state, ownProps.params.model_id) : null,
})

const mapDispatchToProps = dispatch => ({
  createModel: values => dispatch(modelActions.createEntity(values)),
  updateModel: (id, values) => dispatch(modelActions.updateEntity(id, values)),
  duplicateModel: (modelId, values) => dispatch(modelActions.duplicateModel(modelId, values)),
  createModelUsingFile: file => dispatch(modelActions.createEntityUsingMultiPart({}, file)),
  fetchModel: id => dispatch(modelActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
