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
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import {
 sessionsSelectors, sessionsActions, SESSION_ENDPOINT, SESSION_ENTITY_ID 
} from '../../clients/session/SessionsClient'
import { SessionsMonitoringComponent } from '../../components/session/SessionsMonitoringComponent'

import messages from '../../i18n'
import styles from '../../styles'

export class SessionsMonitoringContainer extends React.Component {
  static mapStateToProps = (state, ownProps) => ({
  })

  static mapDispatchToProps = dispatch => ({
    fetchSessions: () => dispatch(sessionsActions.fetchPagedEntityList(0, 100)),
    acknowledgeSessionState: id => dispatch(sessionsActions.updateEntity(id, null, null, null, `${SESSION_ENDPOINT}/{${SESSION_ENTITY_ID}}/acknowledge`)),
  })

  static propTypes = {
    fetchSessions: PropTypes.func.isRequired,
    acknowledgeSessionState: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.props.fetchSessions()
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  render = () => (
    <SessionsMonitoringComponent
      onBack={this.onBack}
      onAcknowledge={this.props.acknowledgeSessionState}
    />
  )
}

export default compose(
  connect(SessionsMonitoringContainer.mapStateToProps, SessionsMonitoringContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(SessionsMonitoringContainer)
