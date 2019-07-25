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
import React from 'react'
import OkIcon from 'material-ui/svg-icons/action/done'
import AcknowledgedIcon from 'material-ui/svg-icons/action/check-circle'
import DeletedIcon from 'material-ui/svg-icons/action/delete-forever'
import ErrorIcon from 'material-ui/svg-icons/alert/error'

import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AccessDomain } from '@regardsoss/domain'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringStateRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    onShowAcknowledge: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Icon constructor by session status */
  static STATUS_ICON_CONSTRUCTOR = {
    [AccessDomain.SESSION_STATUS_ENUM.OK]: OkIcon,
    [AccessDomain.SESSION_STATUS_ENUM.ERROR]: ErrorIcon,
    [AccessDomain.SESSION_STATUS_ENUM.ACKNOWLEDGED]: OkIcon,
    [AccessDomain.SESSION_STATUS_ENUM.DELETED]: DeletedIcon,
  }

  onShowAcknowledgeDialog = () => {
    const { entity, onShowAcknowledge } = this.props
    onShowAcknowledge(entity)
  }

  render() {
    const {
      intl: { formatMessage },
      muiTheme,
      moduleTheme: {
        sessionsStyles: {
          iconColor,
          gridSessionCell: {
            gridSessionContainer, headerSession, buttonStateContainer, buttonState,
          },
        },
      },
    } = this.context
    const { entity } = this.props

    const IconConstructor = SessionsMonitoringStateRenderer.STATUS_ICON_CONSTRUCTOR[entity.content.state]

    return (
      <div style={gridSessionContainer}>
        <div style={headerSession} title={entity.content.state}>
          <IconConstructor color={iconColor[entity.content.state]} />
        </div>
        <div style={buttonStateContainer}>
          { entity.content.state === 'ERROR' ? (
            <button type="button" style={buttonState} onClick={this.onShowAcknowledgeDialog} title={formatMessage({ id: 'acquisition-sessions.states.acknowledge' })}><AcknowledgedIcon color={iconColor.ACKNOWLEDGED} /></button>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}
