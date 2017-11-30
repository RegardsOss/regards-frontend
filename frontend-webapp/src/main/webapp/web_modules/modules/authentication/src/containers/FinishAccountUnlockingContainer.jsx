/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { LoadingPaneComponent } from '@regardsoss/components'
import UnlockAccountActions from '../model/operation/UnlockAccountActions'
import UnlockAccountSelectors from '../model/operation/UnlockAccountSelectors'

/**
 * Completes unlock account when back from mail or fails if token is now invalid
 */
export class FinishAccountUnlockingContainer extends React.Component {
  static propTypes = {
    // user email
    mail: PropTypes.string.isRequired,
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
    fetchRequestAction: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
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
        title={this.context.intl.formatMessage({ id: 'finish.unlock.account.title' })}
        subtitle={this.context.intl.formatMessage({ id: 'finish.unlock.account.message' })}
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
