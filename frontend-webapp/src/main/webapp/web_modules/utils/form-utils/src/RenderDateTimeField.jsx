/**
 * LICENSE_PLACEHOLDER
 **/
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import { dateTimeFormat } from '@regardsoss/i18n'
import isDate from 'lodash/isDate'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import { themeContextType } from '@regardsoss/theme'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28
 * ----------  ------
 *    date      time
 *
 *  @author Xavier-Alexandre Brochard
 *  @author Léo Mieulet
 */
export class RenderDateTimeField extends React.Component {

  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    timeFormat: PropTypes.string,
  }

  static defaultProps = {
    timeFormat: '24hr',
  }


  static contextTypes = {
    ...themeContextType,
  }

  static style = {
    rootContainer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    attributeName: {
      margin: '0px 10px',
      fontSize: '1.1em',
    },
    datePicker: {
      margin: '0 10px 0 0',
    },
    datePickerText: {
      maxWidth: 85,
      top: -13,
    },
    timePickerText: {
      maxWidth: 40,
      top: -13,
    },
  }

  getLabel = () => {
    const { label } = this.props
    if (label) {
      return (
        <span style={RenderDateTimeField.style.attributeName}>
          {label} (UTC)
        </span>
      )
    }
    return null
  }

  /**
   * Return a usable date or null (which is correct for the subcomponent DatePicker & TimePicker)
   * @param value
   * @returns {*}
   */
  getDateForComponent = (value) => {
    if (isDate(value)) {
      return value
    }
    if (Date.parse(value) > 0) {
      return new Date(value)
    }
    return null
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeDate = (event, newValue) => {
    const { input: { value, onChange } } = this.props
    const parsedDate = this.getDateForComponent(value)
    // Pick the time part from the time picker
    if (isDate(parsedDate)) {
      newValue.setHours(parsedDate.getHours(), parsedDate.getMinutes(), parsedDate.getSeconds(), parsedDate.getMilliseconds())
    }
    onChange(newValue)
  }

  /**
   * Callback function that is fired when the time value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeTime = (event, newValue) => {
    const { input: { value, onChange } } = this.props
    const parsedDate = this.getDateForComponent(value)
    // Pick the date part from the the date picker
    if (isDate(parsedDate)) {
      newValue.setFullYear(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())
    }
    onChange(newValue)
  }

  /**
   * Clear the entered date & time values
   */
  handleClear = () => {
    const { input: { onChange } } = this.props
    onChange(null)
  }

  render() {
    const { intl, timeFormat, input } = this.props
    const clearButtonDisplayed = input.value !== undefined
    // At first the value is an empty string
    const dateValue = this.getDateForComponent(input.value)
    return (
      <div
        style={RenderDateTimeField.style.rootContainer}
      >
        {this.getLabel()}
        <DatePicker
          value={dateValue}
          onChange={this.handleChangeDate}
          DateTimeFormat={dateTimeFormat}
          locale="fr"
          hintText={intl.formatMessage({ id: 'form.datetimepicker.date.label' })}
          floatingLabelText={intl.formatMessage({ id: 'form.datetimepicker.date.label' })}
          okLabel={intl.formatMessage({ id: 'form.datetimepicker.ok' })}
          cancelLabel={intl.formatMessage({ id: 'form.datetimepicker.cancel' })}
          style={RenderDateTimeField.style.datePicker}
          textFieldStyle={RenderDateTimeField.style.datePickerText}
        />
        <TimePicker
          value={dateValue}
          onChange={this.handleChangeTime}
          format={timeFormat}
          floatingLabelText={intl.formatMessage({ id: 'form.datetimepicker.time.label' })}
          hintText={intl.formatMessage({ id: 'form.datetimepicker.time.label' })}
          okLabel={intl.formatMessage({ id: 'form.datetimepicker.ok' })}
          cancelLabel={intl.formatMessage({ id: 'form.datetimepicker.cancel' })}
          textFieldStyle={RenderDateTimeField.style.timePickerText}
        />
        <IconButton
          tooltip={intl.formatMessage({ id: 'form.datetimepicker.clear' })}
          style={{
            transform: `scale(${clearButtonDisplayed ? 1 : 0})`,
          }}
        >
          <Clear onTouchTap={this.handleClear} />
        </IconButton>
      </div>
    )
  }
}

export default RenderDateTimeField
