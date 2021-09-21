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
import isDate from 'lodash/isDate'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
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
    // eslint-disable-next-line react/no-unused-prop-types
    style: PropTypes.objectOf( // eslint wont fix: broken rule, used in onPropertiesUpdated
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

  /** Style to use in full width */
  static FULL_WIDTH_STYLE = { flexGrow: 1, flexShrink: 1, display: 'inline-flex' }

  /** Default style (not full width) */
  static DEFAULT_STYLE = { display: 'inline-flex' }

  static getUsDate = (dateString) => {
    const parts = dateString.split('/')
    if (parts.length === 3) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`
    }
    return null
  }

  static formatDateWithLocale(date, locale) {
    if (locale === 'en') {
      return date ? format(date, DatePickerField.DATE_FORMAT_US) : ''
    }
    return date ? format(date, DatePickerField.DATE_FORMAT) : ''
  }

  /**
   * Formats date for date field input
   * @param {*} date
   */
  static formatDateForInput(date) {
    return format(date, DatePickerField.DATE_FORMAT_US)
  }

  static parseDateWithLocale(dateString, locale, timeString) {
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

  /** Initial state (resolved on IIFE for readability sake) */
  state = (() => {
    const date = isDate(this.props.defaultValue) ? this.props.defaultValue : this.props.value
    const defaultDate = date
      || parse(`${format(new Date(), DatePickerField.DATE_FORMAT_US)} ${this.props.defaultTime}`,
        `${DatePickerField.DATE_FORMAT_US} ${DatePickerField.TIME_FORMAT}`)
    return {
      dateText: date ? DatePickerField.formatDateWithLocale(date, this.props.locale) : '',
      timeText: date ? format(date, DatePickerField.TIME_FORMAT) : '',
      defaultDate,
      style: {}, // initialized on properties init detection
    }
  })()

  /** Date picker ref */
  datePicker = React.createRef()

  /** Date picker ref */
  timePicker = React.createRef()

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const nextState = { ...this.state }
    const {
      value, displayTime, fullWidth, style,
    } = newProps
    if (oldProps.value !== value) {
      nextState.dateText = value ? DatePickerField.formatDateWithLocale(value, this.props.locale) : ''
      nextState.timeText = value ? format(value, DatePickerField.TIME_FORMAT) : ''
    }
    if (oldProps.displayTime !== displayTime
      || oldProps.fullWidth !== fullWidth
      || oldProps.style !== style) {
      nextState.style = {
        ...style,
        ...(fullWidth ? DatePickerField.FULL_WIDTH_STYLE : DatePicker.DEFAULT_STYLE),
      }
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
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
   * @param {*} event propagated on change
   */
  handleDateInputBlur = (event) => {
    const dateText = event.currentTarget.value
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
   * @param {*} event propagated on change
   */
  handleTimeInputBlur = (event) => {
    const timeText = event.currentTarget.value
    let parsedDate
    const { value, onChange, locale } = this.props
    const { dateText } = this.state
    let newDateText
    if (!isEmpty(timeText)) {
      if (dateText) {
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

  /** User callback, focus date field */
  onDateInputFocus = () => this.datePicker.current.focus()

  /** User callback, focus time field */
  onTimeInputFocus = () => this.timePicker.current.focus()

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
          ref={this.timePicker}
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
        onBlur={this.handleTimeInputBlur}
        disabled={disabled}
        title={tooltip}
      />,
      // 3 - Show dialog button
      <IconButton
        key="time.selector.button"
        style={DatePickerField.iconStyle}
        onClick={this.onTimeInputFocus}
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
          formatDate={DatePickerField.formatDateForInput}
          autoOk={this.props.autoOk}
          okLabel={this.props.okLabel}
          cancelLabel={this.props.cancelLabel}
          container="inline"
          fullWidth
          onChange={this.handleChangeDatePicker}
          ref={this.datePicker}
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
        onBlur={this.handleDateInputBlur}
        disabled={disabled}
        title={tooltip}
      />,
      // 3 - Show dialog button
      <IconButton
        key="date.selector.button"
        style={DatePickerField.iconStyle}
        onClick={this.onDateInputFocus}
        disabled={disabled}
        title={tooltip}
      >
        <ActionDateRange />
      </IconButton>]
  }

  render() {
    const { style } = this.state
    const { displayTime } = this.props
    return (
      <div style={style}>
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
