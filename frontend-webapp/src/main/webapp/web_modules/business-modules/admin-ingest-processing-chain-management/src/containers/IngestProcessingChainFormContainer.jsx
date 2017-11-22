import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { IngestShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { processingChainActions, processingChainSelectors } from '../clients/ProcessingChainClient'
import messages from '../i18n'
import IngestProcessingChainFormComponent from '../components/IngestProcessingChainFormComponent'

/**
 * Container to display a form to create/edit an ingest processing chain
 * @author Sébastien Binda
 */
export class IngestProcessingChainFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      chain_name: PropTypes.string,
    }),
    // from mapStateToProps
    processingChain: IngestShapes.IngestProcessingChain,
    // from mapDispatchToProps
    createChain: PropTypes.func.isRequired,
    fetchChain: PropTypes.func.isRequired,
    updateChain: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.chain_name === undefined
    this.state = {
      isCreating,
      isLoading: !isCreating,
    }
  }

  componentDidMount() {
    if (!this.state.isCreating) {
      this.props.fetchChain(this.props.params.chain_name)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/chain/list`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    Promise.resolve(this.props.updateChain(this.props.processingChain.content.name, values))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.onBack()
        }
      })
  }

  handleCreate = (values) => {
    const task = this.props.createChain(values)
    Promise.resolve(task)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.onBack()
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
    const { isCreating, isLoading } = this.state
    const chain = isCreating ? undefined : get(this.props, 'processingChain.content', undefined)
    return (
      <LoadableContentDisplayDecorator isLoading={isLoading}>
        <IngestProcessingChainFormComponent
          processingChain={chain}
          onSubmit={this.handleSubmit}
          isCreating={isCreating}
          onBack={this.onBack}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  processingChain: ownProps.params.chain_name ? processingChainSelectors.getById(state, ownProps.params.chain_name) : null,
})


const mapDispatchToProps = dispatch => ({
  createChain: values => dispatch(processingChainActions.createEntity(values)),
  updateChain: (name, values) => dispatch(processingChainActions.updateEntity(name, values)),
  fetchChain: name => dispatch(processingChainActions.fetchEntity(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withI18n(messages)(IngestProcessingChainFormContainer))
