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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

class SessionsMonitoringProductsStored extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      intl: { formatMessage, formatNumber },
      muiTheme,
      moduleTheme: {
        sessionsStyles: {
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

    const totalAIP = (entity.content.lifeCycle.aip.done + entity.content.lifeCycle.aip.pending + entity.content.lifeCycle.aip.errors)

    let errorWidth = entity.content.lifeCycle.aip.errors > 0 ? Math.round(entity.content.lifeCycle.aip.errors * 100 / totalAIP) : 0
    let pendingWidth = entity.content.lifeCycle.aip.pending > 0 ? Math.round(entity.content.lifeCycle.aip.pending * 100 / totalAIP) : 0
    let processedWidth = Math.round(entity.content.lifeCycle.aip.done * 100 / totalAIP)
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
            <div style={donePlusWidth} title={`${entity.content.lifeCycle.aip.done} ${formatMessage({ id: 'acquisition-sessions.states.processed' })}`} />
            <div style={errorPlusWidth} title={`${entity.content.lifeCycle.aip.errors} ${formatMessage({ id: 'acquisition-sessions.states.error' })}`} />
            <div style={pendingPlusWidth} title={`${entity.content.lifeCycle.aip.pending} ${formatMessage({ id: 'acquisition-sessions.states.pending' })}`} />
          </div>
        </div>
        <div style={infosContainer}>
          <div style={lineContainer}>
            <div style={one}>
              {formatMessage({ id: 'acquisition-sessions.states.stored' })}
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
            <div style={one}>{formatNumber(entity.content.lifeCycle.aip.done)}</div>
            <div style={two}>{formatNumber(entity.content.lifeCycle.aip.pending)}</div>
            <div style={three}>{formatNumber(entity.content.lifeCycle.aip.errors)}</div>
          </div>
          <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
            <Menu />
          </div>
        </div>
      </div>
    )
  }
}
export default SessionsMonitoringProductsStored
