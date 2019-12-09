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
import get from 'lodash/get'
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
    onRelaunchProductsOAIS: PropTypes.func.isRequired,
    onViewProductsOAIS: PropTypes.func.isRequired,
    onViewRequestsOAIS: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onClickRelaunch = () => {
    const { entity, onRelaunchProductsOAIS } = this.props
    onRelaunchProductsOAIS(entity.content.name, entity.content.source)
  }

  onClickListAIP = () => {
    const { entity, onViewProductsOAIS } = this.props
    onViewProductsOAIS(entity.content.source, entity.content.name)
  }

  onClickListRequestErrors = () => {
    const { entity, onViewRequestsOAIS } = this.props
    onViewRequestsOAIS(entity.content.source, entity.content.name, true)
  }

  getStored = (entity) => {
    const stored = get(entity, 'content.lifeCycle.oais.products_stored', 0)
    return parseInt(stored, 10)
  }

  getStoragePending = (entity) => {
    const pending = get(entity, 'content.lifeCycle.oais.products_store_pending', 0)
    return parseInt(pending, 10)
  }

  getGenerating = (entity) => {
    const pending = get(entity, 'content.lifeCycle.oais.products_gen_pending', 0)
    return parseInt(pending, 10)
  }

  getErrors = (entity) => {
    const errorSip = get(entity, 'content.lifeCycle.oais.products_gen_error', 0)
    const errorAip = get(entity, 'content.lifeCycle.oais.products_store_error', 0)
    return parseInt(errorSip, 10) + parseInt(errorAip, 10)
  }

  getTotal = (entity) => {
    const stored = get(entity, 'content.lifeCycle.oais.products', 0)
    return parseInt(stored, 10)
  }

  render() {
    const {
      intl: { formatMessage, formatNumber },
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineFourContainer, listFourValues, barGraphContainer, cellContainer,
            barGraph: {
              done, pending, error,
            },
            lines: {
              one, two, three, four,
            },
          },
        },
      },
    } = this.context
    const { entity } = this.props

    let donePlusWidth
    let errorPlusWidth
    let pendingPlusWidth
    const stored = this.getStored(entity)
    const storagePending = this.getStoragePending(entity)
    const generating = this.getGenerating(entity)
    const pendings = storagePending + generating
    const errors = this.getErrors(entity)
    const total = this.getTotal(entity)

    if (entity.content.lifeCycle.oais) {
      const errorWidth = errors > 0 ? Math.round(errors * 100 / total) : 0
      const pendingWidth = pendings > 0 ? Math.round(pendings * 100 / total) : 0
      const storedWidth = stored > 0 ? Math.round(stored * 100 / total) : 0

      donePlusWidth = { ...done, width: `${storedWidth}%` }
      errorPlusWidth = { ...error, width: `${errorWidth}%` }
      pendingPlusWidth = { ...pending, width: `${pendingWidth}%` }
    }

    const items = []
    if (storagePending + stored > 0) {
      items.push(<MenuItem
        key="listaips"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.list' })}
        onClick={this.onClickListAIP}
        value="listaips"
      />)
    }
    if (errors > 0) {
      items.push(<MenuItem
        key="listerrors"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.list.error' })}
        onClick={this.onClickListRequestErrors}
        value="listerrors"
      />)
      items.push(<MenuItem
        key="relauncherrors"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.relaunch' })}
        onClick={this.onClickRelaunch}
        value="relauncherrors"
      />)
    }

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === 'ERROR'}
        isDeleted={entity.content.state === 'DELETED'}
      >
        <div style={cellContainer}>
          { !entity.content.lifeCycle.oais ? (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
            -
              </div>
            </div>
          ) : (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
                <div style={barGraphContainer}>
                  <div style={donePlusWidth} title={`${stored} ${formatMessage({ id: 'acquisition-sessions.states.stored' })}`} />
                  <div style={errorPlusWidth} title={`${errors} ${formatMessage({ id: 'acquisition-sessions.states.error' })}`} />
                  <div style={pendingPlusWidth} title={`${pendings} ${formatMessage({ id: 'acquisition-sessions.states.pending' })}`} />
                </div>
              </div>
              <div style={infosContainer}>
                <div style={lineFourContainer}>
                  <div style={one}>
                    {formatMessage({ id: 'acquisition-sessions.states.stored' })}
                  :
                  </div>
                  <div style={two}>
                    {formatMessage({ id: 'acquisition-sessions.states.generating' })}
                  :
                  </div>
                  <div style={three}>
                    {formatMessage({ id: 'acquisition-sessions.states.storing' })}
                  :
                  </div>
                  <div style={four}>
                    {formatMessage({ id: 'acquisition-sessions.states.error' })}
                  :
                  </div>
                </div>
                <div style={listFourValues}>
                  <div style={one}>{formatNumber(stored)}</div>
                  <div style={two}>{formatNumber(generating)}</div>
                  <div style={three}>{formatNumber(storagePending)}</div>
                  <div style={four}>{formatNumber(errors)}</div>
                </div>
                {items.length > 0
                  ? <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
                    <DropDownButton
                      title={formatMessage({ id: 'acquisition-sessions.menus.archives' })}
                      style={menuDropDown}
                      icon={<Menu />}
                    >
                      {items}
                    </DropDownButton>
                  </div> : null }
              </div>
            </div>
          )}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
export default SessionsMonitoringProductsStored
