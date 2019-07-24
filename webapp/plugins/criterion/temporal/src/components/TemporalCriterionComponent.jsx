/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DatePickerField, NumericalComparator } from '@regardsoss/components'
import { AttributeModelWithBounds, formatTooltip } from '@regardsoss/plugins-api'

/**
 * Main plugin component
 * @author Raphaël Mechali
 */
class TemporalCriterionComponent extends React.Component {
  static propTypes = {
    // attribute currently searched
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
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  render() {
    const { moduleTheme: { rootStyle, labelSpanStyle, datePickerStyle }, intl } = this.context
    const {
      searchAttribute, value, operator, availableComparators,
      onDateChanged, onOperatorSelected,
    } = this.props

    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNoValue = !lowerBound && !upperBound

    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>{searchAttribute.label}</span>
        <NumericalComparator
          onChange={onOperatorSelected}
          value={operator}
          comparators={availableComparators}
          disabled={hasNoValue} // disable when no value for attribute in current context
        />
        <DatePickerField
          value={value}
          onChange={onDateChanged}
          locale={intl.locale}
          style={datePickerStyle}
          dateHintText={intl.formatMessage({ id: 'criterion.date.field.label' })}
          timeHintText={intl.formatMessage({ id: 'criterion.time.field.label' })}
          okLabel={intl.formatMessage({ id: 'criterion.picker.ok.label' })}
          cancelLabel={intl.formatMessage({ id: 'criterion.picker.cancel.label' })}
          disabled={hasNoValue} // disable when no value in current context
          tooltip={formatTooltip(intl, searchAttribute)} // format tooltip using parent method
          displayTime
        />
      </div>
    )
  }
}
export default TemporalCriterionComponent
