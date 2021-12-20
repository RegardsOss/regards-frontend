/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import compose from 'lodash/fp/compose'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import {
  sessionsActions, sessionsRelaunchProductActions, sessionsRelaunchAIPActions,
  sessionDeleteActions, storagesRelaunchActions, requestRetryActions,
  sessionsSelectors,
} from '../clients/SessionsClient'
import { selectedSessionActions } from '../clients/SelectedSessionClient'
import { sourcesActions } from '../clients/SourcesClient'
import { requestSignalsActions } from '../clients/WorkerRequestSignalsClient'
import DashboardComponent from '../components/DashboardComponent'
import { SOURCE_FILTER_PARAMS } from '../domain/filters'
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
    sessions: AdminShapes.SessionList,
    // from mapDispatchToProps
    fetchSessions: PropTypes.func.isRequired,
    fetchSources: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchStorages: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired, // Delete products of a session
    retryFEMRequests: PropTypes.func.isRequired,
    fetchSelectedSession: PropTypes.func.isRequired,
    flushSelectedSession: PropTypes.func.isRequired,
    retryWorkerRequests: PropTypes.func.isRequired,
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
      sessions: sessionsSelectors.getList(state),
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
    relaunchProducts: (source, session) => dispatch(sessionsRelaunchProductActions.relaunchProducts(source, session)),
    relaunchAIP: (source, session) => dispatch(sessionsRelaunchAIPActions.relaunchProducts(source, session)),
    relaunchStorages: (source, session) => dispatch(storagesRelaunchActions.relaunchStorages(source, session)),
    deleteSession: (sessionId) => dispatch(sessionDeleteActions.deleteSession(sessionId)),
    retryFEMRequests: (payload, type) => dispatch(requestRetryActions.sendSignal('POST', payload, { type })),
    retryWorkerRequests: (payload) => dispatch(requestSignalsActions.retry(payload)),
  })

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentWillUnmount = () => {
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
  onRefresh = (sourceFilters, sessionFilters, selectedSourceId, selectedSessionId) => {
    const {
      fetchSessions, fetchSources,
    } = this.props
    fetchSessions(0, DashboardContainer.PAGE_SIZE, {}, { ...sessionFilters, [SOURCE_FILTER_PARAMS.NAME]: selectedSourceId || null })
    fetchSources(0, DashboardContainer.PAGE_SIZE, {}, { ...sourceFilters })
  }

  onDeleteSession = (sessionId) => {
    const { deleteSession } = this.props
    deleteSession(sessionId)
  }

  render() {
    const {
      params: { project }, relaunchProducts, relaunchAIP, retryWorkerRequests,
      relaunchStorages, retryFEMRequests, fetchSelectedSession, flushSelectedSession,
    } = this.props
    return (
      <DashboardComponent
        project={project}
        relaunchProducts={relaunchProducts}
        relaunchAIP={relaunchAIP}
        deleteSession={this.onDeleteSession}
        relaunchStorages={relaunchStorages}
        getBackURL={this.getBackURL}
        onRefresh={this.onRefresh}
        retryFEMRequests={retryFEMRequests}
        fetchSelectedSession={fetchSelectedSession}
        flushSelectedSession={flushSelectedSession}
        retryWorkerRequests={retryWorkerRequests}
      />
    )
  }
}

export default compose(
  connect(null, DashboardContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DashboardContainer)
