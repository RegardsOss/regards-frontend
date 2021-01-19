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
import get from 'lodash/get'
import Menu from 'mdi-material-ui/DotsVertical'
import MenuItem from 'material-ui/MenuItem'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { DropDownButton } from '@regardsoss/components'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { sessionsActions } from '../../../clients/session/SessionsClient'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * SessionsMonitoringSessionRenderer
 * @author Kevin Picart
 */
export class SessionsMonitoringSessionRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onShowAcknowledge: PropTypes.func.isRequired,
    onShowDeleteConfirm: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dependencies to send session errors ACK */
  static ACK_DEPENDENCIES = [sessionsActions.getDependency(RequestVerbEnum.PATCH)]

  /** Dependencies to delete session */
  static DELETE_DEPENDENCIES = [sessionsActions.getDependency(RequestVerbEnum.DELETE)]

  onDeleteSession = () => {
    const { entity, onShowDeleteConfirm } = this.props
    onShowDeleteConfirm(entity)
  }

  onShowAcknowledgeDialog = () => {
    const { entity, onShowAcknowledge } = this.props
    onShowAcknowledge(entity)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { sessionsStyles: { menuDropDown, gridSessionCell: { gridSessionContainer, headerSession, infosSession } } } } = this.context
    const { entity, availableDependencies } = this.props
    const state = get(entity, 'content.state', null)
    const name = get(entity, 'content.name', null)
    const deleteButtonTitle = state === AccessDomain.SESSION_STATUS_ENUM.DELETED
      ? formatMessage({ id: 'acquisition-sessions.menus.session.delete.force.button' })
      : formatMessage({ id: 'acquisition-sessions.menus.session.delete.button' })
    const error = state === AccessDomain.SESSION_STATUS_ENUM.ERROR
    const hasErrorOption = error && allMatchHateoasDisplayLogic(SessionsMonitoringSessionRenderer.ACK_DEPENDENCIES, availableDependencies)
    const hasDeleteOption = allMatchHateoasDisplayLogic(SessionsMonitoringSessionRenderer.DELETE_DEPENDENCIES, availableDependencies)
    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={error}
        isDeleted={state === AccessDomain.SESSION_STATUS_ENUM.DELETED}
      >
        <div style={gridSessionContainer}>
          <div style={headerSession}>
            {name}
          </div>
          { hasErrorOption || hasDeleteOption ? (
            <div style={infosSession}>
              <DropDownButton
                title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
                style={menuDropDown}
                icon={<Menu />}
              >
                { hasErrorOption ? (
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.states.acknowledge' })}
                    onClick={this.onShowAcknowledgeDialog}
                    value="acknowlegde"
                  />) : null}
                { hasDeleteOption ? (
                  <MenuItem
                    primaryText={deleteButtonTitle}
                    onClick={this.onDeleteSession}
                    value="onDelete"
                  />
                ) : null}
              </DropDownButton>
            </div>) : null}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
