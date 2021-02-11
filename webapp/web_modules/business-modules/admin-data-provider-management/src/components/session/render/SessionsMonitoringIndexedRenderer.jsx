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

import get from 'lodash/get'
import Menu from 'mdi-material-ui/DotsVertical'
import MenuItem from 'material-ui/MenuItem'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { DropDownButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataManagementClient } from '@regardsoss/client'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringIndexedRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onGoToDatasources: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dependencies to display crawler list */
  static DATASOURCES_LIST_DEPENDENCIES = [new DataManagementClient.CrawlerDatasourceActions('').getDependency(RequestVerbEnum.GET_LIST)]

  /**
   * Extract and format number in catalog lifecycle field
   * @param {*} entity matching AccessShapes.Session
   * @param {string} field field in catalog objet
   * @return {string} formatted number value
   */
  formatNumber = (entity, field) => {
    const { intl: { formatNumber } } = this.context
    const value = get(entity, `content.lifeCycle.catalog.${field}`, 0)
    return formatNumber(value)
  }

  render() {
    const {
      intl: { formatMessage },
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

    const actions = []
    if (allMatchHateoasDisplayLogic(SessionsMonitoringIndexedRenderer.DATASOURCES_LIST_DEPENDENCIES, availableDependencies)) {
      actions.push(<MenuItem
        key="indexation"
        primaryText={formatMessage({ id: 'acquisition-sessions.menus.index.view' })}
        onClick={this.props.onGoToDatasources}
        value="indexation"
      />)
    }
    return (
      <SessionsMonitoringTableBackgroundComponent
        isInError={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.ERROR}
        isDeleted={entity.content.state === AccessDomain.SESSION_STATUS_ENUM.DELETED}
      >
        <div style={cellContainer}>
          { !entity.content.lifeCycle.catalog ? (
            <div style={gridContainer}>
              <div style={gridHeaderContainer}>
                -
              </div>
            </div>
          ) : (
            <div style={gridContainer}>
              <div style={infosContainer}>
                <div style={lineFourContainer}>
                  <div style={one} />
                  <div style={two}>
                    {formatMessage({ id: 'acquisition-sessions.states.indexed' })}
                    :
                  </div>
                  <div style={three} />
                  <div style={four}>
                    {formatMessage({ id: 'acquisition-sessions.states.index.errors' })}
                    :
                  </div>
                </div>
                <div style={listFourValues}>
                  <div style={one} />
                  <div style={two}>{this.formatNumber(entity, 'indexed')}</div>
                  <div style={three} />
                  <div style={four}>{this.formatNumber(entity, 'indexedError')}</div>
                </div>
                { actions.length > 0
                  ? <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
                    <DropDownButton
                      title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
                      style={menuDropDown}
                      icon={<Menu />}
                    >
                      {actions}
                    </DropDownButton>
                  </div> : null}
              </div>
            </div>
          )}
        </div>
      </SessionsMonitoringTableBackgroundComponent>
    )
  }
}
