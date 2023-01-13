/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import { connect } from '@regardsoss/redux'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import isEmpty from 'lodash/isEmpty'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { sessionsSelectors } from '../clients/SessionsClient'
import SessionsComponent from '../components/SessionsComponent'

/**
 * Sessions Container
 * @author Théo Lasserre
 */
export class SessionsContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    selectedSessionId: PropTypes.string,
    selectedSourceId: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchSelectedSession: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    sessions: AdminShapes.SessionList,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    throwError: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
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

  static mapDispatchToProps(dispatch) {
    return {
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
    }
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

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      selectedSessionId, fetchSelectedSession, throwError, sessions, selectedSourceId,
    } = newProps
    const { intl: { formatMessage } } = this.context
    if (this.doesSessionChanged(oldProps, newProps)) {
      const filteredSessions = filter(sessions, (session) => session.content.source === selectedSourceId)
      const selectedSession = find(filteredSessions, (session) => session.content.name === selectedSessionId)
      if (selectedSession) {
        fetchSelectedSession(selectedSession.content.id).then((actionResult) => {
          if (actionResult.error) {
            throwError(formatMessage({ id: 'dashboard.sessions.fetch.error' }, { selectedSessionId }))
          }
        })
      }
    }
  }

  doesSessionChanged = (oldProps, newProps) => (!isEmpty(newProps.selectedSessionId) && newProps.selectedSessionId !== oldProps.selectedSessionId) || (!isEmpty(newProps.sessions) && !isEqual(newProps.sessions, oldProps.sessions))

  render() {
    const {
      project, onSelected, filters, sessions,
      selectedSourceId, selectedSessionId,
    } = this.props
    return (
      <SessionsComponent
        project={project}
        onSelected={onSelected}
        sessions={sessions}
        filters={filters}
        selectedSourceId={selectedSourceId}
        selectedSessionId={selectedSessionId}
      />
    )
  }
}
export default connect(
  SessionsContainer.mapStateToProps, SessionsContainer.mapDispatchToProps)(SessionsContainer)
