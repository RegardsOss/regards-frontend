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
import { AttributeModelWithBounds, formatTooltip } from '@regardsoss/plugins-api'

/**
 * Temporal attribute value selector
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriterionComponent extends React.Component {
  static propTypes = {
    searchAttribute: AttributeModelWithBounds.isRequired, // attribute
    value: PropTypes.instanceOf(Date), // selected date
    hintDate: PropTypes.string, // bound hint
    isStopDate: PropTypes.bool.isRequired, // is it range stop date (allows for 23:59:59 auto selection instead of 00:00:00)
    onDateChanged: PropTypes.func.isRequired, // on date selected callback, like (date:Date, operator:string) => ()
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  /** Default time to set up when a start date is selected */
  static DEFAULT_START_TIME = '00:00:00'

  /** Default time to set up when a stop date is selected */
  static DEFAULT_STOP_TIME = '23:59:59'

  render() {
    const {
      searchAttribute, value, hintDate,
      isStopDate, onDateChanged,
    } = this.props
    const { intl, moduleTheme } = this.context
    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNoValue = !lowerBound && !upperBound
    return (
      <div style={moduleTheme.datePickerContainerStyle}>
        <DatePickerField
          value={value}
          onChange={onDateChanged}
          style={moduleTheme.datePickerSelectorStyle}
          locale={intl.locale}
          dateHintText={hintDate ? intl.formatDate(hintDate) : intl.formatMessage({ id: 'criterion.date.field.label' })}
          timeHintText={hintDate ? intl.formatTime(hintDate) : intl.formatMessage({ id: 'criterion.time.field.label' })}
          tooltip={formatTooltip(intl, searchAttribute)}
          okLabel={intl.formatMessage({ id: 'criterion.date.picker.ok' })}
          cancelLabel={intl.formatMessage({ id: 'criterion.date.picker.cancel' })}
          defaultTime={isStopDate ? TemporalCriterionComponent.DEFAULT_STOP_TIME : TemporalCriterionComponent.DEFAULT_START_TIME}
          disabled={hasNoValue} // disable field if attribute has no value
          displayTime
        />
      </div>
    )
  }
}

export default TemporalCriterionComponent
