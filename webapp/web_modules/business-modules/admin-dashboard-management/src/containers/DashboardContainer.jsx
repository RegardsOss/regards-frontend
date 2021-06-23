/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import findLastKey from 'lodash/findLastKey'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import compose from 'lodash/fp/compose'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import {
  sessionsActions, sessionsSelectors, sessionsRelaunchProductActions, sessionsRelaunchAIPActions,
  sessionDeleteActions, storagesRelaunchActions,
} from '../clients/SessionsClient'
import { sourcesActions, sourcesSelectors } from '../clients/SourcesClient'
import { selectedSessionActions, selectedSessionSelectors } from '../clients/SelectedSessionClient'
import { requestRetryActions } from '../clients/RequestRetryClient'
import DashboardComponent from '../components/DashboardComponent'
import { SOURCE_FILTER_PARAMS } from '../domain/filters'
import { CELL_TYPE_ENUM } from '../domain/cellTypes'
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
    selectedSession: AdminShapes.SessionList,
    sources: AdminShapes.SourceList,
    sessions: AdminShapes.SessionList,
    sessionsMeta: PropTypes.shape({
      number: PropTypes.number,
    }),
    sourcesMeta: PropTypes.shape({
      number: PropTypes.number,
    }),
    // from mapDispatchToProps
    fetchSessions: PropTypes.func.isRequired,
    fetchSources: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchStorages: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired, // Delete products of a session
    fetchSelectedSession: PropTypes.func.isRequired,
    flushSelectedSession: PropTypes.func.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    sessionsMeta: sessionsSelectors.getMetaData(state),
    sourcesMeta: sourcesSelectors.getMetaData(state),
    selectedSession: selectedSessionSelectors.getList(state),
    sources: sourcesSelectors.getList(state),
    session: sessionsSelectors.getList(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchSessions: (pageIndex, pageSize, pathParams, queryParams) => dispatch(sessionsActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchSources: (pageIndex, pageSize, pathParams, queryParams) => dispatch(sourcesActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchSelectedSession: (sessionId) => dispatch(selectedSessionActions.fetchEntity(sessionId)),
    flushSelectedSession: () => dispatch(selectedSessionActions.flush()),
    relaunchProducts: (source, session) => dispatch(sessionsRelaunchProductActions.relaunchProducts(source, session)),
    relaunchAIP: (source, session) => dispatch(sessionsRelaunchAIPActions.relaunchProducts(source, session)),
    relaunchStorages: (source, session) => dispatch(storagesRelaunchActions.relaunchStorages(source, session)),
    retryRequests: (payload, type) => dispatch(requestRetryActions.relaunchProducts('POST', payload, { type })),
    deleteSession: (sessionId) => dispatch(sessionDeleteActions.deleteSession(sessionId)),
  })

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    selectedSource: null,
    selectedSession: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  componentWillUnmount = () => {
    const { flushSelectedSession } = this.props
    flushSelectedSession()
  }

  /**
 * Properties change detected: update local state
 * @param oldProps previous component properties
 * @param newProps next component properties
 */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      selectedSession,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    // component mount -> reset selectedSession (do not use selectedSession of redux store in case of it was previously removed)
    if (isEmpty(oldProps)) {
      newState.selectedSession = null
    } else if (!isEqual(oldProps.selectedSession, selectedSession)) {
      newState.selectedSession = selectedSession[findLastKey(selectedSession)]
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  getPageSize = (type) => {
    const {
      sessionsMeta, sourcesMeta,
    } = this.props
    let meta
    switch (type) {
      case CELL_TYPE_ENUM.SOURCE:
        meta = sourcesMeta
        break
      case CELL_TYPE_ENUM.SESSION:
        meta = sessionsMeta
        break
      default:
        meta = sourcesMeta
    }
    const lastPage = (meta && meta.number) || 0
    return (DashboardContainer.PAGE_SIZE) * (lastPage + 1)
  }

  /**
   * Refresh session table, source table and selected session
   * @param {*} sourceFilters
   * @param {*} sessionFilters
   */
  onRefresh = (sourceFilters, sessionFilters) => {
    const {
      fetchSessions, fetchSources, fetchSelectedSession,
    } = this.props
    const {
      selectedSession, selectedSource,
    } = this.state
    const fetchPageSessionsSize = this.getPageSize(CELL_TYPE_ENUM.SESSION)
    const fetchPageSourcesSize = this.getPageSize(CELL_TYPE_ENUM.SOURCE)
    fetchSessions(0, fetchPageSessionsSize, {}, { ...sessionFilters, [SOURCE_FILTER_PARAMS.NAME]: selectedSource ? selectedSource.content.name : null })
    fetchSources(0, fetchPageSourcesSize, {}, { ...sourceFilters })
    if (selectedSession) {
      fetchSelectedSession(selectedSession.content.id)
    }
  }

  onDeleteSession = (sessionId, sourceFilters, sessionFilters) => {
    const { deleteSession } = this.props
    deleteSession(sessionId).then((actionResult) => {
      if (!actionResult.error) {
        this.onRefresh(sourceFilters, sessionFilters)
        this.setState({
          selectedSession: null,
        })
      }
    })
  }

  /**
   * Fetch sessions from source name and sessions filters
   * @param {*} source
   * @param {*} sessionFilters
   */
  fetchSessions = (source, sessionFilters) => {
    const { fetchSessions } = this.props
    const fetchPageSessionsSize = this.getPageSize(CELL_TYPE_ENUM.SESSION)
    fetchSessions(0, fetchPageSessionsSize, {}, { ...sessionFilters, [SOURCE_FILTER_PARAMS.NAME]: source ? source.content.name : null })
    this.setState({
      selectedSource: source,
    })
  }

  /**
   * Fetch a session thanks to its id
   * @param {*} sessionId
   */
  fetchSelectedSession = (session) => {
    const { fetchSelectedSession } = this.props
    if (session) {
      fetchSelectedSession(session.content.id)
    }
    this.setState({
      selectedSession: session,
    })
  }

  render() {
    const {
      params: { project }, relaunchProducts, relaunchAIP, retryRequests, flushSelectedSession,
      sources, sessions, relaunchStorages,
    } = this.props
    const {
      selectedSource, selectedSession,
    } = this.state
    return (
      <DashboardComponent
        project={project}
        relaunchProducts={relaunchProducts}
        relaunchAIP={relaunchAIP}
        retryRequests={retryRequests}
        fetchSessions={this.fetchSessions}
        fetchSelectedSession={this.fetchSelectedSession}
        deleteSession={this.onDeleteSession}
        selectedSession={selectedSession}
        selectedSource={selectedSource}
        relaunchStorages={relaunchStorages}
        getBackURL={this.getBackURL}
        onRefresh={this.onRefresh}
        onFlushSelectedSession={flushSelectedSession}
        sources={sources}
        sessions={sessions}
      />
    )
  }
}

export default compose(
  connect(DashboardContainer.mapStateToProps, DashboardContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DashboardContainer)
