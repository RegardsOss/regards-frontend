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
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import FullwordIcon from 'mdi-material-ui/Contain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip,
} from '@regardsoss/plugins-api'

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
  // Is currently searching full words?
  searchFullWords: PropTypes.bool.isRequired,
  // Callback: user input some text. (event, text) => ()
  onTextInput: PropTypes.func.isRequired,
  // Callback: user toggled full words search state. () => ()
  onCheckFullWord: PropTypes.func.isRequired,
  // Is fullword search allowed?
  allowFullword: PropTypes.bool.isRequired,
}

static contextTypes = {
  ...i18nContextType,
  ...themeContextType,
}

render() {
  const {
    searchText, searchFullWords, searchAttribute, allowFullword,
    onTextInput, onCheckFullWord,
  } = this.props
  const {
    intl,
    moduleTheme: {
      rootStyle, labelSpanStyle, textFieldStyle,
      uncheckIconStyle, checkedIconStyle,
    },
  } = this.context
  return (
    <div style={rootStyle}>
      <span style={labelSpanStyle}>
        {searchAttribute.label}
      </span>
      <TextField
        id="search"
          // Genererate type label as floating text
        floatingLabelText={formatHintText(intl, searchAttribute, BOUND_TYPE.NONE)}
        title={formatTooltip(intl, searchAttribute)}
        value={searchText}
        onChange={onTextInput}
        style={textFieldStyle}
      />
      { // Full word search toggle, when available
        allowFullword ? (
          <IconButton
            iconStyle={searchFullWords ? checkedIconStyle : uncheckIconStyle}
            title={intl.formatMessage({ id: 'criterion.search.field.word.checkbox.title' })}
            onClick={onCheckFullWord}
          >
            <FullwordIcon />
          </IconButton>) : null
      }
    </div>
  )
}
}
export default StringCriterionComponent