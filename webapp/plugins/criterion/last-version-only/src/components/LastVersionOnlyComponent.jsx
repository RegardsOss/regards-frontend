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
import Checkbox from 'material-ui/Checkbox'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Main plugin component
 * @author Raphaël Mechali
 */
class LastVersionOnlyComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    checked: PropTypes.bool.isRequired,
    onToggled: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { label, checked, onToggled } = this.props
    const { intl: { locale, formatMessage }, muiTheme } = this.context
    return (
      <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
        {/* Checkbox */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} colSpan="3">
          <Checkbox
            checked={checked}
            onCheck={onToggled}
            label={label[locale] || formatMessage({ id: 'criterion.last.data.only.label' })}
            title={formatMessage({ id: 'criterion.last.data.only.tooltip' })}
          />
        </td>
      </tr>)
  }
}
export default LastVersionOnlyComponent
