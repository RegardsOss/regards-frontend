import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import ProcessingChainListComponent from '../components/IngestProcessingChainListComponent'
import messages from '../i18n'

export class IngestProcessingChainListContainer extends React.Component {
  render() {
    return <ProcessingChainListComponent />
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withI18n(messages)(IngestProcessingChainListContainer))
