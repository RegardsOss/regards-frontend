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
import isDate from 'lodash/isDate'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/backspace'
import { dateTimeFormat } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import RenderHelper from './RenderHelper'

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
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    timeFormat: PropTypes.string,
  }

  static defaultProps = {
    timeFormat: '24hr',
  }


  static contextTypes = {
    ...themeContextType,
  }

  static STYLES = {
    fieldsLine: {
      marginTop: '14px',
      height: '58px',
      display: 'flex',
      alignItems: 'center',
    },
    datePicker: {
      margin: '0 10px 0 0',
      flexGrow: 1,
    },
    datePickerText: {
      width: '100%',
      top: -13,
    },
    timePicker: {
      flexGrow: 1,
    },
    timePickerText: {
      width: '100%',
      top: -13,
    },
  }


  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  onChangeDate = (event, newValue) => {
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
  onChangeTime = (event, newValue) => {
    const { input: { value, onChange } } = this.props
    const parsedDate = this.getDateForComponent(value)
    // Pick the date part from the the date picker
    if (isDate(parsedDate)) {
      newValue.setFullYear(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())
    }
    onChange(newValue)
    this.onTouched() // make sure the field is marked as touched
  }

  /**
   * Clear the entered date & time values
   */
  onClearInput = () => {
    const { input: { onChange } } = this.props
    onChange(null)
    this.onTouched() // make sure the field is marked as touched
  }
  /**
   * On any field dialog dismissed: make sure the whole field is marked as touched (allow showing errors)
   */
  onFieldDialogDismissed = () => this.onTouched() // make sure the field is marked as touched

  /**
   * On touched: propagate touched event to redux-form
   */
  onTouched = () => {
    const { input: { onBlur }, meta: { touched } } = this.props
    if (!touched) {
      onBlur()
    }
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

  render() {
    const { intl, label, timeFormat, input, meta: { touched, error } } = this.props
    const clearButtonDisplayed = !!input.value
    const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
    // At first the value is an empty string
    const dateValue = this.getDateForComponent(input.value)
    return (
      <div style={RenderDateTimeField.STYLES.fieldsLine} >
        <DatePicker
          value={dateValue}
          onChange={this.onChangeDate}
          DateTimeFormat={dateTimeFormat}
          locale="fr"
          hintText={intl.formatMessage({ id: 'form.datetimepicker.date.label' }, { label })}
          floatingLabelText={intl.formatMessage({ id: 'form.datetimepicker.date.label' }, { label })}
          okLabel={intl.formatMessage({ id: 'form.datetimepicker.ok' })}
          cancelLabel={intl.formatMessage({ id: 'form.datetimepicker.cancel' })}
          style={RenderDateTimeField.STYLES.datePicker}
          textFieldStyle={RenderDateTimeField.STYLES.datePickerText}
          onFocus={this.onInnerFieldFocus}
          onDismiss={this.onFieldDialogDismissed}
          errorText={errorMessage}
        />
        <TimePicker
          value={dateValue}
          onChange={this.onChangeTime}
          format={timeFormat}
          floatingLabelText={intl.formatMessage({ id: 'form.datetimepicker.time.label' }, { label })}
          hintText={intl.formatMessage({ id: 'form.datetimepicker.time.label' }, { label })}
          okLabel={intl.formatMessage({ id: 'form.datetimepicker.ok' })}
          cancelLabel={intl.formatMessage({ id: 'form.datetimepicker.cancel' })}
          style={RenderDateTimeField.STYLES.timePicker}
          textFieldStyle={RenderDateTimeField.STYLES.timePickerText}
          onDismiss={this.onFieldDialogDismissed}
          errorText={errorMessage ? ' ' : null} // small hack here to show the error style but not message in double
        />
        {
          clearButtonDisplayed ? (
            <IconButton
              tooltip={intl.formatMessage({ id: 'form.datetimepicker.clear' })}
              style={RenderDateTimeField.STYLES.clearButton}
            >
              <Clear onTouchTap={this.onClearInput} />
            </IconButton>) : null
        }
      </div>
    )
  }
}

export default RenderDateTimeField
