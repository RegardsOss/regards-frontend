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


import get from 'lodash/get'
import Menu from 'material-ui/svg-icons/navigation/more-vert'
import { MenuItem } from 'material-ui'
import { DropDownButton } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SessionsMonitoringTableBackgroundComponent } from './SessionsMonitoringTableBackgroundComponent'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringIndexedRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
    onGoToDatasources: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getIndexed = (entity) => {
    const { intl: { formatNumber } } = this.context
    const indexed = get(entity, 'content.lifeCycle.catalog.indexed', 0)
    return formatNumber(parseInt(indexed, 10))
  }

  getErrors = (entity) => {
    const { intl: { formatNumber } } = this.context
    const indexed = get(entity, 'content.lifeCycle.catalog.indexedError', 0)
    return formatNumber(parseInt(indexed, 10))
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
    const { entity } = this.props

    const actions = []
    actions.push(<MenuItem
      key="indexation"
      primaryText={formatMessage({ id: 'acquisition-sessions.menus.index.view' })}
      onClick={this.props.onGoToDatasources}
      value="indexation"
    />)
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
                  <div style={two}>{this.getIndexed(entity)}</div>
                  <div style={three} />
                  <div style={four}>{this.getErrors(entity)}</div>
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
