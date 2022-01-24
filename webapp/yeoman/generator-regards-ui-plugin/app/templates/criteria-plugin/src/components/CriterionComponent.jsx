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
import TextField from 'material-ui/TextField'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip,
} from '@regardsoss/plugins-api'

/**
 * Main plugin component
 * @author <%= author %>
 */
class CriterionComponent extends React.Component {
static propTypes = {
  label: UIShapes.IntlMessage.isRequired,
  // attribute currently searched
  searchAttribute: AttributeModelWithBounds.isRequired,
  // current search text
  searchText: PropTypes.string.isRequired,
  // Callback: user input some text. (event, text) => ()
  onTextInput: PropTypes.func.isRequired,
}

static contextTypes = {
  ...i18nContextType,
  ...themeContextType,
}

render() {
  const {
    label, searchText, searchAttribute, onTextInput,
  } = this.props
  const { intl, muiTheme } = this.context
  /**
   * Render in a table row (mandatory):
   * First column: label
   * Second column: operator (none here, simply consume it
   * Third column: field itself
   * That convention is followed by standard plugins. Thus it is not mandatory to
   * respect it if your project is not using any standard plugin
   */
  return (
    <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
      {/* 1. Label (using locale) */}
      <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
        {label[intl.locale] || searchAttribute.label}
      </td>
      {/* 2. Options (empty here, just consume it) */}
      <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell} />
      {/* 3. Input */}
      <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
        <TextField
          hintText={formatHintText(intl, searchAttribute, BOUND_TYPE.NONE)}
          title={formatTooltip(intl, searchAttribute)}
          value={searchText}
          onChange={onTextInput}
          fullWidth
        />
      </td>
    </tr>)
}
}

export default CriterionComponent
