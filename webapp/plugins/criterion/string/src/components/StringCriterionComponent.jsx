/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import ContainsIcon from 'mdi-material-ui/CodeArray'
import StrictEqualIcon from 'mdi-material-ui/EqualBox'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
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
    // attribute currently searched
    searchAttribute: AttributeModelWithBounds.isRequired,
    // current search text
    searchText: PropTypes.string.isRequired,
    // current search mode
    searchMode: PropTypes.oneOf(SEARCH_MODES).isRequired,
    // Callback: user input some text. (event, text) => ()
    onTextInput: PropTypes.func.isRequired,
    // Callback: user selected contains mode. () => ()
    onSelectContainsMode: PropTypes.func.isRequired,
    // Callback: user selected strict equal mode. () => ()
    onSelectStrictEqualMode: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      searchText, searchMode, searchAttribute,
      onTextInput, onSelectContainsMode, onSelectStrictEqualMode,
    } = this.props
    const {
      intl,
      moduleTheme: {
        rootStyle, labelSpanStyle, textFieldStyle,
        selectorButtonStyle, defaultIconStyle, selectedIconStyle,
      },
    } = this.context
    return (
      <div style={rootStyle}>
        {/* 1. Label */}
        <span style={labelSpanStyle}>
          {searchAttribute.label}
        </span>
        {/* 2. Input */}
        <TextField
          id="search"
          // Genererate type label as floating text
          floatingLabelText={formatHintText(intl, searchAttribute, BOUND_TYPE.NONE)}
          title={formatTooltip(intl, searchAttribute)}
          value={searchText}
          onChange={onTextInput}
          style={textFieldStyle}
        />
        {/* 3. Contains mode selector */}
        <IconButton
          style={selectorButtonStyle}
          iconStyle={searchMode === SEARCH_MODES_ENUM.CONTAINS ? selectedIconStyle : defaultIconStyle}
          title={intl.formatMessage({ id: 'criterion.search.field.contains.selector.title' })}
          onClick={onSelectContainsMode}
        >
          <ContainsIcon />
        </IconButton>
        {/* 4. Strict equal mode selector */}
        <IconButton
          style={selectorButtonStyle}
          iconStyle={searchMode === SEARCH_MODES_ENUM.EQUALS ? selectedIconStyle : defaultIconStyle}
          title={intl.formatMessage({ id: 'criterion.search.field.equals.selector.title' })}
          onClick={onSelectStrictEqualMode}
        >
          <StrictEqualIcon />
        </IconButton>
      </div>)
  }
}
export default StringCriterionComponent
