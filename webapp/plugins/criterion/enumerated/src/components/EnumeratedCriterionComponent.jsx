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
import { MenuItem } from 'material-ui/IconMenu'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip,
} from '@regardsoss/plugins-api'
import { AutoCompleteTextField } from '@regardsoss/components'

/**
 * Main view component of the enumerated criteria
 */
export class EnumeratedCriterionComponent extends React.Component {
  static propTypes = {
    // attribute currently searched
    searchAttribute: AttributeModelWithBounds.isRequired,
    // current field text
    text: PropTypes.string.isRequired,
    // available hints for values (optional as it may currently be fetching)
    // eslint-disable-next-line react/no-unused-prop-types
    availablePropertyValues: PropTypes.arrayOf(PropTypes.string), // only used in onPropertiesUpdated
    // is currently in error (optional, defaults to false)
    inError: PropTypes.bool,
    // is currently fetching values hints (optional, defaults to false)
    isFetching: PropTypes.bool,
    // callback: user typed some new text
    onUpdateTextFilter: PropTypes.func.isRequired,
    // callback: user selected an hint or typed enter in the text field
    onFilterSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (oldProps.availablePropertyValues !== newProps.availablePropertyValues) {
      this.setState({
        currentHints: (newProps.availablePropertyValues || []).map(value => ({
          id: value, // element id
          text: value, // element text (similar)
          value: <MenuItem primaryText={value} />, // graphical value (in menu)
        })),
      })
    }
  }

  render() {
    const {
      searchAttribute, text, inError, isFetching,
      onUpdateTextFilter, onFilterSelected,
    } = this.props
    const { currentHints } = this.state
    const { intl, moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context
    return (
      <div style={rootStyle}>
        {/* attribute label */}
        <span style={labelSpanStyle}>
          {searchAttribute.label}
        </span>
        {/* Autocomplete text field */}
        <AutoCompleteTextField
          title={formatTooltip(intl, searchAttribute)}
          hintText={formatHintText(intl, searchAttribute, BOUND_TYPE.NONE)}
          currentHintText={text}
          currentHints={currentHints}
          isFetching={isFetching}
          inError={inError}
          onUpdateInput={onUpdateTextFilter}
          onFilterSelected={onFilterSelected}
          textFieldStyle={textFieldStyle}
        />
      </div>
    )
  }
}
export default EnumeratedCriterionComponent
