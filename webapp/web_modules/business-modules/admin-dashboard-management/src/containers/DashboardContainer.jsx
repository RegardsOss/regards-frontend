/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { AdminShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import compose from 'lodash/fp/compose'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { AdminDomain } from '@regardsoss/domain'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import {
  sessionsActions, sessionsRelaunchProductActions, sessionsRelaunchAIPActions,
  storagesRelaunchActions, requestRetryActions,
} from '../clients/SessionsClient'
import { selectedSessionActions, selectedSessionSelectors } from '../clients/SelectedSessionClient'
import { sourcesActions } from '../clients/SourcesClient'
import { requestSignalsActions } from '../clients/WorkerRequestSignalsClient'
import DashboardComponent from '../components/DashboardComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * DashboardContainer
 * @author Théo Lasserre
 */
export class DashboardContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    selectedSession: AdminShapes.Session,
    // from mapDispatchToProps
    fetchSessions: PropTypes.func.isRequired,
    fetchSources: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchStorages: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
    fetchSelectedSession: PropTypes.func.isRequired,
    flushSelectedSession: PropTypes.func.isRequired,
    retryWorkerRequests: PropTypes.func.isRequired,
    displayMessage: PropTypes.func.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      selectedSession: selectedSessionSelectors.getSession(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchSessions: (pageIndex, pageSize, pathParams, queryParams) => dispatch(sessionsActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchSources: (pageIndex, pageSize, pathParams, queryParams) => dispatch(sourcesActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchSelectedSession: (sessionId) => dispatch(selectedSessionActions.fetchSession(sessionId)),
    flushSelectedSession: () => dispatch(selectedSessionActions.flush()),
    relaunchProducts: (payload) => dispatch(sessionsRelaunchProductActions.relaunchProducts(payload.source, payload.session)),
    relaunchAIP: (payload) => dispatch(sessionsRelaunchAIPActions.relaunchProducts(payload)),
    relaunchStorages: (payload) => dispatch(storagesRelaunchActions.relaunchStorages(payload.source, payload.session)),
    retryFEMRequests: (payload, type) => dispatch(requestRetryActions.sendSignal('POST', payload, { type })),
    retryWorkerRequests: (payload) => dispatch(requestSignalsActions.retry(payload)),
    displayMessage: (message) => dispatch(ApplicationErrorAction.throwError(message)),
  })

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentWillUnmount() {
    const { flushSelectedSession } = this.props
    flushSelectedSession()
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
   * Refresh session table, source table and selected session
   * @param {*} sourceFilters
   * @param {*} sessionFilters
   */
  onRefresh = (sourceFilters, sessionFilters, selectedSourceId) => {
    const {
      fetchSessions, fetchSources, fetchSelectedSession, params: { project }, selectedSession,
    } = this.props
    fetchSessions(0, DashboardContainer.PAGE_SIZE, {}, { ...sessionFilters, [AdminDomain.SOURCE_FILTER_PARAMS.NAME]: selectedSourceId || null, tenant: project })
    fetchSources(0, DashboardContainer.PAGE_SIZE, {}, { ...sourceFilters, tenant: project })
    const selectedSessionId = get(selectedSession, 'content.id', null)
    if (selectedSessionId) {
      fetchSelectedSession(selectedSessionId)
    }
  }

  dispatchAction = (dispatchFunc, payload, reqType = undefined) => {
    const { displayMessage } = this.props
    const { intl: { formatMessage } } = this.context
    dispatchFunc(payload, reqType).then((actionResult) => {
      if (!actionResult.error) {
        displayMessage(formatMessage({ id: 'dashboard.selectedsession.dialog.confirm.action.message' }))
      }
    })
  }

  onRelaunchProducts = (payload) => {
    const { relaunchProducts } = this.props
    this.dispatchAction(relaunchProducts, payload)
  }

  onRelaunchAIP = (payload) => {
    const { relaunchAIP } = this.props
    this.dispatchAction(relaunchAIP, payload)
  }

  onRelaunchStorages = (payload) => {
    const { relaunchStorages } = this.props
    this.dispatchAction(relaunchStorages, payload)
  }

  onRetryFEMRequests = (payload, reqType) => {
    const { retryFEMRequests } = this.props
    this.dispatchAction(retryFEMRequests, payload, reqType)
  }

  onRetryWorkerRequests = (payload) => {
    const { retryWorkerRequests } = this.props
    this.dispatchAction(retryWorkerRequests, payload)
  }

  render() {
    const {
      params: { project }, fetchSelectedSession, flushSelectedSession,
    } = this.props
    return (
      <DashboardComponent
        project={project}
        relaunchProducts={this.onRelaunchProducts}
        relaunchAIP={this.onRelaunchAIP}
        relaunchStorages={this.onRelaunchStorages}
        getBackURL={this.getBackURL}
        onRefresh={this.onRefresh}
        retryFEMRequests={this.onRetryFEMRequests}
        fetchSelectedSession={fetchSelectedSession}
        flushSelectedSession={flushSelectedSession}
        retryWorkerRequests={this.onRetryWorkerRequests}
      />
    )
  }
}

export default compose(
  connect(DashboardContainer.mapStateToProps, DashboardContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DashboardContainer)
