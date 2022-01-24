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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { DatePickerField, NumericalComparatorSelector, DateValueRender } from '@regardsoss/components'
import { AttributeModelWithBounds, formatTooltip } from '@regardsoss/plugins-api'

/**
 * Main plugin component
 * @author Raphaël Mechali
 */
class TemporalCriterionComponent extends React.Component {
  static propTypes = {
    pluginInstanceId: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    label: UIShapes.IntlMessage.isRequired,
    searchAttribute: AttributeModelWithBounds.isRequired,
    value: PropTypes.instanceOf(Date),
    operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators),
    availableComparators: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    onDateChanged: PropTypes.func.isRequired,
    onOperatorSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access through this.context
    ...i18nContextType,
  }

  /** Error placeholder */
  static ERROR_TEXT_PLACEHOLDER = ' '

  render() {
    const { muiTheme, intl, moduleTheme: { datePickerCell } } = this.context
    const {
      pluginInstanceId, error, label,
      searchAttribute, value,
      operator, availableComparators,
      onDateChanged, onOperatorSelected,
    } = this.props

    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNoValue = !lowerBound && !upperBound
    // Hint text computing: when lower than is selected, show lower bound, show upper bound otherwise (show bound limit)
    let hintTextDate = null
    if (operator === CommonDomain.EnumNumericalComparator.LE && lowerBound) {
      hintTextDate = lowerBound
    } else if (operator === CommonDomain.EnumNumericalComparator.GE && upperBound) {
      hintTextDate = upperBound
    }
    return (
      <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
        {/* 1. Label */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
          {label[intl.locale] || searchAttribute.label}
        </td>
        {/* 2. Comparison selector */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <NumericalComparatorSelector
            operator={operator}
            operators={availableComparators}
            onSelect={onOperatorSelected}
            disabled={hasNoValue}
          />
        </td>
        {/* 3. Date selection */}
        <td style={datePickerCell}>
          <DatePickerField
            id={pluginInstanceId}
            value={value}
            onChange={onDateChanged}
            locale={intl.locale}
            errorText={error ? TemporalCriterionComponent.ERROR_TEXT_PLACEHOLDER : null}
            dateHintText={hintTextDate
              ? DateValueRender.getFormattedDate(hintTextDate, DateValueRender.DEFAULT_FORMATTERS.date, intl.formatMessage)
              : intl.formatMessage({ id: 'criterion.date.field.label' })}
            timeHintText={hintTextDate
              ? DateValueRender.getFormattedDate(hintTextDate, DateValueRender.DEFAULT_FORMATTERS.time, intl.formatMessage)
              : intl.formatMessage({ id: 'criterion.time.field.label' })}
            okLabel={intl.formatMessage({ id: 'criterion.picker.ok.label' })}
            cancelLabel={intl.formatMessage({ id: 'criterion.picker.cancel.label' })}
            disabled={hasNoValue} // disable when no value in current context
            tooltip={formatTooltip(intl, searchAttribute)} // format tooltip using parent method
            displayTime
            fullWidth
          />
        </td>
      </tr>
    )
  }
}
export default TemporalCriterionComponent
