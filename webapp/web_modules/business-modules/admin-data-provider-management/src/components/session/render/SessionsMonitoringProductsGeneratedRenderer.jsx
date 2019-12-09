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
import Play from 'material-ui/svg-icons/av/play-arrow'
import { MenuItem } from 'material-ui'
import { DropDownButton } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

class SessionsMonitoringProductsGenerated extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    onRelaunchProducts: PropTypes.func.isRequired,
    onShowProducts: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

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

  getIncompletes = (entity) => {
    const { intl: { formatNumber } } = this.context
    const incompletes = get(entity, 'content.lifeCycle.dataprovider.incomplete', 0)
    return formatNumber(parseInt(incompletes, 10))
  }

  getErrors = (entity) => {
    const { intl: { formatNumber } } = this.context
    const error = get(entity, 'content.lifeCycle.dataprovider.generation_error', 0)
    return formatNumber(parseInt(error, 10))
  }

  onShowErrors = () => {
    this.props.onShowProducts(this.props.entity)
  }

  onShowIncompletes = () => {
    this.props.onShowProducts(this.props.entity, false, true)
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineFourContainer, listFourValues, cellContainer,
            acquiredProductState: {
              runningContainer,
              runningIconColor,
              running,
            },
            lines: {
              one, two, three, four,
            },
          },
        },
      },
    } = this.context
    const { entity } = this.props

    const actions = []
    if (this.getErrors(entity) > 0) {
      actions.push(<MenuItem
        key="relaunch"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.relaunch' })}
        onClick={this.onClickRelaunchProducts}
        value="relaunch"
      />)
      actions.push(<MenuItem
        key="show-errors"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.show.errors' })}
        onClick={this.onShowErrors}
        value="show-errors"
      />)
    }
    if (this.getIncompletes(entity) > 0) {
      actions.push(<MenuItem
        key="show-incomplete"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.products.show.incomplete' })}
        onClick={this.onShowIncompletes}
        value="show-incomplete"
      />)
    }

    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === 'ERROR'}
        isDeleted={entity.content.state === 'DELETED'}
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
                    <Play color={runningIconColor} />
                    <div style={running}>
                      {formatMessage({ id: 'acquisition-sessions.states.running' })}
                    </div>
                  </div>
                ) : (
                  <div />
                ) }
              </div>
              <div style={infosContainer}>
                <div style={lineFourContainer}>
                  <div style={one}>
                    {formatMessage({ id: 'acquisition-sessions.states.complet' })}
                  :
                  </div>
                  <div style={two}>
                    {formatMessage({ id: 'acquisition-sessions.states.incomplete' })}
                  :
                  </div>
                  <div style={three}>
                    {formatMessage({ id: 'acquisition-sessions.states.error' })}
                  :
                  </div>
                  <div style={four}>
                    {formatMessage({ id: 'acquisition-sessions.states.files_acquired' })}
                  :
                  </div>
                </div>
                <div style={listFourValues}>
                  <div style={one}>{this.getGenerated(entity)}</div>
                  <div style={two}>{this.getIncompletes(entity)}</div>
                  <div style={three}>{this.getErrors(entity)}</div>
                  <div style={four}>{this.getFilesAcquired(entity)}</div>
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
export default SessionsMonitoringProductsGenerated
