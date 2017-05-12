/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { FormattedMessage } from 'react-intl'
import { LoadingPaneComponent } from '@regardsoss/components'
import ValidateAccountActions from '../model/creation/ValidateAccountActions'
import ValidateAccountSelectors from '../model/creation/ValidateAccountSelectors'

/**
 * Completes unlock account when back from mail or fails if token is now invalid
 */
export class FinishAccountValidationContainer extends React.Component {

  static propTypes = {
    // token to finish reset password
    token: PropTypes.string.isRequired,
    // done callback
    onDone: PropTypes.func.isRequired,
    // token expired callback
    onTokenExpired: PropTypes.func.isRequired,

    // from map state to props
    isFetching: PropTypes.bool,
    // used only in next props
    // eslint-disable-next-line
    hasError: PropTypes.bool,
    // from dispatch state to props
    fetchRequestAction: PropTypes.func,
  }

  componentDidMount = () => {
    // start fetching account unlock finish request after showing loading screen
    const { token, fetchRequestAction } = this.props
    fetchRequestAction(token)
  }

  componentWillReceiveProps = (nextProps) => {
    // Detect last fetch finished
    const { isFetching, onDone, onTokenExpired } = this.props
    if (isFetching && !nextProps.isFetching) {
      // redirection: error pane or OK pane?
      if (nextProps.hasError) {
        onTokenExpired()
      } else {
        onDone()
      }
    }
  }

  render() {
    return (
      <LoadingPaneComponent
        title={<FormattedMessage id="new.acount.validating.title" />}
        subtitle={<FormattedMessage id="new.acount.validating.message" />}
      />
    )
  }
}

const mapStatesToProps = (state) => {
  const error = ValidateAccountSelectors.getError(state)
  return {
    isFetching: ValidateAccountSelectors.isFetching(state),
    hasError: error && error.hasError,
  }
}


const mapDispatchToProps = dispatch => ({
  fetchRequestAction: token => dispatch(ValidateAccountActions.sendValidationRequest(token)),
})

export default connect(mapStatesToProps, mapDispatchToProps)(FinishAccountValidationContainer)
