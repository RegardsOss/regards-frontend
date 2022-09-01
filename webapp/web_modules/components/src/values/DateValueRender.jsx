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
import isDate from 'lodash/isDate'
import isNaN from 'lodash/isNaN'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display Date values group value. It exports self with a default format, respecting ValuesRenderCellAPI,
 *  but also exports other formats as a React components respecting that API
 *
 * @author Sébastien binda
 */
export class DateValueRender extends React.Component {
  /** Default formatters */
  static DEFAULT_FORMATTERS = {
    date: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.date' }, DateValueRender.getMessageParameters(date)),
    dateWithMinutes: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.dateWithMinutes' }, DateValueRender.getMessageParameters(date)),
    dateWithSeconds: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.dateWithSeconds' }, DateValueRender.getMessageParameters(date)),
    dateWithMilliseconds: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.dateWithMilliseconds' }, DateValueRender.getMessageParameters(date)),
    time: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.time' }, DateValueRender.getMessageParameters(date)),
    timeWithMilliseconds: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.timeWithMilliseconds' }, DateValueRender.getMessageParameters(date)),
    dateIso: (date, formatMessage) => formatMessage({ id: 'date.value.render.type.dateIso' }, DateValueRender.getMessageParameters(date)),
  }

  /**
   * Formats a number on two digits
   * @param {number} value < 100
   * @return formatted value as string
   */
  static formatOn2Digits(value) {
    return value < 10 ? `0${value}` : value.toString()
  }

  /**
   * Formats a number on three digits
   * @param {number} value < 1000
   * @return formatted value as string
   */
  static formatOn3Digit(value) {
    if (value < 10) {
      return `00${value}`
    }
    if (value < 100) {
      return `0${value}`
    }
    return value
  }

  /**
   * Extracts in date parameters that can be used
   * @param {Date} date
   * @return {year: string, month: string, day: string, hours: string, minutes: string, seconds: string, milliseconds: string} date message parameters
   */
  static getMessageParameters(date) {
    return {
      year: date.getUTCFullYear().toString(),
      month: DateValueRender.formatOn2Digits(date.getUTCMonth() + 1), // [0;11] -> [1;12]
      day: DateValueRender.formatOn2Digits(date.getUTCDate()),
      hours: DateValueRender.formatOn2Digits(date.getUTCHours()),
      minutes: DateValueRender.formatOn2Digits(date.getUTCMinutes()),
      seconds: DateValueRender.formatOn2Digits(date.getUTCSeconds()),
      milliseconds: DateValueRender.formatOn3Digit(date.getUTCMilliseconds()),
    }
  }

  /**
   * Formats a date using intl and date text
   * @param {string|Date|number} dateParam date building parameter
   * @param {Function} formatter like  (date:Date, formatMessage: function) => string
   * @param {Function} formatMessage localized message formatter, from intl context, like (string) => (string)
   * formatDate and formatTime
   * @return formatted date text if valid or null if invalid
   */
  static getFormattedDate = (dateParam, formatter, formatMessage) => {
    if (!dateParam) {
      return null
    }
    const date = isDate(dateParam) ? dateParam : new Date(dateParam)
    if (!isNaN(date.getDate())) {
      return formatter(date, formatMessage)
    }
    return null
  }

  static propTypes = {
    value: PropTypes.string,
    // should display using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
    // function like (date, formatMessage) => (string). Required but a default is provided
    formatter: PropTypes.func,
  }

  static defaultProps = {
    multilineDisplay: false,
    formatter: DateValueRender.DEFAULT_FORMATTERS.dateWithSeconds, // historical default formatter
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { value, multilineDisplay, formatter } = this.props
    const { intl: { formatMessage }, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const textValue = DateValueRender.getFormattedDate(value, formatter, formatMessage)
    || formatMessage({ id: 'value.render.no.value.label' })
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default DateValueRender
