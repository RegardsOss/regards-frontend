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
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TemporalComparatorComponent from './TemporalComparatorComponent'
import EnumTemporalComparator from '../model/EnumTemporalComparator'

let DateTimeFormat

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/fr')
}

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28      59         234
 * ----------  ------   -------   ------------
 *    date      time    seconds   milliseconds
 *
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriteriaComponent extends React.Component {
  static propTypes = {
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * value: The value of the field as a Date
     * comparator: EnumTemporalComparator
     */
    onChange: PropTypes.func,
    /**
     * Label of the field displayed
     */
    label: PropTypes.string.isRequired,
    /**
     * Init with a specific comparator set.
     */
    comparator: PropTypes.oneOf(values(EnumTemporalComparator)),
    /**
     * Default value
     */
    value: PropTypes.instanceOf(Date),
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
     * If true, the comparator will not be rendered.
     * Default to false.
     */
    hideComparator: PropTypes.bool,
    /**
     * If true, hours will be auto-completed with the maximum value
     * Default to false
     */
    isStopDate: PropTypes.bool,
  }

  static defaultProps = {
    reversed: false,
    hideAttributeName: false,
    hideComparator: false,
    value: undefined,
    comparator: EnumTemporalComparator.BEFORE,
    isStopDate: false,
  }


  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  static textStyle = {
    margin: '0px 10px',
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Date} newValue The new value of the date field.
   */
  handleChangeDate = (event, newValue) => {
    const {
      onChange,
      value,
      comparator,
      isStopDate,
    } = this.props
    // Pick the time part from the time picker
    if (value) {
      newValue.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds())
    } else if (isStopDate) {
      newValue.setHours(23, 59, 59, 999)
    }
    onChange(newValue, comparator)
  }

  /**
   * Callback function that is fired when the time value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Date} newValue The new value of the time field.
   */
  handleChangeTime = (event, newValue) => {
    const { onChange, value, comparator } = this.props
    // Pick the date part from the the date picker
    if (value) {
      newValue.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())
    }
    onChange(newValue, comparator)
  }

  /**
   * Callback function that is fired when the seconds value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Integer} seconds The new value of the seconds field.
   */
  handleChangeSeconds = (event, seconds) => {
    const { onChange, value, comparator } = this.props
    const newValue = value || new Date()

    newValue.setSeconds(seconds)
    onChange(newValue, comparator)
  }

  /**
   * Callback function that is fired when the milliseconds value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Integer} milliseconds The new value of the milliseconds field.
   */
  handleChangeMilliseconds = (event, milliseconds) => {
    const { onChange, value, comparator } = this.props
    const newValue = value || new Date()

    newValue.setMilliseconds(milliseconds)
    onChange(newValue, comparator)
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = (comparator) => {
    const { onChange, value } = this.props
    onChange(value, comparator)
  }

  /**
   * Extract the seconds value to inject in the field input
   *
   * @param {Date} date
   */
  formatSeconds = date => date ? date.getSeconds() : ''

  /**
   * Extract the milliseconds value to inject in the field input
   *
   * @param {Date} date
   */
  formatMilliseconds = date => date ? date.getMilliseconds() : ''

  render() {
    const {
      label, comparator, value, reversed, hideAttributeName, hideComparator,
    } = this.props
    const {
      moduleTheme: {
        datePickerTextFieldStyle, datePickerStyle, timePickerStyles,
        secondsTextFieldStyle, millisecondsTextFieldStyle,
      },
    } = this.context

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) {
      content.push(<span key="label" style={TemporalCriteriaComponent.textStyle}>{label}</span>)
    }
    if (!hideComparator) {
      content.push(
        <TemporalComparatorComponent key="comparator" value={comparator} onChange={this.handleChangeComparator} />,
      )
    }
    content.push([
      <DatePicker
        key={`${label}.date`}
        value={value}
        onChange={this.handleChangeDate}
        DateTimeFormat={DateTimeFormat}
        locale="fr"
        hintText={<FormattedMessage id="criterion.date.field.label" />}
        floatingLabelText={<FormattedMessage id="criterion.date.field.label" />}
        okLabel={<FormattedMessage id="criterion.date.picker.ok" />}
        cancelLabel={<FormattedMessage id="criterion.date.picker.cancel" />}
        style={datePickerStyle}
        textFieldStyle={datePickerTextFieldStyle}
      />,
      <TimePicker
        key={`${label}.time`}
        value={value}
        onChange={this.handleChangeTime}
        format="24hr"
        floatingLabelText={<FormattedMessage id="criterion.time.field.label" />}
        hintText={<FormattedMessage id="criterion.time.field.label" />}
        okLabel={<FormattedMessage id="criterion.time.picker.ok" />}
        cancelLabel={<FormattedMessage id="criterion.time.picker.cancel" />}
        textFieldStyle={timePickerStyles}
      />,
      <TextField
        key={`${label}.seconds`}
        type="number"
        floatingLabelText={<FormattedMessage id="criterion.seconds.field.label" />}
        value={this.formatSeconds(value)}
        onChange={this.handleChangeSeconds}
        style={secondsTextFieldStyle}
      />,
      <TextField
        key={`${label}.millis`}
        type="number"
        floatingLabelText={<FormattedMessage id="criterion.milliseconds.field.label" />}
        value={this.formatMilliseconds(value)}
        onChange={this.handleChangeMilliseconds}
        style={millisecondsTextFieldStyle}
      />,
    ])

    if (reversed) content.reverse()

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {content}
      </div>
    )
  }
}

export default TemporalCriteriaComponent
