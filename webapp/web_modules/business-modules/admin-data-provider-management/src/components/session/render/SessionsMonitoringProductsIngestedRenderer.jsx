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

/**
 * Comment Here
 * @author Kevin Picart
 */
import Menu from 'material-ui/svg-icons/navigation/more-vert'
import { MenuItem } from 'material-ui'
import { DropDownButton } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

class SessionsMonitoringProductsGenerated extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  render() {
    const {
      intl: { formatMessage, formatNumber },
      muiTheme,
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineContainer, listValues, barGraphContainer,
            barGraph: {
              done, pending, error,
            },
            acquiredProductState: {
              runningIconColor,
              running,
            },
            lines: {
              one, two, three,
            },
          },
        },
      },
    } = this.context
    const { entity } = this.props

    const totalSIP = (entity.content.lifeCycle.sip.done + entity.content.lifeCycle.sip.pending + entity.content.lifeCycle.sip.errors)

    let errorWidth = entity.content.lifeCycle.sip.errors > 0 ? Math.round(entity.content.lifeCycle.sip.errors * 100 / totalSIP) : 0
    let pendingWidth = entity.content.lifeCycle.sip.pending > 0 ? Math.round(entity.content.lifeCycle.sip.pending * 100 / totalSIP) : 0
    let processedWidth = Math.round(entity.content.lifeCycle.sip.done * 100 / totalSIP)
    // If there is at least 1 error or pending, show it in the loader
    if (errorWidth >= 0 && errorWidth <= 1) {
      processedWidth -= 2
      errorWidth += 2
    }
    if (pendingWidth >= 0 && pendingWidth <= 1) {
      processedWidth -= 2
      pendingWidth += 2
    }

    const donePlusWidth = { ...done, width: `${processedWidth}%` }
    const errorPlusWidth = { ...error, width: `${errorWidth}%` }
    const pendingPlusWidth = { ...pending, width: `${pendingWidth}%` }

    return (
      <div style={gridContainer}>
        <div style={gridHeaderContainer}>
          <div style={barGraphContainer}>
            <div style={donePlusWidth} title={`${entity.content.lifeCycle.sip.done} ${formatMessage({ id: 'acquisition-sessions.states.stored' })}`} />
            <div style={errorPlusWidth} title={`${entity.content.lifeCycle.sip.errors} ${formatMessage({ id: 'acquisition-sessions.states.error' })}\n${entity.content.lifeCycle.sip.invalid} ${formatMessage({ id: 'acquisition-sessions.states.invalid' })}\n${entity.content.lifeCycle.sip.refused} ${formatMessage({ id: 'acquisition-sessions.states.refused' })}`} />
            <div style={pendingPlusWidth} title={`${entity.content.lifeCycle.sip.pending} ${formatMessage({ id: 'acquisition-sessions.states.pending' })}`} />
          </div>
        </div>
        <div style={infosContainer}>
          <div style={lineContainer}>
            <div style={one}>
              {formatMessage({ id: 'acquisition-sessions.states.processed' })}
              :
            </div>
            <div style={two}>
              {formatMessage({ id: 'acquisition-sessions.states.pending' })}
              :
            </div>
            <div style={three}>
              {formatMessage({ id: 'acquisition-sessions.states.error' })}
              :
            </div>
          </div>
          <div style={listValues}>
            <div style={one}>{formatNumber(entity.content.lifeCycle.sip.done)}</div>
            <div style={two}>{formatNumber(entity.content.lifeCycle.sip.pending)}</div>
            <div style={three}>{formatNumber(entity.content.lifeCycle.sip.errors)}</div>
          </div>
          <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
            <DropDownButton
              title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
              style={menuDropDown}
              icon={<Menu />}
            >
              <MenuItem
                primaryText="Relancer traitement SIPs en erreur"
              />
              <MenuItem
                primaryText="Lister les SIPs"
              />
              <MenuItem
                primaryText="Lister les SIPs en erreur"
              />
            </DropDownButton>
          </div>
        </div>
      </div>
    )
  }
}
export default SessionsMonitoringProductsGenerated
