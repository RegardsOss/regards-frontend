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
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

class SessionsMonitoringProductsStored extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    onClickRelaunchAIP: PropTypes.func.isRequired,
    onClickListAIP: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onClickRelaunchAIP = () => {
    const { entity, onClickRelaunchAIP } = this.props
    onClickRelaunchAIP(entity.content.name, entity.content.source)
  }

  onClickListAIP = () => {
    const { entity, onClickListAIP } = this.props
    onClickListAIP(entity.content.source, entity.content.name)
  }

  onClickListAIPErrorOnly = () => {
    const { entity, onClickListAIP } = this.props
    onClickListAIP(entity.content.source, entity.content.name, true)
  }

  render() {
    const {
      intl: { formatMessage, formatNumber },
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
    let aipDone
    let aipErrors
    let aipPending

    if (entity.content.lifeCycle.aip) {
      aipDone = (entity.content.lifeCycle.aip.done ? entity.content.lifeCycle.aip.done : 0)
      aipErrors = (entity.content.lifeCycle.aip.errors ? entity.content.lifeCycle.aip.errors : 0)
      aipPending = (entity.content.lifeCycle.aip.pending ? entity.content.lifeCycle.aip.pending : 0)

      const totalAIP = (aipDone + aipPending + aipErrors)

      let errorWidth = aipErrors > 0 ? Math.round(aipErrors * 100 / totalAIP) : 0
      let pendingWidth = aipPending > 0 ? Math.round(aipPending * 100 / totalAIP) : 0
      let processedWidth = aipDone > 0 ? Math.round(aipDone * 100 / totalAIP) : 0
      // If there is at least 1 error or pending, show it in the loader
      if (aipErrors > 0 && errorWidth <= 1) {
        pendingWidth -= 2
        processedWidth -= 2
        errorWidth += 4
      }
      if (aipPending > 0 && pendingWidth <= 1) {
        errorWidth -= 2
        processedWidth -= 2
        pendingWidth += 4
      }
      if (aipDone > 0 && processedWidth <= 1) {
        errorWidth -= 2
        pendingWidth -= 2
        processedWidth += 4
      }

      donePlusWidth = { ...done, width: `${processedWidth}%` }
      errorPlusWidth = { ...error, width: `${errorWidth}%` }
      pendingPlusWidth = { ...pending, width: `${pendingWidth}%` }
    }

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === 'ERROR'}
      >
        <div style={cellContainer}>
          { !entity.content.lifeCycle.aip ? (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
            -
              </div>
            </div>
          ) : (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
                <div style={barGraphContainer}>
                  <div style={donePlusWidth} title={`${aipDone} ${formatMessage({ id: 'acquisition-sessions.states.processed' })}`} />
                  <div style={errorPlusWidth} title={`${aipErrors} ${formatMessage({ id: 'acquisition-sessions.states.error' })}`} />
                  <div style={pendingPlusWidth} title={`${aipPending} ${formatMessage({ id: 'acquisition-sessions.states.pending' })}`} />
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
                  <div style={one}>{formatNumber(aipDone)}</div>
                  <div style={two}>{formatNumber(aipPending)}</div>
                  <div style={three}>{formatNumber(aipErrors)}</div>
                </div>
                <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
                  <DropDownButton
                  title={formatMessage({ id: 'acquisition-sessions.table.aip-generated' })}
                  style={menuDropDown}
                  icon={<Menu />}
                >
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.relaunch' })}
                    onClick={this.onClickRelaunchAIP}
                  />
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.list' })}
                    onClick={this.onClickListAIP}
                  />
                  <MenuItem
                    primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.list.error' })}
                    onClick={this.onClickListAIPErrorOnly}
                  />
                </DropDownButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
export default SessionsMonitoringProductsStored
