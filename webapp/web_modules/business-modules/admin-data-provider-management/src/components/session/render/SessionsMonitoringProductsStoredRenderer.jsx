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
import MenuItem from 'material-ui/MenuItem'
import RunningIcon from 'material-ui/svg-icons/av/play-arrow'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { IngestClient } from '@regardsoss/client'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton } from '@regardsoss/components'
import { sessionsRelaunchAIPActions } from '../../../clients/session/SessionsClient'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'


class SessionsMonitoringProductsStoredRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRelaunchProductsOAIS: PropTypes.func.isRequired,
    onViewProductsOAIS: PropTypes.func.isRequired,
    onViewRequestsOAIS: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dependencies for relaunch action */
  static RELAUNCH_DEPENCIES = [sessionsRelaunchAIPActions.getDependency(RequestVerbEnum.POST)]

  /** Depencies for AIP list displaying */
  static AIP_LIST_DEPENDENCIES = [new IngestClient.AIPActions('any').getDependency(RequestVerbEnum.POST)]

  /** Depencies for AIP list displaying */
  static REQUEST_LIST_DEPENDENCIES = [new IngestClient.RequestActions('any').getDependency(RequestVerbEnum.POST)]

  onClickRelaunch = () => {
    const { entity, onRelaunchProductsOAIS } = this.props
    onRelaunchProductsOAIS(entity.content.source, entity.content.name)
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
    const errorMetaAip = get(entity, 'content.lifeCycle.oais.products_meta_store_error', 0)
    return parseInt(errorSip, 10) + parseInt(errorAip, 10) + parseInt(errorMetaAip, 10)
  }

  renderRunning = (storagePending, generating) => {
    if (storagePending > 0 || generating > 0) {
      const {
        intl: { formatMessage },
        moduleTheme: {
          sessionsStyles: {
            gridCell: {
              acquiredProductState: {
                runningContainer,
                runningIconColor,
                running,
              },
            },
          },
        },
      } = this.context
      return (
        <div style={runningContainer}>
          <RunningIcon color={runningIconColor} />
          <div style={running}>
            {formatMessage({ id: 'acquisition-sessions.states.running' })}
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const {
      intl: { formatMessage, formatNumber },
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineFourContainer, listFourValues, cellContainer,
            lines: {
              one, two, three, four,
            },
          },
        },
      },
    } = this.context
    const { entity, availableDependencies } = this.props

    const generating = this.getGenerating(entity)
    const stored = this.getStored(entity)
    const storagePending = this.getStoragePending(entity)
    const errors = this.getErrors(entity)


    const items = []
    if (errors > 0) {
      if (allMatchHateoasDisplayLogic(SessionsMonitoringProductsStoredRenderer.RELAUNCH_DEPENCIES, availableDependencies)) {
        items.push(<MenuItem
          key="relauncherrors"
          primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.relaunch' })}
          onClick={this.onClickRelaunch}
          value="relauncherrors"
        />)
      }
      if (allMatchHateoasDisplayLogic(SessionsMonitoringProductsStoredRenderer.REQUEST_LIST_DEPENDENCIES, availableDependencies)) {
        items.push(<MenuItem
          key="listerrors"
          primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.list.error' })}
          onClick={this.onClickListRequestErrors}
          value="listerrors"
        />)
      }
    }
    if (storagePending + stored > 0
      && allMatchHateoasDisplayLogic(SessionsMonitoringProductsStoredRenderer.AIP_LIST_DEPENDENCIES, availableDependencies)) {
      items.push(<MenuItem
        key="listaips"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.archives.list' })}
        onClick={this.onClickListAIP}
        value="listaips"
      />)
    }

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.ERROR}
        isDeleted={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.DELETED}
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
                {this.renderRunning(storagePending, generating)}
              </div>
              <div style={infosContainer}>
                <div style={lineFourContainer}>
                  <div style={one}>
                    {formatMessage({ id: 'acquisition-sessions.states.storing' })}
                  :
                  </div>
                  <div style={two}>
                    {formatMessage({ id: 'acquisition-sessions.states.stored' })}
                  :
                  </div>
                  <div style={three} />
                  <div style={four}>
                    {formatMessage({ id: 'acquisition-sessions.states.error' })}
                  :
                  </div>
                </div>
                <div style={listFourValues}>
                  <div style={one}>{formatNumber(storagePending)}</div>
                  <div style={two}>{formatNumber(stored)}</div>
                  <div style={three} />
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
export default SessionsMonitoringProductsStoredRenderer
