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
import { DatePicker, TimePicker, IconButton, TextField } from 'material-ui'
import isNaN from 'lodash/isNaN'
import isDate from 'lodash/isDate'
import TimeIcon from 'material-ui/svg-icons/device/access-time'
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
import format from 'date-fns/format'
import parse from 'date-fns/parse'

/**
 * Overrides DatePicker from material UI to allow manual text fill and use of time picker
 * @author Sébastien Binda
 */
export default class DatePickerField extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    displayTime: PropTypes.bool,
    dateHintText: PropTypes.string,
    timeHintText: PropTypes.string,
    defaultValue: PropTypes.instanceOf(Date),
    autoOk: PropTypes.bool,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    locale: PropTypes.string,
  }

  static defaultProps = {
    displayTime: false,
    locale: 'en',
  }

  static DATE_FORMAT_US = 'MM/DD/YYYY'
  static DATE_FORMAT = 'DD/MM/YYYY'
  static TIME_FORMAT = 'HH:mm:ss'

  static dateTextFieldStyle = {
    width: '90px',
  }

  static timeTextFieldStyle = {
    width: '70px',
  }

  static iconStyle = {
    opacity: '0.65',
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
        return dateString ? parse(`${dateString} ${timeString}`, `${DatePickerField.DATE_FORMAT_US} ${DatePickerField.TIME_FORMAT}`) :
          parse(`${timeString}`, DatePickerField.TIME_FORMAT)
      }
      return dateString ? parse(`${dateString}`, DatePickerField.DATE_FORMAT_US) : ''
    }
    const usDateString = DatePickerField.getUsDate(dateString)
    if (timeString) {
      return dateString ? parse(`${usDateString} ${timeString}`, `${DatePickerField.DATE_FORMAT} ${DatePickerField.TIME_FORMAT}`) :
        parse(`${timeString}`, DatePickerField.TIME_FORMAT)
    }
    return dateString ? parse(usDateString, DatePickerField.DATE_FORMAT_US) : null
  }

  constructor(props) {
    super(props)

    const date = isDate(props.defaultValue) ? props.defaultValue : props.value

    this.state = {
      dateText: date ? DatePickerField.formatDateWithLocale(date, props.locale) : '',
      timeText: date ? format(date, DatePickerField.TIME_FORMAT) : '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleChangeDatePicker(null, nextProps.value)
      this.handleChangeTimePicker(null, nextProps.value)
    }
  }

  handleChangeDatePicker = (event, date) => {
    if (!date) {
      this.setState({ dateText: '' })
    } else {
      const { value } = this.props
      const newDate = new Date()
      newDate.setFullYear(date.getFullYear())
      newDate.setMonth(date.getMonth())
      newDate.setDate(date.getDate())
      if (value) {
        newDate.setHours(value.getHours())
        newDate.setMinutes(value.getMinutes())
        newDate.setSeconds(value.getSeconds())
      }
      const newDateText = DatePickerField.formatDateWithLocale(date, this.props.locale)
      if (this.state.dateText !== newDateText) {
        this.setState({ dateText: newDateText },
          () => this.props.onChange(newDate))
      }
    }
  }

  handleChangeTimePicker = (event, time) => {
    if (!time) {
      this.setState({ timeText: '' })
    } else {
      const { value } = this.props
      const newDate = new Date()
      if (value) {
        newDate.setFullYear(value.getFullYear())
        newDate.setMonth(value.getMonth())
        newDate.setDate(value.getDate())
      }
      newDate.setHours(time.getHours())
      newDate.setMinutes(time.getMinutes())
      newDate.setSeconds(time.getSeconds())
      const newTimeText = format(newDate, DatePickerField.TIME_FORMAT)
      if (this.state.timeText !== newTimeText) {
        this.setState({ timeText: newTimeText },
          () => this.props.onChange(time))
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

  handleDateInputBlur = (dateText) => {
    const { value, locale, onChange } = this.props
    const { timeText } = this.state
    let parsedDate
    if (this.state.timeText) {
      parsedDate = DatePickerField.parseDateWithLocale(dateText, locale, timeText)
    } else {
      parsedDate = DatePickerField.parseDateWithLocale(dateText, locale)
    }
    if (this.isADate(parsedDate)) {
      onChange(parsedDate)
    } else {
      this.setState({ dateText: DatePickerField.formatDateWithLocale(value, locale) })
    }
  }

  handleDatetimeInputBlur = (timeText) => {
    let parsedDate
    const { value, onChange, locale } = this.props
    const { dateText } = this.state
    if (dateText) {
      parsedDate = DatePickerField.parseDateWithLocale(dateText, locale, timeText)
    } else {
      parsedDate = DatePickerField.parseDateWithLocale(dateText, locale)
    }
    if (this.isADate(parsedDate)) {
      onChange(parsedDate)
    } else {
      this.setState({ timeText: format(value, DatePickerField.TIME_FORMAT) })
    }
  }

  renderTimePicker() {
    const datePickerMargin = '-185px'
    const { timeHintText } = this.props

    return (
      <div style={{ display: 'flex', width: '100px' }}>
        <TextField
          style={DatePickerField.timeTextFieldStyle}
          value={this.state.timeText}
          hintText={timeHintText}
          onChange={this.handleDatetimeInputChange}
          onBlur={event => this.handleDatetimeInputBlur(event.currentTarget.value)}
        />

        <IconButton
          style={DatePickerField.iconStyle}
          onClick={() => this.datetimePicker.focus()}
        >
          <TimeIcon />
        </IconButton>

        <div style={{ width: '0px', height: '0px', marginLeft: datePickerMargin }}>
          <TimePicker
            id="timePicker"
            floatingLabelText=""
            value={this.props.value}
            errorText=""
            container="inline"
            disabled={false}
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
        </div>
      </div>
    )
  }

  renderDate() {
    const datePickerMargin = '-185px'
    const { dateHintText } = this.props

    return (
      <div style={{ display: 'flex', width: '140px' }}>
        <TextField
          style={DatePickerField.dateTextFieldStyle}
          value={this.state.dateText}
          hintText={dateHintText}
          onChange={this.handleDateInputChange}
          onBlur={event => this.handleDateInputBlur(event.currentTarget.value)}
        />

        <IconButton
          style={DatePickerField.iconStyle}
          onClick={() => this.datePicker.focus()}
        >
          <ActionDateRange />
        </IconButton>

        <div style={{ width: '0px', height: '0px', marginLeft: datePickerMargin }}>
          <DatePicker
            id="dataPicker"
            floatingLabelText=""
            value={this.props.value}
            errorText=""
            disabled={false}
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
        </div>
      </div>
    )
  }

  render() {
    const { displayTime } = this.props
    return (
      <div style={{ display: 'flex', width: displayTime ? '250px' : '150px' }}>
        {this.renderDate()}
        {displayTime ? this.renderTimePicker() : null}
      </div>
    )
  }
}
