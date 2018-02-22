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
    value: PropTypes.date,
    displayTime: PropTypes.bool,
    dateHintText: PropTypes.string,
    timeHintText: PropTypes.string,
    defaultValue: PropTypes.date,
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

  static inconStyle = {
    opacity: '0.65',
  }

  constructor(props) {
    super(props)

    const date = isDate(props.defaultValue) ? props.defaultValue : null

    this.state = {
      dateText: date ? format(date, DatePickerField.DATE_FORMAT_US) : null,
      timeText: date ? format(date, DatePickerField.TIME_FORMAT) : null,
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
      this.setState({ dateText: format(date, DatePickerField.DATE_FORMAT_US) })
      this.props.onChange(newDate)
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
      this.setState({ timeText: format(newDate, DatePickerField.TIME_FORMAT) })
      this.props.onChange(time)
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
    let parsedDate
    if (this.state.timeText) {
      parsedDate = parse(`${dateText} ${this.state.timeText}`, `${DatePickerField.DATE_FORMAT_US} ${DatePickerField.TIME_FORMAT}`)
    } else {
      parsedDate = parse(dateText, DatePickerField.DATE_FORMAT_US)
    }
    if (this.isADate(parsedDate)) {
      this.props.onChange(parsedDate)
    } else {
      this.setState({ dateText: format(this.props.value, DatePickerField.DATE_FORMAT_US) })
    }
  }

  handleDatetimeInputBlur = (timeText) => {
    let parsedDate
    if (this.state.dateText) {
      parsedDate = parse(`${this.state.dateText} ${timeText}`, `${DatePickerField.DATE_FORMAT_US} ${DatePickerField.TIME_FORMAT}`)
    } else {
      parsedDate = parse(timeText, DatePickerField.TIME_FORMAT)
    }
    if (this.isADate(parsedDate)) {
      this.props.onChange(parsedDate)
    } else {
      this.setState({ timeText: format(this.state.value, DatePickerField.TIME_FORMAT) })
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
          iconStyle={DatePickerField.iconStyle}
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
          iconStyle={DatePickerField.iconStyle}
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
            autoOk
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

    console.error('this.state', this.state)
    return (
      <div style={{ display: 'flex', width: displayTime ? '250px' : '150px' }}>
        {this.renderDate()}
        {displayTime ? this.renderTimePicker() : null}
      </div>
    )
  }
}
