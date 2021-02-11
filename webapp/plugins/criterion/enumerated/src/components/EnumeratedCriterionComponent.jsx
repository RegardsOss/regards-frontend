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
import noop from 'lodash/noop'
import EqualIcon from 'mdi-material-ui/EqualBox'
import { MenuItem } from 'material-ui/IconMenu'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip,
} from '@regardsoss/plugins-api'
import { AutoCompleteTextField, IconElementSelector } from '@regardsoss/components'

/**
 * Main view component of the enumerated criteria
 */
export class EnumeratedCriterionComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    // attribute currently searched
    searchAttribute: AttributeModelWithBounds.isRequired,
    // is currently in error
    error: PropTypes.bool.isRequired,
    // current field text
    text: PropTypes.string.isRequired,
    // available hints for values (optional as it may currently be fetching)
    // eslint-disable-next-line react/no-unused-prop-types
    availablePropertyValues: PropTypes.arrayOf(PropTypes.string), // only used in onPropertiesUpdated
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

  /** Equals operator (emulates multiple operators for graphics)  */
  static EQUAL_OPERATOR = 'equals'

  /** Operators (emulates multiple operators for graphics) */
  static OPERATORS = [EnumeratedCriterionComponent.EQUAL_OPERATOR]

  /** Operators graphics definition */
  static OPERATORS_DEFINITION = {
    [EnumeratedCriterionComponent.EQUAL_OPERATOR]: {
      IconConstructor: EqualIcon,
      labelKey: 'criterion.enumerated.equal.label',
      tooltipKey: 'criterion.enumerated.equal.tooltip',
    },
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

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
      label, searchAttribute, text,
      error, isFetching,
      onUpdateTextFilter, onFilterSelected,
    } = this.props
    const { currentHints } = this.state
    const { intl, muiTheme, moduleTheme: { menuStyle } } = this.context
    return (
      <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
        <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
          {label[intl.locale] || searchAttribute.label}
        </td>
        {/* Show single operator */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <div style={muiTheme.module.searchResults.searchPane.criteria.optionsContainer}>
            <IconElementSelector
              value={EnumeratedCriterionComponent.EQUAL_OPERATOR}
              choices={EnumeratedCriterionComponent.OPERATORS}
              choiceGraphics={EnumeratedCriterionComponent.OPERATORS_DEFINITION}
              onChange={noop}
            />
          </div>
        </td>
        {/* consume operators column (unused by this plugin) */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <AutoCompleteTextField
            title={formatTooltip(intl, searchAttribute)}
            hintText={formatHintText(intl, searchAttribute, BOUND_TYPE.NONE)}
            currentHintText={text}
            currentHints={currentHints}
            isFetching={isFetching}
            isInError={error}
            onUpdateInput={onUpdateTextFilter}
            onFilterSelected={onFilterSelected}
            menuStyle={menuStyle}
            fullWidth
          />
        </td>
      </tr>
    )
  }
}
export default EnumeratedCriterionComponent
