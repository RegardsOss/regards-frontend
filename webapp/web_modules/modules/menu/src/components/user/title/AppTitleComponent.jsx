/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Application title (menu in admin mode)
 * @author Raphaël Mechali
 */
class AppTitleComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    displayMode: PropTypes.oneOf(UIDomain.MENU_DISPLAY_MODES).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { project, displayMode } = this.props
    const { intl: { formatMessage }, moduleTheme: { admin: { title } } } = this.context
    return (
      <div style={title}>
        {
          displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_INSTANCE
            ? formatMessage({ id: 'menu.admin.instance.title' })
            : formatMessage({ id: 'menu.admin.project.title' }, { project })
        }
      </div>
    )
  }
}
export default AppTitleComponent
