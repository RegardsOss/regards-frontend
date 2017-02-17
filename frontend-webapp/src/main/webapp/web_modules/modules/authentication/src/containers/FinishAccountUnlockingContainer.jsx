/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { FormattedMessage } from 'react-intl'
import { LoadingPaneComponent } from '@regardsoss/components'
import UnlockAccountActions from '../model/operation/UnlockAccountActions'
import UnlockAccountSelectors from '../model/operation/UnlockAccountSelectors'

/**
 * Completes unlock account when back from mail or fails if token is now invalid
 */
export class FinishAccountUnlockingContainer extends React.Component {

  static propTypes = {
    // user email
    mail: React.PropTypes.string.isRequired,
    // token to finish reset password
    token: React.PropTypes.string.isRequired,
    // done callback
    onDone: React.PropTypes.func.isRequired,
    // token expired callback
    onTokenExpired: React.PropTypes.func.isRequired,

    // from map state to props
    isFetching: React.PropTypes.bool,
    // used only in next props
    // eslint-disable-next-line
    hasError: React.PropTypes.bool,
    // from dispatch state to props
    fetchRequestAction: React.PropTypes.func,
  }

  componentDidMount = () => {
    // start fetching account unlock finish request after showing loading screen
    const { mail, token, fetchRequestAction } = this.props
    fetchRequestAction(token, mail)
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
        title={<FormattedMessage id="finish.unlock.account.title" />}
        subtitle={<FormattedMessage id="finish.unlock.account.message" />}
      />
    )
  }
}

const mapStatesToProps = (state) => {
  const error = UnlockAccountSelectors.getError(state)
  return {
    isFetching: UnlockAccountSelectors.isFetching(state),
    hasError: error && error.hasError,
  }
}


const mapDispatchToProps = dispatch => ({
  fetchRequestAction: (token, mail) => dispatch(UnlockAccountActions.sendFinishAccountUnlocking(token, mail)),
})

export default connect(mapStatesToProps, mapDispatchToProps)(FinishAccountUnlockingContainer)
