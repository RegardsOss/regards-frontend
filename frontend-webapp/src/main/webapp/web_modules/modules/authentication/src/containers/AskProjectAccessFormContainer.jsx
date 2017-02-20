/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import AskProjectAccessFormComponent, { mailFieldId } from '../components/AskProjectAccessFormComponent'

/**
 * Container for create account request forms.
 */
export class AskProjectAccessFormContainer extends React.Component {

  static propTypes = {
    // Form initial value
    initialMail: React.PropTypes.string,
    // current project (empty if admin)
    project: React.PropTypes.string.isRequired,
    // back callback
    onBack: React.PropTypes.func.isRequired,
    // done callback
    onDone: React.PropTypes.func.isRequired,

    // from map state to props
    isFetching: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    // from dispatch to props
    fetchRequestAction: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillReceiveProps = (nextProps) => {
    // TODO use it
    // Detect is last fetch  DONE and OK
    const { isFetching, onDone } = this.props
    // if (isFetching && !nextProps.hasError && !nextProps.isFetching) {
    //   onDone(this.submittedMail)
    // }
  }

  onRequestAction = (formValues) => {
    // store current mail value
    this.submittedMail = formValues[mailFieldId]
    const { fetchRequestAction } = this.props
    // TODO impl (other than mails ;)
    // fetchRequestAction(this.submittedMail)

    // TODO remove that, naturally
    this.props.onDone(this.submittedMail)
  }

  render() {
    const { project, initialMail, onBack, hasError } = this.props
    // TODO error message
    return (
      <AskProjectAccessFormComponent
        // current project (empty if admin)
        project={project}
        initialMail={initialMail}
        errorMessage={null}
        onRequestAction={this.onRequestAction}
        onBack={onBack}
      />
    )
  }
}

const mapStateToProps = state => ({
  // TODO
  isFetching: false,
  hasError: false,
})

const mapDispatchToProps = dispatch => ({
  // TODO
  fetchRequestAction: mail => console.info('Y a d\'la joie'),
})

export default connect(mapStateToProps, mapDispatchToProps)(AskProjectAccessFormContainer)

