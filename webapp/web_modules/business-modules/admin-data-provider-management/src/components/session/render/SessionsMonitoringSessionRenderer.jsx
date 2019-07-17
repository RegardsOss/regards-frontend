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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Comment Here
 * @author Kevin Picart
 */
export class SessionsMonitoringSessionRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.Session.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { sessionsStyles: { gridSessionCell: { gridSessionContainer, headerSession, infosSession } } } } = this.context
    const { entity } = this.props
    return (
      <div style={gridSessionContainer}>
        <div style={headerSession}>
          {entity.content.name}
        </div>
        <div style={infosSession}>
          <Menu />
        </div>
      </div>
    )
  }
}
