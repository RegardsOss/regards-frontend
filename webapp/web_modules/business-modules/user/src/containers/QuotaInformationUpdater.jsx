/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import root from 'window-or-global'
import { connect } from '@regardsoss/redux'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { AccessShapes } from '@regardsoss/shape'
import { quotaInformationActions, quotaInformationSelectors } from '../clients/QuotaInformationClient'
import { currentQuotaInformationActions } from '../clients/CurrentQuotaInformationClient'

/**
 * Quota information update: it listens to the currently logged user and:
 * - publishes reset (no quota nor rate) when user logs out / token expires
 * - refreshes information and publishes it when user is logged
 * @author Raphaël Mechali
 */
export class QuotaInformationUpdater extends React.Component {
  static propTypes = {
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    lastFetchedQuota: AccessShapes.QuotaInformation,
    authentication: AuthenticateShape,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchQuotaInformation: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    publishQuotaInformation: PropTypes.func.isRequired,
  }

  /** quota info refresh delay in ms */
  static REFRESH_DELAY = 1500

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
      lastFetchedQuota: quotaInformationSelectors.getResult(state),
    }
  }

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapDispatchToProps(dispatch) {
    return {
      fetchQuotaInformation: () => dispatch(quotaInformationActions.getQuotaInformation()),
      publishQuotaInformation: (currentQuota, maxQuota, currentRate, rateLimit) => dispatch(
        currentQuotaInformationActions.setQuotaInformation(currentQuota, maxQuota, currentRate, rateLimit)),
    }
  }

  /**
   * Retrieves interesting data in authentication data
   * @param {*} authentication data, optional, matching AuthenticationShape
   */
  static getAuthData(authentication) {
    return {
      authenticated: !!get(authentication, 'result.sub'),
      sessionLocked: get(authentication, 'sessionLocked', false),
    }
  }

  /** Current updating timer */
  currentTimeout = null

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /** Lifecycle method: component will unmount */
  componentWillUnmount() {
    this.onStopUpdateLoop()
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // Based on case detection, implement the following reaction:
    // (1) - Authentication state changed: start/restart recursive update loop (passing through (3) after fist fetch) or dispose previous control loop
    // (2) - Fetch back: If session is not locked and same user is still logged, publish fetched quota info and start next updater
    const {
      authentication, lastFetchedQuota, publishQuotaInformation, fetchQuotaInformation,
    } = newProps
    const oldAuthData = QuotaInformationUpdater.getAuthData(oldProps.authentication)
    const { authenticated, sessionLocked } = QuotaInformationUpdater.getAuthData(authentication)
    // (1) - log change
    if ((oldAuthData.authenticated !== authenticated)
      || oldAuthData.sessionLocked !== sessionLocked) {
      this.onAuthenticationUpdated(authenticated, sessionLocked, publishQuotaInformation, fetchQuotaInformation)
    }
    // (2) - Fetch performed (check, due to asynchronous operation that user is still logged in and session is not locked)
    if (!isEqual(oldProps.lastFetchedQuota, lastFetchedQuota) && authenticated && !sessionLocked) {
      publishQuotaInformation(
        lastFetchedQuota.currentQuota,
        lastFetchedQuota.maxQuota,
        lastFetchedQuota.currentRate,
        lastFetchedQuota.rateLimit)
    }
  }

  /**
   * Authentication state updated : Setups the update process for current authentication state (or dispose current one)
   * @param {boolean} authenticated is user authenticated?
   * @param {boolean} sessionLocked is session locked?
   * @param {Function} publishQuotaInformation callback to publish quota information
   * @param {Function} fetchQuotaInformation callback to fetch quota information
   */
  onAuthenticationUpdated = (authenticated, sessionLocked, publishQuotaInformation, fetchQuotaInformation) => {
    // Case A - User logs out or its session is locked
    if (!authenticated || sessionLocked) {
      publishQuotaInformation(0, 0, 0, 0) // A.1: no quota nor rate left for non authenticated user (or session locked users)
      this.onStopUpdateLoop() // A.2: stop current control loop
    } else { // Case B - the user logs in or its session is unlocked
      this.onNextUpdateLoop(fetchQuotaInformation)
    }
  }

  /**
   * Inner event: starts next update loop: fetch update then wait REFRESH_DELAY then enter next loop step
   * @param {Function} fetchQuotaInformation method to fetch quota information and then
   */
  onNextUpdateLoop = (fetchQuotaInformation) => {
    fetchQuotaInformation().then(() => {
      root.setTimeout(() => {
        // next loop when not cancelled and auth still valid
        const { authentication } = this.props
        const { authenticated, sessionLocked } = QuotaInformationUpdater.getAuthData(authentication)
        if (!sessionLocked && authenticated) {
          this.onNextUpdateLoop(fetchQuotaInformation)
        }
      }, QuotaInformationUpdater.REFRESH_DELAY)
    })
  }

  /**
   * Inner event : stop update loop
   */
  onStopUpdateLoop = () => {
    if (this.currentTimeout) {
      root.clearTimeout(this.currentTimeout)
      this.currentTimeout = null
    }
  }

  /* This container only implements a functionality, it has no render */
  render() {
    return null
  }
}
export default connect(
  QuotaInformationUpdater.mapStateToProps,
  QuotaInformationUpdater.mapDispatchToProps)(QuotaInformationUpdater)
