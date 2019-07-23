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
import Menu from 'material-ui/svg-icons/navigation/more-vert'
import { MenuItem } from 'material-ui'
import { DropDownButton } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringIndexedRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage, formatNumber }, muiTheme, moduleTheme: { sessionsStyles: { menuDropDown, gridSessionCell: { gridSessionContainer, headerSession, infosSession }, gridCell: { cellContainer } } } } = this.context
    const { entity } = this.props
    return (
      <div style={cellContainer}>
        { !entity.content.lifeCycle.aip ? (
          <div style={gridSessionContainer}>
            <div style={headerSession}>
            -
            </div>
          </div>
        ) : (
          <div style={gridSessionContainer}>
            <div style={headerSession}>
              {formatNumber((entity.content.lifeCycle.aip.indexed ? entity.content.lifeCycle.aip.indexed : 0))}
            </div>
            <div style={infosSession}>
              <DropDownButton
                title={formatMessage({ id: 'acquisition-sessions.table.sip-generated' })}
                style={menuDropDown}
                icon={<Menu />}
              >
                <MenuItem
                  primaryText={formatMessage({ id: 'acquisition-sessions.menus.indexed.list' })}
                />
              </DropDownButton>
            </div>
          </div>
        )}
      </div>
    )
  }
}
