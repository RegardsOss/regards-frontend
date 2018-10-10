/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DatePickerField } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28      59
 * ----------  ------    -------
 *    date      time    seconds
 *
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriteriaComponent extends React.Component {
  static propTypes = {
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * value: The value of the field as a Date
     */
    onChange: PropTypes.func,
    /** Current value */
    value: PropTypes.instanceOf(Date),
    /**
     * If true, hours will be auto-completed with the maximum value
     * Default to false
     */
    isStopDate: PropTypes.bool,
    /** Optional: tooltip */
    tooltip: PropTypes.string,
    /** Optional hint date */
    hintDate: PropTypes.string,
    /** Optional: disabled state */
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    isStopDate: false,
  }


  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Date} newValue The new value of the date field.
   */
  handleChangeDate = (newValue) => {
    const {
      onChange,
    } = this.props

    onChange(newValue)
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = (comparator) => {
    const { onChange, value } = this.props
    onChange(value, comparator)
  }

  /**
   * Extract the seconds value to inject in the field input
   *
   * @param {Date} date
   */
  formatSeconds = date => date ? date.getSeconds() : ''

  render() {
    const {
      value, hintDate, tooltip,
      disabled, isStopDate,
    } = this.props
    const {
      intl: {
        formatMessage, formatTime, formatDate, locale,
      }, moduleTheme,
    } = this.context

    return (
      <div style={moduleTheme.datePickerContainerStyle}>
        <DatePickerField
          value={value}
          onChange={this.handleChangeDate}
          style={moduleTheme.datePickerSelectorStyle}
          locale={locale}
          dateHintText={hintDate ? formatDate(hintDate) : formatMessage({ id: 'criterion.date.field.label' })}
          timeHintText={hintDate ? formatTime(hintDate) : formatMessage({ id: 'criterion.time.field.label' })}
          tooltip={tooltip}
          okLabel={formatMessage({ id: 'criterion.date.picker.ok' })}
          cancelLabel={formatMessage({ id: 'criterion.date.picker.cancel' })}
          defaultTime={isStopDate ? '23:59:59' : '00:00:00'}
          disabled={disabled}
          displayTime
        />
      </div>
    )
  }
}

export default TemporalCriteriaComponent
