/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import {
  FiltersPaneLineComponent,
  TableFilterSortingAndVisibilityContainer,
  TableHeaderAutoCompleteFilter,
} from '@regardsoss/components'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Legacy autocomplete field, used only when hint cannot be retrieved directly from an endpoint
 * @author Théo Lasserre
 */
class FilterPaneAutoCompleteFieldLegacy extends React.Component {
  static propTypes = {
    filtersI18n: UIShapes.FiltersI18nList,
    filterKey: PropTypes.string.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    currentHints: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.objectOf(PropTypes.any)]).isRequired,
    isFetching: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    onUpdateInput: PropTypes.func.isRequired,
    onFilterSelected: PropTypes.func.isRequired,
    prepareHints: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      filtersI18n, inputValues, filterKey, currentHints, isFetching, noData, onUpdateInput,
      onFilterSelected, prepareHints,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { searchPane: { autocompleteStyle } } } = this.context
    const hintTextKey = get(filtersI18n, `${filterKey}.hintTextKey`, '')
    const labelKey = get(filtersI18n, `${filterKey}.labelKey`, '')
    return (
      <FiltersPaneLineComponent
        label={!isEmpty(labelKey) ? formatMessage({ id: labelKey }) : null}
      >
        <TableHeaderAutoCompleteFilter
          id={`pane.${filterKey}`}
          key={`pane.${filterKey}.auto`}
          hintText={!isEmpty(hintTextKey) ? formatMessage({ id: filtersI18n[filterKey].hintTextKey }) : hintTextKey}
          text={get(inputValues, filterKey, '')}
          currentHints={currentHints}
          isFetching={isFetching}
          noData={noData}
          onUpdateInput={onUpdateInput}
          onFilterSelected={onFilterSelected}
          prepareHints={prepareHints}
          fullWidth
          style={autocompleteStyle}
        />
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneAutoCompleteFieldLegacy
