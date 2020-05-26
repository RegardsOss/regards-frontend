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
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
import isDate from 'lodash/isDate'
import TimeIcon from 'mdi-material-ui/ClockOutline'
import ActionDateRange from 'mdi-material-ui/CalendarRange'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { UIDomain } from '@regardsoss/domain'

/**
 * Overrides DatePicker from material UI to allow manual text fill and use of time picker
 * @author Sébastien Binda
 */
export default class DatePickerField extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired, // used as base ID for elements ID
    value: PropTypes.instanceOf(Date),
    displayTime: PropTypes.bool,
    errorText: PropTypes.string, // error message when in error
    dateHintText: PropTypes.string,
    timeHintText: PropTypes.string,
    defaultValue: PropTypes.instanceOf(Date), // Default date to use if value is null or undefined
    defaultTime: PropTypes.string, // Default time to set if none is selected (format HH:mm:ss)
    autoOk: PropTypes.bool,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    tooltip: PropTypes.string,
  }

  static defaultProps = {
    defaultTime: '00:00:00',
    displayTime: false,
    fullWidth: false,
  }

  static DATE_FORMAT_US = 'MM/DD/YYYY'

  static DATE_FORMAT = 'DD/MM/YYYY'

  static TIME_FORMAT = 'HH:mm:ss'

  /** Default date picker style (hides text field, only shown to get the dialog box) */
  static datePickerContainerStyle = { width: '0px', height: '0px' }

  /** Default icon style */
  static iconStyle = {
    opacity: '0.65',
  }

  /** Default date text field style */
  static defaultDateTextFieldStyle = {
    width: '90px',
  }

  /** Default time text field style */
  static defaultTimeTextFieldStyle = {
    width: '70px',
  }

  /** Full width date text field style */
  static fullWithDateTextFieldStyle = {
    flexGrow: 1,
    flexShrink: 1,
    width: undefined,
  }

  /** Full width time text field style */
  static fullWidthTimeTextFieldStyle = {
    flexGrow: 1,
    flexShrink: 1,
    width: undefined,
  }


  static getUsDate = (dateString) => {
    const parts = dateString.split('/')
    if (parts.length === 3) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`
    }
    return null
  }

  static formatDateWithLocale = (date, locale) => {
    if (locale === 'en') {
      return date ? format(date, DatePickerField.DATE_FORMAT_US) : ''
    }
    return date ? format(date, DatePickerField.DATE_FORMAT) : ''
  }

  static parseDateWithLocale = (dateString, locale, timeString) => {
    if (locale === 'en') {
      if (timeString) {
        return dateString ? parse(`${dateString} ${timeString}`, `${DatePickerField.DATE_FORMAT_US} ${DatePickerField.TIME_FORMAT}`)
          : parse(`${timeString}`, DatePickerField.TIME_FORMAT)
      }
      return dateString ? parse(`${dateString}`, DatePickerField.DATE_FORMAT_US) : ''
    }
    const usDateString = DatePickerField.getUsDate(dateString)
    if (timeString) {
      return dateString ? parse(`${usDateString} ${timeString}`, `${DatePickerField.DATE_FORMAT} ${DatePickerField.TIME_FORMAT}`)
        : parse(`${timeString}`, DatePickerField.TIME_FORMAT)
    }
    return dateString ? parse(usDateString, DatePickerField.DATE_FORMAT_US) : null
  }

  constructor(props) {
    super(props)

    // compute initial state
    const date = isDate(props.defaultValue) ? props.defaultValue : props.value
    const defaultDate = date
      || parse(`${format(new Date(), DatePickerField.DATE_FORMAT_US)} ${props.defaultTime}`,
        `${DatePickerField.DATE_FORMAT_US} ${DatePickerField.TIME_FORMAT}`)

    this.state = {
      dateText: date ? DatePickerField.formatDateWithLocale(date, props.locale) : '',
      timeText: date ? format(date, DatePickerField.TIME_FORMAT) : '',
      defaultDate,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleChangeDate(nextProps.value)
    }
  }

  handleChangeDate = (newDate) => {
    if (newDate) {
      const newDateText = DatePickerField.formatDateWithLocale(newDate, this.props.locale)
      const newTimeText = format(newDate, DatePickerField.TIME_FORMAT)
      if (this.state.dateText !== newDateText || this.state.timeText !== newTimeText) {
        this.setState({ dateText: newDateText, timeText: newTimeText })
      }
    } else {
      this.setState({ dateText: '', timeText: '' })
    }
  }

  handleChangeDatePicker = (event, date) => {
    if (!date) {
      this.setState({ dateText: '', timeText: '' })
    } else {
      const { dateText, timeText, defaultDate } = this.state
      const { value } = this.props
      if (!value) {
        date.setHours(defaultDate.getHours())
        date.setMinutes(defaultDate.getMinutes())
        date.setSeconds(defaultDate.getSeconds())
      } else {
        date.setHours(value.getHours())
        date.setMinutes(value.getMinutes())
        date.setSeconds(value.getSeconds())
      }
      const newDateText = DatePickerField.formatDateWithLocale(date, this.props.locale)
      const newTimeText = format(date, DatePickerField.TIME_FORMAT)
      if (dateText !== newDateText || timeText !== newTimeText) {
        this.setState({ dateText: newDateText, timeText: newTimeText },
          () => this.props.onChange(date))
      }
    }
  }

  handleChangeTimePicker = (event, date) => {
    if (!date) {
      this.setState({ dateText: '', timeText: '' })
    } else {
      const { dateText, defaultDate } = this.state
      if (!dateText) {
        date.setFullYear(defaultDate.getFullYear())
        date.setMonth(defaultDate.getMonth())
        date.setDate(defaultDate.getDate())
      }
      const newTimeText = format(date, DatePickerField.TIME_FORMAT)
      const newDateText = DatePickerField.formatDateWithLocale(date, this.props.locale)
      if (this.state.dateText !== newDateText || this.state.timeText !== newTimeText) {
        this.setState({ dateText: newDateText, timeText: newTimeText },
          () => this.props.onChange(date))
      }
    }
  }

  handleDateInputChange = (event, value) => {
    this.setState({ dateText: value })
  }

  handleDatetimeInputChange = (event, value) => {
    this.setState({ timeText: value })
  }

  isADate = (maybeDate) => {
    if (Object.prototype.toString.call(maybeDate) === '[object Date]') {
      if (isNaN(maybeDate.getTime())) {
        return false
      }
      return true
    }
    return false
  }

  /**
   * Save the Date set manually by the user (e.g. YYYY:MM:DD) when the user unblur the TextField
   */
  handleDateInputBlur = (dateText) => {
    const {
      value, locale, onChange, defaultTime,
    } = this.props
    if (!isEmpty(dateText)) {
      const { timeText } = this.state
      let parsedDate
      if (this.state.timeText) {
        parsedDate = DatePickerField.parseDateWithLocale(dateText, locale, timeText)
      } else {
        parsedDate = DatePickerField.parseDateWithLocale(dateText, locale, defaultTime)
      }
      if (this.isADate(parsedDate)) {
        // the date is valid, let's save it
        onChange(parsedDate)
      } else {
        // the date is invalid, let's rollback
        this.setState({ dateText: DatePickerField.formatDateWithLocale(value, locale) })
      }
    } else {
      // the user wants to remove the date
      onChange()
    }
  }

  /**
   * Save the Datetime set manually by the user (e.g. HH:MM:SS) when the user unselect (unblur) the TextField
   */
  handleDatetimeInputBlur = (timeText) => {
    let parsedDate
    const { value, onChange, locale } = this.props
    const { dateText } = this.state
    let newDateText
    if (!isEmpty(timeText)) {
      if (dateText) {
        newDateText = dateText
        parsedDate = DatePickerField.parseDateWithLocale(dateText, locale, timeText)
      } else {
        newDateText = DatePickerField.formatDateWithLocale(new Date(), locale)
        parsedDate = DatePickerField.parseDateWithLocale(newDateText, locale, timeText)
      }
      if (this.isADate(parsedDate)) {
        // the date is valid, let's save it
        onChange(parsedDate)
      } else {
        // the date is invalid, let's rollback
        this.setState({ timeText: format(value, DatePickerField.TIME_FORMAT) })
      }
    } else {
      // the user wants to remove the time
      onChange()
    }
  }

  /**
   * Renders time picker components
   * @return {[React.Component]} built components array
   */
  renderTimePicker() {
    const {
      id, fullWidth, errorText,
      timeHintText, disabled, tooltip,
    } = this.props

    return [
      // 1 - hidden time picker (just for it to show the dialog)
      <div key="hidden.time.field" style={DatePickerField.datePickerContainerStyle}>
        <TimePicker
          id={`${id}-timePicker`}
          floatingLabelText=""
          value={this.props.value}
          errorText=""
          container="inline"
          onChange={this.handleChangeTimePicker}
          fullWidth
          format="24hr"
          autoOk={this.props.autoOk}
          okLabel={this.props.okLabel}
          cancelLabel={this.props.cancelLabel}
          ref={(c) => {
            this.datetimePicker = c
          }}
        />
      </div>,
      // 2 - time text field where user can input time
      <TextField
        key="time.text"
        style={fullWidth ? DatePickerField.fullWidthTimeTextFieldStyle : DatePickerField.defaultTimeTextFieldStyle}
        value={this.state.timeText}
        errorText={errorText}
        hintText={timeHintText}
        onChange={this.handleDatetimeInputChange}
        onBlur={event => this.handleDatetimeInputBlur(event.currentTarget.value)}
        disabled={disabled}
        title={tooltip}
      />,
      // 3 - Show dialog button
      <IconButton
        key="time.selector.button"
        style={DatePickerField.iconStyle}
        onClick={() => this.datetimePicker.focus()}
        disabled={disabled}
        title={tooltip}
      >
        <TimeIcon />
      </IconButton>]
  }

  /**
   * Renders date picker components
   * @return {[React.Component]} built components array
   */
  renderDate() {
    const {
      id, fullWidth, errorText,
      dateHintText, disabled, tooltip,
    } = this.props
    return [
      // 1 - hidden date picker (just for it to show the dialog)
      <div key="hidden.date.field" style={DatePickerField.datePickerContainerStyle}>
        <DatePicker
          id={`${id}-datePicker`}
          floatingLabelText=""
          value={this.props.value}
          errorText=""
          formatDate={date => format(date, DatePickerField.DATE_FORMAT_US)}
          autoOk={this.props.autoOk}
          okLabel={this.props.okLabel}
          cancelLabel={this.props.cancelLabel}
          container="inline"
          fullWidth
          onChange={this.handleChangeDatePicker}
          ref={(c) => {
            this.datePicker = c
          }}
        />
      </div>,
      // 2 - date text field where user can input date
      <TextField
        key="date.text"
        style={fullWidth ? DatePickerField.fullWithDateTextFieldStyle : DatePickerField.defaultDateTextFieldStyle}
        value={this.state.dateText}
        errorText={errorText}
        hintText={dateHintText}
        onChange={this.handleDateInputChange}
        onBlur={event => this.handleDateInputBlur(event.currentTarget.value)}
        disabled={disabled}
        title={tooltip}
      />,
      // 3 - Show dialog button
      <IconButton
        key="date.selector.button"
        style={DatePickerField.iconStyle}
        onClick={() => this.datePicker.focus()}
        disabled={disabled}
        title={tooltip}
      >
        <ActionDateRange />
      </IconButton>]
  }

  render() {
    const { displayTime, fullWidth, style } = this.props
    const dynamicStyle = fullWidth ? { flexGrow: 1, flexShrink: 1 } : {}
    return (
      <div style={{ ...style, ...dynamicStyle, display: 'inline-flex' }}>
        {
          [
            ...this.renderDate(),
            ...(displayTime ? this.renderTimePicker() : []),
          ]
        }
      </div>
    )
  }
}
