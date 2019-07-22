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
    // TODO 0 100 C'est pas bon DELETE ME OR USE ME
    //fetchSessions: () => dispatch(sessionsActions.fetchPagedEntityList(0, 100)),
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

  static COLUMN_ORDER_TO_QUERY = {
    ASCENDING_ORDER: 'ASC',
    DESCENDING_ORDER: 'DESC',
  }

  state = {
    columnsSorting: [],
    requestParameters: {},
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

  onStateUpdated = (stateDiff) => {
    const nextState = { ...this.state, ...stateDiff }
    nextState.requestParameters = {
      sort: nextState.columnsSorting.map(({ columnKey, order }) => `${SessionsMonitoringContainer.COLUMN_KEY_TO_QUERY[columnKey]}, ${SessionsMonitoringContainer.COLUMN_ORDER_TO_QUERY[order]}`),
    }
    this.setState(nextState)
  }

  render = () => {
    const { acknowledgeSessionState } = this.props
    const { columnsSorting, requestParameters } = this.state

    return (
      <SessionsMonitoringComponent
        onBack={this.onBack}
        onAcknowledge={acknowledgeSessionState}
        onSort={this.onSort}
        columnsSorting={columnsSorting}
        requestParameters={requestParameters}
      />
    )
  }
}

export default compose(
  connect(SessionsMonitoringContainer.mapStateToProps, SessionsMonitoringContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(SessionsMonitoringContainer)
