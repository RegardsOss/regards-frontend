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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SearchCriteriaGroupRuntime } from '../../../../../shapes/search/SearchCriteriaGroupRuntime'

/**
 * Shows a criteria group title
 *
 * @author Raphaël Mechali
 */
class GroupTitleComponent extends React.Component {
  static propTypes = {
    group: SearchCriteriaGroupRuntime.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { locale }, moduleTheme: { user: { searchPane: { criteria } } } } = this.context
    const { group: { showTitle, title } } = this.props
    return showTitle ? (
      <tr>
        <td style={criteria.groupTitle} colSpan="3">
          {title[locale]}
        </td>
      </tr>) : null
  }
}

export default GroupTitleComponent
