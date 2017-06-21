/**
 * LICENSE_PLACEHOLDER
 **/
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import { dateTimeFormat } from '@regardsoss/i18n'
import { map, values } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'

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
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    // fullWidth: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    timeFormat: PropTypes.string,
  }
  static defaultProps = {
    timeFormat: '24hr',
  }

  state = {
    searchField: undefined,
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
      margin: '0px 10px',
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

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeDate = (event, newValue) => {
    const { input: {value, onChange} } = this.props
    // Pick the time part from the time picker
    if (value) {
      newValue.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds())
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
    const { input: {value, onChange} } = this.props
    // Pick the date part from the the date picker
    if (value) {
      newValue.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())
    }
    onChange(newValue)
  }

  /**
   * Clear the entered date & time values
   */
  handleClear = () => {
    const { input: {onChange} } = this.props
    onChange(null)
  }

  render() {
    const { intl, timeFormat, label, input } = this.props
    const clearButtonDisplayed = input.value !== undefined

    console.log(input)
    return (
      <div
        style={RenderDateTimeField.style.rootContainer}
      >
        <span
          style={RenderDateTimeField.style.attributeName}
        >
          {label}
        </span>
        <DatePicker
          value={input.value}
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
          value={input.value}
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
            transform: `scale(${clearButtonDisplayed ? 1 : 0})`
          }}
        >
          <Clear onTouchTap={this.handleClear} />
        </IconButton>
      </div>
    )
  }
}

export default RenderDateTimeField
