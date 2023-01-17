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
import get from 'lodash/get'
import {
  DatePickerField,
  FiltersPaneLineComponent,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { UIShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
class FilterPaneDatePickerField extends React.Component {
  static propTypes = {
    filtersI18n: UIShapes.FiltersI18nList,
    filterKey: PropTypes.string.isRequired,
    updateDatesFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    multiline: PropTypes.bool,
    displayTime: PropTypes.bool,
  }

  static defaultProps = {
    multiline: false,
    displayTime: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getFilterDateValue = (inputValues, filterKey, dateParameter) => {
    const dateParam = get(inputValues, `${filterKey}.${dateParameter}`, null)
    if (dateParam) {
      return new Date(dateParam)
    }
    return null
  }

  render() {
    const {
      filtersI18n, updateDatesFilter, filterKey, inputValues, multiline, displayTime,
    } = this.props
    const { intl: { formatMessage, locale } } = this.context
    return (
      <FiltersPaneLineComponent
        label={formatMessage({ id: filtersI18n[filterKey].labelKey })}
        multiline={multiline}
      >
        <DatePickerField
          id={`pane.${filterKey}`}
          dateHintText={formatMessage({ id: 'filter.pane.date.after.hintText' })}
          onChange={(value) => updateDatesFilter(value, filterKey, CommonDomain.REQUEST_PARAMETERS.AFTER)}
          value={this.getFilterDateValue(inputValues, filterKey, CommonDomain.REQUEST_PARAMETERS.AFTER)}
          locale={locale}
          fullWidth
          displayTime={displayTime}
          timeHintText={formatMessage({ id: 'filter.pane.hour.after.hintText' })}
        />
        <DatePickerField
          id={`pane.${filterKey}`}
          dateHintText={formatMessage({ id: 'filter.pane.date.before.hintText' })}
          locale={locale}
          onChange={(value) => updateDatesFilter(value, filterKey, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
          value={this.getFilterDateValue(inputValues, filterKey, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
          defaultTime="23:59:59"
          fullWidth
          displayTime={displayTime}
          timeHintText={formatMessage({ id: 'filter.pane.hour.before.hintText' })}
        />
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneDatePickerField
