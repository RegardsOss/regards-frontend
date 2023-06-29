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
import split from 'lodash/split'
import isDate from 'lodash/isDate'
import parseInt from 'lodash/parseInt'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import TimeIcon from 'mdi-material-ui/ClockOutline'
import ActionDateRange from 'mdi-material-ui/CalendarRange'
import { UIDomain } from '@regardsoss/domain'

const { DateUtils } = UIDomain

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

  static DEFAULT_TIME_REGEX = /^\d{2}:\d{2}:\d{2}/

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

  /** Initial state (resolved on IIFE for readability sake) */
  state = (() => {
    const {
      locale, defaultValue, value,
    } = this.props
    const initDate = isDate(defaultValue) ? defaultValue : value

    return {
      dateText: DateUtils.computeDisplayedDateText(initDate, locale),
      timeText: DateUtils.computeDisplayedTimeText(initDate),
      initDate,
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
      value, displayTime, fullWidth, style, locale,
    } = newProps
    if (oldProps.value !== value) {
      nextState.dateText = DateUtils.computeDisplayedDateText(value, locale)
      nextState.timeText = DateUtils.computeDisplayedTimeText(value)
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

  /**
   * Callback from DatePicker when a date is selected
   *
   * HACK : The selected date needs a transformation as DatePicker returns a date in the browser timeZone and we need a date
   * in UTC TimeZone (GMT+00)
   *
   * @param {*} event propagated on change
   * @param {*} date Selected date from DatePicker with browser timezone
   */
  handleChangeDatePicker = (event, date) => {
    const { value, displayTime } = this.props
    if (value) {
      // value -> contains previous selected date+time.
      // date  -> contains selected date from DatePicker with browser timezone
      // When date is selected from date Picker we need to override this date with the previous selected time.
      const newDateWithPreviousSelectedTime = DateUtils.createDateAndOverrideTime(date, value)
      // Do not transform this new calculated date to UTC if user can handle time modification as value has already been transformed as UTC
      // Tranform to UTC otherwise.
      this.handleDateChange(newDateWithPreviousSelectedTime, !displayTime)
    } else {
      // Else date is the date returnd by DatePicker with browser timezone. We need to tranform to UTC
      this.handleDateChange(date, true)
    }
  }

  /**
   * Callback from TimePicker when a DateTime is selected.
   *
   * HACK : The selected date needs a transformation as TimePicker returns a date in the browser timeZone and we need a date
   * in UTC TimeZone (GMT+00)
   *
   * @param {*} event propagated on change
   * @param {*} date Selected date from DatePicker with browser timezone
   */
  handleChangeTimePicker = (event, date) => {
    const { value } = this.props
    if (value) {
      // value -> contains previous selected date+time.
      // date  -> contains selected date from TimePicker with browser timezone
      // When date is selected from date Picker we need to override this date with the previous selected time.
      const newDateTimeWithPreviousSelectedDate = DateUtils.createDateAndOverrideDateValues(date, value)
      // Do not transform this new calculated date to UTC as value has already been transformed as UTC
      this.handleDateChange(newDateTimeWithPreviousSelectedDate, true)
    } else {
      // Else date is the date returned by DatePicker with browser timezone. We need to tranform to UTC
      this.handleDateChange(date, true)
    }
  }

  /**
   * This method, set the selected date by transformin (or not) to a UTC timeZone and calculate the associated two text fields
   * dateText and timeText.
   * @param {Date} newDate Date selected
   * @param {boolean} tranformToUTC Wehter to transform given date by removing timezone and set UTC timeZone (GMT+00)
   */
  handleDateChange = (newDate, tranformToUTC) => {
    const {
      onChange, locale, displayTime, defaultTime,
    } = this.props
    const { dateText, timeText } = this.state
    // If no time picker is used, we need to force time values either to 0 (will use current time if not) either to default time if specified
    const date = newDate
    if (!displayTime) {
      date.setHours(0, 0, 0, 0)
      if (defaultTime && DatePickerField.DEFAULT_TIME_REGEX.test(defaultTime)) {
        const defaultTimeSplit = split(defaultTime, ':')
        date.setHours(parseInt(defaultTimeSplit[0]), parseInt(defaultTimeSplit[1]), parseInt(defaultTimeSplit[2]), 0)
      }
    }
    const parsedDate = tranformToUTC ? DateUtils.parseDateToUTC(date) : date
    const newDateText = DateUtils.computeDisplayedDateText(parsedDate, locale)
    const newTimeText = DateUtils.computeDisplayedTimeText(parsedDate)
    if (dateText !== newDateText || timeText !== newTimeText) {
      this.setState({ dateText: newDateText, timeText: newTimeText },
        () => onChange(parsedDate))
    }
  }

  handleDateInputChange = (event, value) => {
    this.setState({ dateText: value })
  }

  handleDatetimeInputChange = (event, value) => {
    this.setState({ timeText: value })
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
    const { timeText } = this.state
    if (!isEmpty(dateText)) {
      const currentTimeText = timeText || defaultTime
      const parsedDate = DateUtils.createUTCDateTimeFromString(dateText, locale, currentTimeText)
      const currentDateText = DateUtils.computeDisplayedDateText(value, locale)
      this.handleInputDateChange(parsedDate, currentDateText, currentTimeText)
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
    const {
      value, onChange, locale,
    } = this.props
    const { dateText } = this.state
    if (!isEmpty(timeText)) {
      const currentDateText = dateText || DateUtils.formatDateWithLocale(new Date(), locale)
      const parsedDate = DateUtils.createUTCDateTimeFromString(currentDateText, locale, timeText)
      const currentTimeText = DateUtils.computeDisplayedTimeText(value)
      this.handleInputDateChange(parsedDate, currentDateText, currentTimeText)
    } else {
      // the user wants to remove the time
      onChange()
    }
  }

  handleInputDateChange = (newDate, rollBackDateText, rollBackTimeText) => {
    const { onChange } = this.props
    if (isDate(newDate)) {
      // the date is valid, let's save it
      onChange(newDate)
    } else {
      // the date is invalid, let's rollback
      this.setState({
        dateText: rollBackDateText,
        timeText: rollBackTimeText,
      })
    }
  }

  /** User callback, focus date field */
  onDateInputFocus = () => this.datePicker.current.focus()

  /** User callback, focus time field */
  onTimeInputFocus = () => this.timePicker.current.focus()

  /**
   * Renders time picker components
   *
   * HACK : As TimePicker works with date in browser TimeZone, we need to transform
   * the previous selected date to the browser TimeZone.
   *
   * @return {[React.Component]} built components array
   */
  renderTimePicker() {
    const {
      id, fullWidth, errorText, value,
      timeHintText, disabled, tooltip,
    } = this.props

    // If date is defined, the date was selected in UTC GMT+00 but saved in local timeZone.
    // So to tranform this date, substract the timeZone from the given date before pass it to TimePicker.
    const dateValue = DateUtils.substractUTCOffset(value)

    return [
      // 1 - hidden time picker (just for it to show the dialog)
      <div key="hidden.time.field" style={DatePickerField.datePickerContainerStyle}>
        <TimePicker
          id={`${id}-timePicker`}
          floatingLabelText=""
          value={dateValue}
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
