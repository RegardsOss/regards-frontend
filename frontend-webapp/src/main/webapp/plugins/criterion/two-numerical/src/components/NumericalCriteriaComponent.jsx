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
import values from 'lodash/values'
import TextField from 'material-ui/TextField'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NumericalComparator } from '@regardsoss/components'
import { EnumNumericalComparator } from '@regardsoss/domain/common'

/**
 * Plugin component allowing the user to configure the numerical value of an attribute with a mathematical comparator (=, >, <=, ...).
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends React.Component {
  static propTypes = {
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * value:<value>
     * comparator:<ComparatorEnumType>
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Label of the field
     */
    label: PropTypes.string.isRequired,
    /**
     * Init with a specific comparator set.
     */
    comparator: PropTypes.oneOf(values(EnumNumericalComparator)),
    /**
     * Array of available comparators
     */
    availableComparators: PropTypes.arrayOf(PropTypes.oneOf(EnumNumericalComparator)),
    /**
     * Default value to display
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * If true, the attribute name, comparator and and field will be rendered in reversed order
     * Default to false.
     */
    reversed: PropTypes.bool,
    /**
     * If true, the attribute name will not be rendered.
     * Default to false.
     */
    hideAttributeName: PropTypes.bool,
    /**
     * If true, the commparator will not be rendered.
     * Default to false.
     */
    hideComparator: PropTypes.bool,
  }

  static defaultProps = {
    reversed: false,
    hideAttributeName: false,
    hideComparator: false,
    value: undefined,
    comparator: EnumNumericalComparator.EQ,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const { onChange, comparator } = this.props
    onChange(this.parse(newValue), comparator)
  }

  /**
   * Callback function that is fired when the comparator's value changes.
   *
   * @param {String} comparator The new value of the comparator.
   */
  handleChangeComparator = (comparator) => {
    const { onChange, value } = this.props
    onChange(value, comparator)
  }

  /**
   * Parses the value given from the field input component.
   *
   * @param {String} value
   */
  parse = value => parseFloat(value)

  /**
   * Formats the value before displaying in the field input component.
   *
   * @param {String} value
   */
  format = value => value || ''

  render() {
    const {
      label, comparator, value, reversed, hideAttributeName, hideComparator, availableComparators,
    } = this.props
    const { moduleTheme: { labelSpanStyle, textFieldStyle, lineStyle } } = this.context

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) {
      content.push(
        <span
          key="label"
          style={labelSpanStyle}
        >
          {label}
        </span>)
    }
    if (!hideComparator) {
      content.push(
        <NumericalComparator
          key="comparator"
          value={comparator}
          onChange={this.handleChangeComparator}
          comparators={availableComparators}
        />,
      )
    }
    content.push(
      <TextField
        id="search"
        key="field"
        type="number"
        floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
        value={this.format(value)}
        onChange={this.handleChangeValue}
        style={textFieldStyle}
      />,
    )

    if (reversed) content.reverse()

    return (
      <div
        style={lineStyle}
      >
        {content}
      </div>
    )
  }
}

export default NumericalCriteriaComponent
