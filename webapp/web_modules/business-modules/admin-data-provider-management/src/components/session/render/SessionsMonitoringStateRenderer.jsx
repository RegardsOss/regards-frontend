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
import React from 'react'
import OkIcon from 'mdi-material-ui/Check'
import DeletedIcon from 'mdi-material-ui/DeleteForever'
import ErrorIcon from 'mdi-material-ui/AlertCircle'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AccessDomain } from '@regardsoss/domain'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringStateRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
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

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        sessionsStyles: {
          iconColor,
          gridSessionCell: {
            gridSessionContainer, headerSession,
          },
        },
      },
    } = this.context
    const { entity } = this.props

    const IconConstructor = SessionsMonitoringStateRenderer.STATUS_ICON_CONSTRUCTOR[entity.content.state]

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.ERROR}
        isDeleted={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.DELETED}
      >
        <div style={gridSessionContainer}>
          <div style={headerSession} title={formatMessage({ id: `acquisition-sessions.state.${entity.content.state}` })}>
            <IconConstructor color={iconColor[entity.content.state]} />
          </div>
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
