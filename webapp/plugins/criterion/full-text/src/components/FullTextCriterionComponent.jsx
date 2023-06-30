/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TextField from 'material-ui/TextField'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Main plugin component
 * @author Raphaël Mechali
 */
class FullTextCriterionComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    // Currently searched text (text field input value)
    searchText: PropTypes.string.isRequired,
    // Text input callback: (event, string) => ()
    onTextInput: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  render() {
    const { intl: { locale, formatMessage }, muiTheme } = this.context
    const { label, searchText, onTextInput } = this.props
    return (
      <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
        <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} colSpan="3">
          <TextField
            fullWidth
            hintText={label[locale] || formatMessage({ id: 'criterion.search.field.label' })}
            value={searchText}
            onChange={onTextInput}
          />
        </td>
      </tr>
    )
  }
}
export default FullTextCriterionComponent
