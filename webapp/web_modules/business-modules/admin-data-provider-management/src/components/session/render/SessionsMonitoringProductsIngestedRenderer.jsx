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
            gridContainer, gridHeaderContainer, infosContainer, lineContainer, listValues, barGraphContainer, cellContainer,
            barGraph: {
              done, pending, error,
            },
            lines: {
              one, two, three,
            },
          },
        },
      },
    } = this.context
    const { entity } = this.props

    let donePlusWidth
    let errorPlusWidth
    let pendingPlusWidth
    let sipDone
    let sipErrors
    let sipPending
    let sipInvalid
    let sipRefused

    if (entity.content.lifeCycle.sip) {
      sipDone = (entity.content.lifeCycle.sip.done ? entity.content.lifeCycle.sip.done : 0)
      sipErrors = (entity.content.lifeCycle.sip.errors ? entity.content.lifeCycle.sip.errors : 0)
      sipPending = (entity.content.lifeCycle.sip.pending ? entity.content.lifeCycle.sip.pending : 0)
      sipInvalid = (entity.content.lifeCycle.sip.invalid ? entity.content.lifeCycle.sip.invalid : 0)
      sipRefused = (entity.content.lifeCycle.sip.refused ? entity.content.lifeCycle.sip.refused : 0)

      const totalSIP = (sipDone + sipPending + sipErrors)

      let errorWidth = sipErrors > 0 ? Math.round(sipErrors * 100 / totalSIP) : 0
      let pendingWidth = sipPending > 0 ? Math.round(sipPending * 100 / totalSIP) : 0
      let processedWidth = sipDone > 0 ? Math.round(sipDone * 100 / totalSIP) : 0
      // If there is at least 1 error or pending, show it in the loader
      if (sipErrors > 0 && errorWidth <= 1) {
        pendingWidth -= 2
        processedWidth -= 2
        errorWidth += 4
      }
      if (sipPending > 0 && pendingWidth <= 1) {
        errorWidth -= 2
        processedWidth -= 2
        pendingWidth += 4
      }
      if (sipDone > 0 && processedWidth <= 1) {
        errorWidth -= 2
        pendingWidth -= 2
        processedWidth += 4
      }

      donePlusWidth = { ...done, width: `${processedWidth}%` }
      errorPlusWidth = { ...error, width: `${errorWidth}%` }
      pendingPlusWidth = { ...pending, width: `${pendingWidth}%` }
    }

    return (
      <div style={cellContainer}>
        { !entity.content.lifeCycle.sip ? (
          <div style={gridContainer}>
            <div style={gridHeaderContainer}>
              -
            </div>
          </div>
        ) : (
          <div style={gridContainer}>
            <div style={gridHeaderContainer}>
              <div style={barGraphContainer}>
                <div style={donePlusWidth} title={`${sipDone} ${formatMessage({ id: 'acquisition-sessions.states.stored' })}`} />
                <div style={errorPlusWidth} title={`${sipErrors} ${formatMessage({ id: 'acquisition-sessions.states.error' })}\n${sipInvalid} ${formatMessage({ id: 'acquisition-sessions.states.invalid' })}\n${sipRefused} ${formatMessage({ id: 'acquisition-sessions.states.refused' })}`} />
                <div style={pendingPlusWidth} title={`${sipPending} ${formatMessage({ id: 'acquisition-sessions.states.pending' })}`} />
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
                <div style={one}>{formatNumber(sipDone)}</div>
                <div style={two}>{formatNumber(sipPending)}</div>
                <div style={three}>{formatNumber(sipErrors)}</div>
              </div>
              <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
                <DropDownButton
                  title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
                  style={menuDropDown}
                  icon={<Menu />}
                >
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.menus.ingested.relaunch' })}
                  />
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.menus.ingested.list' })}
                  />
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.menus.ingested.list.error' })}
                  />
                </DropDownButton>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default SessionsMonitoringProductsGenerated
