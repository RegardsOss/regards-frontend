/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import { MenuItem } from 'material-ui/IconMenu'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AutoCompleteTextField } from '@regardsoss/components'

/**
 * Main view component of the enumerated criteria
 */
export class EnumeratedCriteriaComponent extends React.Component {
  static propTypes = {
    // attribute lable
    attributeLabel: PropTypes.string.isRequired,
    // current field text
    text: PropTypes.string.isRequired,
    // available hints for values (optional as it may currently be fetching)
    // eslint-disable-next-line react/no-unused-prop-types
    availablePropertyValues: PropTypes.arrayOf(PropTypes.string), // only used in onPropertiesUpdated
    // is currently in error (optional, defaults to false)
    isInError: PropTypes.bool,
    // is currently fetching values hints (optional, defaults to false)
    isFetching: PropTypes.bool,
    // callback: user typed some new text
    onUpdateTextFilter: PropTypes.func.isRequired,
    // callback: user selected an hint or typed enter in the text field
    onFilterSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
      attributeLabel, text, isInError, isFetching,
      onUpdateTextFilter, onFilterSelected,
    } = this.props
    const { currentHints } = this.state
    const { intl: { formatMessage }, moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context

    return (
      <div style={rootStyle} >
        {/* attribute label */}
        <span style={labelSpanStyle} >
          {attributeLabel}
        </span>
        {/* Autocomplete text field */}
        <AutoCompleteTextField
          hintText={formatMessage({ id: 'criterion.search.field.label' })}
          currentHintText={text}
          currentHints={currentHints}
          isFetching={isFetching}
          isInError={isInError}
          onUpdateInput={onUpdateTextFilter}
          onFilterSelected={onFilterSelected}
          textFieldStyle={textFieldStyle}
        />
      </div>
    )
  }
}
export default EnumeratedCriteriaComponent
