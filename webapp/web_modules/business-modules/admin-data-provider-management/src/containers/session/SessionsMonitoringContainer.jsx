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

import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { CommonDomain } from '@regardsoss/domain'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import {
  sessionsActions, SESSION_ENDPOINT, SESSION_ENTITY_ID, sessionsRelaunchProductActions, sessionsRelaunchSIPActions, sessionsRelaunchAIPActions,
} from '../../clients/session/SessionsClient'
import { SessionsMonitoringComponent } from '../../components/session/SessionsMonitoringComponent'
import messages from '../../i18n'
import styles from '../../styles'

export class SessionsMonitoringContainer extends React.Component {
  static mapDispatchToProps = dispatch => ({
    deleteSession: (id, force = false) => dispatch(sessionsActions.fetchPagedEntityList(0, null, { force })),
    relaunchProducts: (source, name) => dispatch(sessionsRelaunchProductActions.relaunchProducts(source, name)),
    relaunchAIP: (source, name) => dispatch(sessionsRelaunchAIPActions.relaunchProducts(source, name)),
    relaunchSIP: (source, name) => dispatch(sessionsRelaunchSIPActions.relaunchProducts(source, name)),
    acknowledgeSessionState: (id, body, endpoint, verb) => dispatch(sessionsActions.updateEntity(id, body, null, null, endpoint, verb)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    deleteSession: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    relaunchSIP: PropTypes.func.isRequired,
    acknowledgeSessionState: PropTypes.func.isRequired,
  }

  /**
   * Convert column id to query corresponding names
   */
  static COLUMN_KEY_TO_QUERY = {
    'column.name': 'name',
    'column.source': 'source',
    'column.creationDate': 'creationDate',
    'column.lastUpdateDate': 'lastUpdateDate',
    'column.state': 'state',
  }

  /**
   * Convert column order to request parameters value
   */
  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    source: '',
    session: '',
    lastSessionOnly: false,
    errorsOnly: true,
    from: null,
    to: null,
  }

  /**
   * Converts columns order and filters state into request parameters
   * @param {[{columnKey: string, order: string}]} columnsSorting columns sorting definition, where order is a
   * @param {*} applyingFiltersState filters state from component state
   * @returns {*} requestParameters as an object compound of string and string arrays
   */
  static buildRequestParameters(columnsSorting, applyingFiltersState) {
    const requestParameters = {
      sort: columnsSorting.map(({ columnKey, order }) => `${SessionsMonitoringContainer.COLUMN_KEY_TO_QUERY[columnKey]},${SessionsMonitoringContainer.COLUMN_ORDER_TO_QUERY[order]}`),
    }
    if (applyingFiltersState.source) {
      requestParameters.source = [applyingFiltersState.source]
    }
    if (applyingFiltersState.session) {
      requestParameters.name = [applyingFiltersState.session]
    }
    if (applyingFiltersState.errorsOnly) {
      requestParameters.state = ['ERROR']
    }
    if (applyingFiltersState.lastSessionOnly) {
      requestParameters.onlyLastSession = [true]
    }
    if (applyingFiltersState.from) {
      const dateFrom = new Date(applyingFiltersState.from)
      requestParameters.from = [dateFrom.toISOString()]
    }
    if (applyingFiltersState.to) {
      const dateTo = new Date(applyingFiltersState.to)
      requestParameters.to = [dateTo.toISOString()]
    }

    return requestParameters
  }

  /**
   * Initial state
   */
  state = {
    columnsSorting: [],
    initialFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
    editionFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
    applyingFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
    requestParameters: SessionsMonitoringContainer.buildRequestParameters([], SessionsMonitoringContainer.DEFAULT_FILTERS_STATE),
    filtersEdited: false,
    canEmptyFilters: false,
    /** columns visibility map (no assertion on child columns keys) */
    columnsVisibility: {}, // note: empty by default, when column isn't found it should be considered visible
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({
        initialFiltersState: query,
        editionFiltersState: query,
        applyingFiltersState: query,
      })
    }
  }

  /**
   * User cb: On acknowledge
   */
  acknowledgeSessionState = (id) => {
    const { acknowledgeSessionState } = this.props
    acknowledgeSessionState(id, { state: 'ACKNOWLEDGED' }, `${SESSION_ENDPOINT}/{${SESSION_ENTITY_ID}}`, 'PATCH')
  }

  /**
   * User cb: Delete products
   * @param {sessionId} Session Id
   * @param {force} Choose whether to use force delete or not
   */
  onDeleteProducts = (sessionId, force = false) => {
    const { deleteSession } = this.props
    deleteSession(sessionId.toString(), force)
  }

  /**
   * User cb: Redirect to Indexed List
   */
  onClickListIndexed = (source, session) => {
    const { params: { project } } = this.props
    const urlParams = {
      source,
      session,
    }
    const queryString = Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
    const url = `/admin/${project}/data/acquisition/oais/aip/list?${queryString}`
    browserHistory.push(url)
  }

  /**
   * User cb: Redirect to Indexed List
   */
  onClickListAIP = (source, session, error = false) => {
    const { params: { project } } = this.props
    const urlParams = {
      source,
      session,
    }
    if (error) {
      urlParams.state = 'STORAGE_ERROR'
    }
    const queryString = Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
    const url = `/admin/${project}/data/acquisition/oais/aip/list?${queryString}`
    browserHistory.push(url)
  }

  /**
   * User cb: Redirect to Indexed List
   */
  onClickListSIP = (source, session, error = false) => {
    const { params: { project } } = this.props
    const urlParams = {
      source,
      session,
    }
    if (error) {
      urlParams.state = 'STORE_ERROR,AIP_GEN_ERROR'
    }
    const queryString = Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
    const url = `/admin/${project}/data/acquisition/oais/sip/list?${queryString}`
    browserHistory.push(url)
  }

  /**
   * User cb: Relaunch Errored AIP
   */
  onClickRelaunchAIP = (source, name) => {
    const { relaunchAIP } = this.props
    relaunchAIP(source, name)
  }

  /**
   * User cb: Relaunch Errored SIP
   */
  onClickRelaunchSIP = (source, name) => {
    const { relaunchSIP } = this.props
    relaunchSIP(source, name)
  }

  /**
   * User cb: Relaunch Errored Products
   */
  onClickRelaunchProducts = (source, name) => {
    const { relaunchProducts } = this.props
    relaunchProducts(source, name)
  }

  /**
   * User cb: Back to board
   */
  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  /**
   * User cb: Manage column sorting
   */
  onSort = (columnKey, order) => {
    const { columnsSorting } = this.state
    const newOrder = columnsSorting
    const columnIndex = newOrder.findIndex(columnArray => columnArray.columnKey === columnKey)
    if (order === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
      newOrder.splice(columnIndex, 1)
    } else if (columnIndex === -1) {
      newOrder.push({ columnKey, order })
    } else {
      newOrder.splice(columnIndex, 1)
      newOrder.push({ columnKey, order })
    }
    this.onStateUpdated({ columnsSorting: newOrder })
  }

  /**
   * User cb: Change source filter
   */
  onChangeSource = (newSource) => {
    const { editionFiltersState } = this.state

    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        source: newSource,
      },
    })
  }

  /**
   * User cb: Change session filter
   */
  onChangeSession = (newSession) => {
    const { editionFiltersState } = this.state
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        session: newSession,
      },
    })
  }

  /**
   * User cb: Toggle Errors filter
   */
  onToggleErrorsOnly = () => {
    const { editionFiltersState } = this.state
    const newFilters = {}
    if (editionFiltersState.errorsOnly === false) {
      // We toggle Error Only. Both filters cannot be true together
      newFilters.lastSessionOnly = false
    }
    newFilters.errorsOnly = !editionFiltersState.errorsOnly
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        ...newFilters,
      },
    })
  }

  /**
   * User cb : Toggle Last Session filter
   */
  onToggleLastSession = () => {
    const { editionFiltersState } = this.state
    const newFilters = {}
    if (editionFiltersState.lastSessionOnly === false) {
      // We toggle Error Only. Both filters cannot be true together
      newFilters.errorsOnly = false
    }
    newFilters.lastSessionOnly = !editionFiltersState.lastSessionOnly
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        ...newFilters,
      },
    })
  }

  /**
   * User cb: Change Date From
   */
  onChangeFrom = (newDate) => {
    const { editionFiltersState } = this.state
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        from: newDate,
      },
    })
  }

  /**
   * User cb: Change Date To
   */
  onChangeTo = (newDate) => {
    const { editionFiltersState } = this.state
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        to: newDate,
      },
    })
  }

  /**
   * User callback: Apply edited filters to current request
   */
  onApplyFilters = () => {
    const { editionFiltersState } = this.state
    this.onStateUpdated({ applyingFiltersState: editionFiltersState })
  }

  /**
   * User callback: Reset filter to default
   */
  onClearFilters = () => this.onStateUpdated({
    applyingFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
    editionFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
  })

  /**
   * User cb: Columns visibility selector
   */
  onChangeColumnsVisibility = (updatedColumns) => {
    this.setState({
      // map: associate each column key with its visible stae
      columnsVisibility: updatedColumns.reduce((acc, { key, visible }) => ({
        ...acc,
        [key]: visible,
      }), {}),
    })
  }

  /**
   * Update full state based on changes
   */
  onStateUpdated = (stateDiff) => {
    const nextState = { ...this.state, ...stateDiff }
    nextState.filtersEdited = !isEqual(nextState.applyingFiltersState, nextState.editionFiltersState)
    nextState.canEmptyFilters = !isEqual(nextState.editionFiltersState, nextState.initialFiltersState)
    nextState.requestParameters = SessionsMonitoringContainer.buildRequestParameters(nextState.columnsSorting, nextState.applyingFiltersState)
    this.setState(nextState)
  }

  render = () => {
    const {
      columnsSorting, requestParameters, filtersEdited, canEmptyFilters, editionFiltersState, columnsVisibility,
    } = this.state

    return (
      <SessionsMonitoringComponent
        onBack={this.onBack}
        onAcknowledge={this.acknowledgeSessionState}
        onSort={this.onSort}
        columnsSorting={columnsSorting}
        columnsVisibility={columnsVisibility}
        requestParameters={requestParameters}
        initialFilters={editionFiltersState}
        filtersEdited={filtersEdited}
        canEmptyFilters={canEmptyFilters}
        onApplyFilters={this.onApplyFilters}
        onClearFilters={this.onClearFilters}
        onChangeSource={this.onChangeSource}
        onChangeSession={this.onChangeSession}
        onToggleErrorsOnly={this.onToggleErrorsOnly}
        onToggleLastSession={this.onToggleLastSession}
        onChangeFrom={this.onChangeFrom}
        onChangeTo={this.onChangeTo}
        onChangeColumnsVisibility={this.onChangeColumnsVisibility}
        onDeleteProducts={this.onDeleteProducts}
        onClickListIndexed={this.onClickListIndexed}
        onClickListAIP={this.onClickListAIP}
        onClickListSIP={this.onClickListSIP}
        onClickRelaunchAIP={this.onClickRelaunchAIP}
        onClickRelaunchSIP={this.onClickRelaunchSIP}
        onClickRelaunchProducts={this.onClickRelaunchProducts}
      />
    )
  }
}

export default compose(
  connect(SessionsMonitoringContainer.mapStateToProps, SessionsMonitoringContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(SessionsMonitoringContainer)
