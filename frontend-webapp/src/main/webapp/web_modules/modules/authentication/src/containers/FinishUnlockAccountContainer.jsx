/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { FormattedMessage } from 'react-intl'
import { LoadingPaneComponent } from '@regardsoss/components'
import UnlockAccountActions from '../model/UnlockAccountActions'
import UnlockAccountSelectors from '../model/UnlockAccountSelectors'

/**
 * Completes unlock account when back from mail or fails if token is now invalid
 */
export class FinishUnlockAccountContainer extends React.Component {

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
    hasError: React.PropTypes.bool,
    // from dispatch state to props
    fetchRequestAction: React.PropTypes.func,
  }

  onComponentDidMount() {
    // start fetching account unlock finish request after showing loading screen
    const { mail, token, fetchRequestAction } = this.props
    fetchRequestAction(mail, token)
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
  fetchRequestAction: (token, mail) => dispatch(UnlockAccountActions.sendFinishUnlockAccount(token, mail)),
})

export default connect(mapStatesToProps, mapDispatchToProps)(FinishUnlockAccountContainer)
