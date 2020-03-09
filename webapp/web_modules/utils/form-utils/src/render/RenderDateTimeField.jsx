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
import isDate from 'lodash/isDate'
import IconButton from 'material-ui/IconButton'
import Clear from 'mdi-material-ui/Backspace'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { DatePickerField } from '@regardsoss/components'
import styles from '../styles'


/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28
 * ----------  ------
 *    date      time
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 * @author Sébastien Binda
 */
export class RenderDateTimeField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    displayTime: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    fullWidth: PropTypes.bool,
  }

  static defaultProps = {
    displayTime: true,
    fullWidth: false,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  onChangeDate = (newDate) => {
    const { input: { onChange } } = this.props
    onChange(newDate)
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
    const {
      intl, input, label, displayTime, fullWidth,
    } = this.props
    const { moduleTheme: { dateFieldStyles } } = this.context
    const clearButtonDisplayed = !!input.value
    // At first the value is an empty string
    const dateValue = this.getDateForComponent(input.value)
    return (
      <div style={dateFieldStyles.fieldsLine}>
        <DatePickerField
          value={dateValue}
          defaultTime="00:00:00"
          dateHintText={intl.formatMessage({ id: 'form.datetimepicker.date.label' }, { label })}
          timeHintText={intl.formatMessage({ id: 'form.datetimepicker.time.label' }, { label })}
          onChange={this.onChangeDate}
          locale={intl.locale}
          displayTime={displayTime}
          fullWidth={fullWidth}
        />
        {
          clearButtonDisplayed ? (
            <IconButton
              tooltip={intl.formatMessage({ id: 'form.datetimepicker.clear' })}
            >
              <Clear onClick={this.onClearInput} />
            </IconButton>) : null
        }
      </div>
    )
  }
}


export default withModuleStyle(styles)(RenderDateTimeField)
