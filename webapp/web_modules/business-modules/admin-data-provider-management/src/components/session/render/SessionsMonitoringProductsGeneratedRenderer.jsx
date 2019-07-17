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
import Play from 'material-ui/svg-icons/av/play-arrow'
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

  render() {
    const {
      intl: { formatMessage, formatNumber },
      muiTheme,
      moduleTheme: {
        sessionsStyles: {
          menuDropDown,
          gridCell: {
            gridContainer, gridHeaderContainer, infosContainer, lineContainer, listValues,
            acquiredProductState: {
              runningContainer,
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

    return (
      <div style={gridContainer}>
        <div style={gridHeaderContainer}>
          { entity.content.lifeCycle.products.running ? (
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
          <div style={lineContainer}>
            <div style={one}>
              {formatMessage({ id: 'acquisition-sessions.states.completed' })}
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
          </div>
          <div style={listValues}>
            <div style={one}>{formatNumber(entity.content.lifeCycle.products.done)}</div>
            <div style={two}>{formatNumber(entity.content.lifeCycle.products.incomplete)}</div>
            <div style={three}>{formatNumber(entity.content.lifeCycle.products.errors)}</div>
          </div>
          <div style={{ gridArea: 'menu', alignSelf: 'end' }}>
            <DropDownButton
              title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
              style={menuDropDown}
              icon={<Menu />}
            >
              <MenuItem
                primaryText="Relancer les produits en erreur"
              />
            </DropDownButton>
          </div>
        </div>
      </div>
    )
  }
}
export default SessionsMonitoringProductsGenerated
