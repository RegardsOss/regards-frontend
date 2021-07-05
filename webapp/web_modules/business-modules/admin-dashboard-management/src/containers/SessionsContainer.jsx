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
import { connect } from '@regardsoss/redux'
import values from 'lodash/values'
import { AdminShapes } from '@regardsoss/shape'
import { sessionsSelectors } from '../clients/SessionsClient'
import SessionsComponent from '../components/SessionsComponent'
import { SESSION_FILTER_PARAMS } from '../domain/filters'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class SessionsContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSession: AdminShapes.Session,
    onSelected: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    selectedSource: AdminShapes.Source,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    sessions: AdminShapes.SessionList,
  }

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

  static extractFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    urlFilters[SESSION_FILTER_PARAMS.NAME] = SessionsComponent.DEFAULT_FILTERS_STATE[SESSION_FILTER_PARAMS.NAME]
    urlFilters[SESSION_FILTER_PARAMS.STATUS] = SessionsComponent.DEFAULT_FILTERS_STATE[SESSION_FILTER_PARAMS.STATUS]
    if (values(query).length > 0) {
      const {
        sessionName, sessionState,
      } = query
      if (sessionName) {
        urlFilters[SESSION_FILTER_PARAMS.NAME] = sessionName
      }
      if (sessionState) {
        urlFilters[SESSION_FILTER_PARAMS.STATUS] = sessionState
      }
    }
    return urlFilters
  }

  render() {
    const {
      project, onSelected, selectedSession, onApplyFilters, selectedSource, filters, sessions,
    } = this.props
    return (
      <SessionsComponent
        project={project}
        onSelected={onSelected}
        selectedSession={selectedSession}
        onApplyFilters={onApplyFilters}
        sessions={sessions}
        selectedSource={selectedSource}
        filters={filters}
      />
    )
  }
}
export default connect(
  SessionsContainer.mapStateToProps, null)(SessionsContainer)
