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
import Menu from 'mdi-material-ui/DotsVertical'
import RunningIcon from 'mdi-material-ui/Play'
import MenuItem from 'material-ui/MenuItem'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { DropDownButton } from '@regardsoss/components'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'
import { sessionsRelaunchProductActions } from '../../../clients/session/SessionsClient'

class SessionsMonitoringProductsGeneratedRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRelaunchProducts: PropTypes.func.isRequired,
    onShowProducts: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dependencies for relaunch action */
  static RELAUNCH_DEPENCIES = [sessionsRelaunchProductActions.getDependency(RequestVerbEnum.GET)]

  onClickRelaunchProducts = () => {
    const { entity, onRelaunchProducts } = this.props
    onRelaunchProducts(entity.content.source, entity.content.name)
  }

  getFilesAcquired = (entity) => {
    const { intl: { formatNumber } } = this.context
    const acquired = get(entity, 'content.lifeCycle.dataprovider.files_acquired', 0)
    return formatNumber(parseInt(acquired, 10))
  }

  getGenerated = (entity) => {
    const { intl: { formatNumber } } = this.context
    const generated = get(entity, 'content.lifeCycle.dataprovider.generated', 0)
    const ingested = get(entity, 'content.lifeCycle.dataprovider.ingested', 0)
    // Do not handle ingestion errors in dataprovider section. Ingestion errors will be handled with ingest microservice
    // ingestion failed means that te SIP is well generated.
    const ingFailed = get(entity, 'content.lifeCycle.dataprovider.ingestion_failed', 0)
    return formatNumber(parseInt(generated, 10) + parseInt(ingested, 10) + parseInt(ingFailed, 10))
  }

  getIncompletes = (entity, formated = true) => {
    const { intl: { formatNumber } } = this.context
    const incompletes = get(entity, 'content.lifeCycle.dataprovider.incomplete', 0)
    if (formated) {
      return formatNumber(parseInt(incompletes, 10))
    }
    return parseInt(incompletes, 10)
  }

  getInvalids = (entity, formated = true) => {
    const { intl: { formatNumber } } = this.context
    const invalid = get(entity, 'content.lifeCycle.dataprovider.invalid', 0)
    if (formated) {
      return formatNumber(parseInt(invalid, 10))
    }
    return parseInt(invalid, 10)
  }

  getErrors = (entity, formated = true) => {
    const { intl: { formatNumber } } = this.context
    const error = get(entity, 'content.lifeCycle.dataprovider.generation_error', 0)
    if (formated) {
      return formatNumber(parseInt(error, 10))
    }
    return parseInt(error, 10)
  }

  onShowErrors = () => {
    this.props.onShowProducts(this.props.entity)
  }

  onShowIncompletes = () => {
    this.props.onShowProducts(this.props.entity, false, false, true)
  }

  onShowInvalids = () => {
    this.props.onShowProducts(this.props.entity, false, true, false)
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineFiveContainer, listFiveValues, cellContainer,
            acquiredProductState: {
              runningContainer,
              runningIconColor,
              running,
            },
            lines: {
              one, two, three, four, five,
            },
          },
        },
      },
    } = this.context
    const { entity, availableDependencies } = this.props

    const actions = []
    if (this.getErrors(entity, false) > 0) {
      if (allMatchHateoasDisplayLogic(SessionsMonitoringProductsGeneratedRenderer.RELAUNCH_DEPENCIES, availableDependencies)) {
        actions.push(<MenuItem
          key="relaunch"
          primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.relaunch' })}
          onClick={this.onClickRelaunchProducts}
          value="relaunch"
        />)
      }
      actions.push(<MenuItem
        key="show-errors"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.show.errors' })}
        onClick={this.onShowErrors}
        value="show-errors"
      />)
    }
    if (this.getInvalids(entity, false) > 0) {
      actions.push(<MenuItem
        key="show-invalids"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.show.invalids' })}
        onClick={this.onShowInvalids}
        value="show-invalids"
      />)
    }
    if (this.getIncompletes(entity, false) > 0) {
      actions.push(<MenuItem
        key="show-incomplete"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.show.incomplete' })}
        onClick={this.onShowIncompletes}
        value="show-incomplete"
      />)
    }

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.ERROR}
        isDeleted={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.DELETED}
      >
        <div style={cellContainer}>
          { !entity.content.lifeCycle.dataprovider ? (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
              -
              </div>
            </div>
          ) : (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
                { entity.content.lifeCycle.dataprovider.state === 'RUNNING' ? (
                  <div style={runningContainer}>
                    <RunningIcon color={runningIconColor} />
                    <div style={running}>
                      {formatMessage({ id: 'acquisition-sessions.states.running' })}
                    </div>
                  </div>
                ) : (
                  <div />
                ) }
              </div>
              <div style={infosContainer}>
                <div style={lineFiveContainer}>
                  <div style={one}>
                    {formatMessage({ id: 'acquisition-sessions.states.files_acquired' })}
                  :
                  </div>
                  <div style={two}>
                    {formatMessage({ id: 'acquisition-sessions.states.complet' })}
                  :
                  </div>
                  <div style={three}>
                    {formatMessage({ id: 'acquisition-sessions.states.incomplete' })}
                  :
                  </div>
                  <div style={four}>
                    {formatMessage({ id: 'acquisition-sessions.states.invalid' })}
                  :
                  </div>
                  <div style={five}>
                    {formatMessage({ id: 'acquisition-sessions.states.error' })}
                  :
                  </div>
                </div>
                <div style={listFiveValues}>
                  <div style={one}>{this.getFilesAcquired(entity)}</div>
                  <div style={two}>{this.getGenerated(entity)}</div>
                  <div style={three}>{this.getIncompletes(entity)}</div>
                  <div style={four}>{this.getInvalids(entity)}</div>
                  <div style={five}>{this.getErrors(entity)}</div>
                </div>
                {actions.length > 0
                  ? <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
                    <DropDownButton
                      title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
                      style={menuDropDown}
                      icon={<Menu />}
                    >
                      {actions}
                    </DropDownButton>
                  </div> : null
                }
              </div>
            </div>
          )}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
export default SessionsMonitoringProductsGeneratedRenderer
