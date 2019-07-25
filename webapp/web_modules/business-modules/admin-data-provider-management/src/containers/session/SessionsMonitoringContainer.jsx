/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import isNil from 'lodash/isNil'
import isEqual from 'lodash/isEqual'
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { CommonDomain } from '@regardsoss/domain'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import {
  sessionsSelectors, sessionsActions, SESSION_ENDPOINT, SESSION_ENTITY_ID,
} from '../../clients/session/SessionsClient'
import { SessionsMonitoringComponent } from '../../components/session/SessionsMonitoringComponent'

import messages from '../../i18n'
import styles from '../../styles'

export class SessionsMonitoringContainer extends React.Component {
  static mapStateToProps = (state, ownProps) => ({
    //TODO A EFFACER
  })

  static mapDispatchToProps = dispatch => ({
    acknowledgeSessionState: id => dispatch(sessionsActions.updateEntity(id, null, null, null, `${SESSION_ENDPOINT}/{${SESSION_ENTITY_ID}}/acknowledge`)),
  })


  static propTypes = {
    acknowledgeSessionState: PropTypes.func.isRequired,
  }

  static COLUMN_KEY_TO_QUERY = {
    'column.name': 'name',
    'column.source': 'source',
    'column.creationDate': 'creationDate',
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
    lastSessionOnly: true,
    errorsOnly: false,
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
      requestParameters.sourceName = applyingFiltersState.source
    }
    if (applyingFiltersState.errorsOnly) {
      // TODO : Voir comment renvoyer la requête à léo
      requestParameters.filters = [`errorsOnly,${applyingFiltersState.errorsOnly}`]
    }
    console.error(requestParameters)

    return requestParameters
  }

  /**
   * Initial state
   */
  state = {
    columnsSorting: [],
    editionFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
    applyingFiltersState: SessionsMonitoringContainer.DEFAULT_FILTERS_STATE,
    requestParameters: SessionsMonitoringContainer.buildRequestParameters([], SessionsMonitoringContainer.DEFAULT_FILTERS_STATE),
    filtersEdited: false,
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  /**
   * Manage column sorting
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
   * User cb : Toggle Errors filter
   */
  onToggleErrorsOnly = () => {
    const { editionFiltersState } = this.state
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        errorsOnly: !editionFiltersState.errorsOnly,
      },
    })
  }

  /**
   * User cb : Toggle Last Session filter
   */
  onToggleLastSession = () => {
    const { editionFiltersState } = this.state
    this.onStateUpdated({
      editionFiltersState: {
        ...editionFiltersState,
        lastSessionOnly: !editionFiltersState.lastSessionOnly,
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
   * Update full state based on changes
   */
  onStateUpdated = (stateDiff) => {
    const nextState = { ...this.state, ...stateDiff }
    nextState.filtersEdited = !isEqual(nextState.applyingFiltersState, nextState.editionFiltersState)
    nextState.requestParameters = SessionsMonitoringContainer.buildRequestParameters(nextState.columnsSorting, nextState.applyingFiltersState)
    this.setState(nextState)
  }

  render = () => {
    const { acknowledgeSessionState } = this.props
    const {
      columnsSorting, requestParameters, filters, filtersEdited, editionFiltersState,
    } = this.state

    return (
      <SessionsMonitoringComponent
        onBack={this.onBack}
        onAcknowledge={acknowledgeSessionState}
        onSort={this.onSort}
        columnsSorting={columnsSorting}
        requestParameters={requestParameters}
        initialFilters={editionFiltersState}
        onApplyFilters={this.onApplyFilters}
        onClearFilters={this.onClearFilters}
        filtersEdited={filtersEdited}
        onToggleErrorsOnly={this.onToggleErrorsOnly}
        onToggleLastSession={this.onToggleLastSession}
        onChangeFrom={this.onChangeFrom}
        onChangeTo={this.onChangeTo}
      />
    )
  }
}

export default compose(
  connect(SessionsMonitoringContainer.mapStateToProps, SessionsMonitoringContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(SessionsMonitoringContainer)
