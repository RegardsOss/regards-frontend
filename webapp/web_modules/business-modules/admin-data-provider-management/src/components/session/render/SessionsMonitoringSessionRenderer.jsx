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
import get from 'lodash/get'
import Menu from 'material-ui/svg-icons/navigation/more-vert'
import { MenuItem } from 'material-ui'
import { DropDownButton } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * SessionsMonitoringSessionRenderer
 * @author Kevin Picart
 */
export class SessionsMonitoringSessionRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    onShowAcknowledge: PropTypes.func.isRequired,
    onShowDeleteConfirm: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

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
    const { entity } = this.props
    const state = get(entity, 'content.state', null)
    const name = get(entity, 'content.name', null)
    const deleteButtonTitle = state === 'DELETED'
      ? formatMessage({ id: 'acquisition-sessions.menus.session.delete.force.button' })
      : formatMessage({ id: 'acquisition-sessions.menus.session.delete.button' })
    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={state === 'ERROR'}
        isDeleted={state === 'DELETED'}
      >
        <div style={gridSessionContainer}>
          <div style={headerSession}>
            {name}
          </div>
          <div style={infosSession}>
            <DropDownButton
              title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
              style={menuDropDown}
              icon={<Menu />}
            >
              { state === 'ERROR' ? (
                <MenuItem
                  primaryText={formatMessage({ id: 'acquisition-sessions.states.acknowledge' })}
                  onClick={this.onShowAcknowledgeDialog}
                />) : (
                  <div />
              )}
              <MenuItem
                primaryText={deleteButtonTitle}
                onClick={this.onDeleteSession}
              />
            </DropDownButton>
          </div>
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
