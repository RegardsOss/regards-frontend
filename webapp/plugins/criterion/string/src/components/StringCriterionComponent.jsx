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
import TextField from 'material-ui/TextField'
import ContainsIcon from 'mdi-material-ui/CodeArray'
import StrictEqualIcon from 'mdi-material-ui/EqualBox'
import RegexIcon from 'mdi-material-ui/Regex'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IconElementSelector } from '@regardsoss/components'
import {
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip,
} from '@regardsoss/plugins-api'
import { SEARCH_MODES_ENUM, SEARCH_MODES } from '../domain/SearchMode'

/**
 * Main plugin component
 * @author Raphaël Mechali
 */
class StringCriterionComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    // attribute currently searched
    searchAttribute: AttributeModelWithBounds.isRequired,
    // current search text
    searchText: PropTypes.string.isRequired,
    // current search mode
    searchMode: PropTypes.oneOf(SEARCH_MODES).isRequired,
    // Callback: user input some text. (event, text) => ()
    onTextInput: PropTypes.func.isRequired,
    // Callback: user selected a restriction mode. (mode:string) => ()
    onSelectMode: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Graphics definition by mode type */
  static MODES_DEFINITION = {
    [SEARCH_MODES_ENUM.CONTAINS]: {
      IconConstructor: ContainsIcon,
      labelKey: 'criterion.search.field.contains.selector.label',
      tooltipKey: 'criterion.search.field.contains.selector.title',
    },
    [SEARCH_MODES_ENUM.EQUALS]: {
      IconConstructor: StrictEqualIcon,
      labelKey: 'criterion.search.field.equals.selector.label',
      tooltipKey: 'criterion.search.field.equals.selector.title',
    },
    [SEARCH_MODES_ENUM.REGEX]: {
      IconConstructor: RegexIcon,
      labelKey: 'criterion.search.field.regex.selector.label',
      tooltipKey: 'criterion.search.field.regex.selector.title',
    },
  }

  render() {
    const {
      label, searchText, searchMode, searchAttribute,
      onTextInput, onSelectMode,
    } = this.props
    const { intl, muiTheme } = this.context
    return (
      <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
        {/* 1. Label */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
          {label[intl.locale] || searchAttribute.label}
        </td>
        {/* 2. Options */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <div style={muiTheme.module.searchResults.searchPane.criteria.optionsContainer}>
            <IconElementSelector
              value={searchMode}
              choices={SEARCH_MODES}
              choiceGraphics={StringCriterionComponent.MODES_DEFINITION}
              onChange={onSelectMode}
            />
          </div>
        </td>
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
export default StringCriterionComponent
