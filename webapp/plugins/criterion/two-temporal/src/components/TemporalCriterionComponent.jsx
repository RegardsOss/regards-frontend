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
import noop from 'lodash/noop'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DatePickerField, NumericalComparatorSelector, DateValueRender } from '@regardsoss/components'
import { AttributeModelWithBounds, formatTooltip } from '@regardsoss/plugins-api'

/**
 * Temporal attribute value selector
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriterionComponent extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    searchAttribute: AttributeModelWithBounds.isRequired, // attribute
    error: PropTypes.bool.isRequired,
    value: PropTypes.instanceOf(Date), // selected date
    lowerBound: PropTypes.bool.isRequired, // is this part the range lower bound or is it upper bound?
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

  /** Error placeholder */
  static ERROR_TEXT_PLACEHOLDER = ' '

  /** Default time to set up when a start date is selected */
  static DEFAULT_START_TIME = '00:00:00'

  /** Default time to set up when a stop date is selected */
  static DEFAULT_STOP_TIME = '23:59:59'

  /** Lower bound comparators */
  static LOWER_BOUND_COMPARATORS = [CommonDomain.EnumNumericalComparator.GE]

  /** Upper bound comparators */
  static UPPER_BOUND_COMPARATORS = [CommonDomain.EnumNumericalComparator.LE]

  render() {
    const {
      id, searchAttribute, error, value,
      lowerBound: isLowerBound,
      hintDate, isStopDate, onDateChanged,
    } = this.props
    const { intl, muiTheme, moduleTheme: { datePickerCell } } = this.context
    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNoValue = !lowerBound && !upperBound
    const operators = isLowerBound ? TemporalCriterionComponent.LOWER_BOUND_COMPARATORS : TemporalCriterionComponent.UPPER_BOUND_COMPARATORS

    return (
      <>
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <NumericalComparatorSelector
            operator={operators[0]}
            operators={operators}
            onSelect={noop}
            disabled={hasNoValue}
          />
        </td>
        <td style={datePickerCell}>
          <DatePickerField
            id={id}
            value={value}
            onChange={onDateChanged}
            locale={intl.locale}
            errorText={error ? TemporalCriterionComponent.ERROR_TEXT_PLACEHOLDER : null}
            dateHintText={hintDate
              ? DateValueRender.getFormattedDate(hintDate, DateValueRender.DEFAULT_FORMATTERS.date, intl.formatMessage)
              : intl.formatMessage({ id: 'criterion.date.field.label' })}
            timeHintText={hintDate
              ? DateValueRender.getFormattedDate(hintDate, DateValueRender.DEFAULT_FORMATTERS.time, intl.formatMessage)
              : intl.formatMessage({ id: 'criterion.time.field.label' })}
            tooltip={formatTooltip(intl, searchAttribute)}
            okLabel={intl.formatMessage({ id: 'criterion.date.picker.ok' })}
            cancelLabel={intl.formatMessage({ id: 'criterion.date.picker.cancel' })}
            defaultTime={isStopDate ? TemporalCriterionComponent.DEFAULT_STOP_TIME : TemporalCriterionComponent.DEFAULT_START_TIME}
            disabled={hasNoValue} // disable field if attribute has no value
            displayTime
            fullWidth
          />
        </td>
      </>)
  }
}

export default TemporalCriterionComponent
