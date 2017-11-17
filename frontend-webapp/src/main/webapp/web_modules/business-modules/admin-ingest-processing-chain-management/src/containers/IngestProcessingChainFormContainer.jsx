import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { IngestShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ProcessingChainActions, ProcessingChainSelectors } from '../clients/ProcessingChainClient'
import messages from '../i18n'
import IngestProcessingChainFormComponent from '../components/IngestProcessingChainFormComponent'

export class IngestProcessingChainFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      chain_id: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    processingChain: IngestShapes.IngestProcessingChain,
    // from mapDispatchToProps
    createChain: PropTypes.func.isRequired,
    fetchModel: PropTypes.func.isRequired,
    updateChain: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.chain_id === undefined
    this.state = {
      isCreating,
      isLoading: !isCreating,
      isEditing: props.params.mode === 'edit',
    }
  }

  componentDidMount() {
    if (!this.state.isCreating) {
      this.props.fetchModel(this.props.params.chain_id)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/chain/list`
  }

  handleUpdate = (values) => {
    Promise.resolve(this.props.updateChain(this.props.processingChain.id, values))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleCreate = (values) => {
    const task = this.props.createChain(values)
    Promise.resolve(task)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleSubmit = (values) => {
    const { isCreating } = this.state
    if (isCreating) {
      return this.handleCreate(values)
    }
    return this.handleUpdate(values)
  }

  render() {
    const { isCreating, isEditing, isLoading } = this.state
    const onSubmit = isCreating ? this.props.createChain : this.props.updateChain
    return (
      <LoadableContentDisplayDecorator isLoading={isLoading}>
        <IngestProcessingChainFormComponent
          processingChain={isCreating ? undefined : this.props.processingChain}
          onSubmit={onSubmit}
          isCreating={isCreating}
          isEditing={isEditing}
          backUrl={this.getBackUrl()}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  processingChain: ownProps.params.chain_id ? ProcessingChainSelectors.getById(state, ownProps.params.chain_id) : null,
})

const mapDispatchToProps = dispatch => ({
  createChain: values => dispatch(ProcessingChainActions.createEntity(values)),
  updateChain: (id, values) => dispatch(ProcessingChainActions.updateEntity(id, values)),
  fetchChain: id => dispatch(ProcessingChainActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withI18n(messages)(IngestProcessingChainFormContainer))
