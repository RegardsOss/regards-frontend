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
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import {
  FiltersPaneLineComponent,
  TableFilterSortingAndVisibilityContainer,
  TableHeaderAutoCompleteFilterContainer,
} from '@regardsoss/components'
import { UIShapes } from '@regardsoss/shape'
import { BasicArrayActions, BasicArraySelectors } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
class FilterPaneAutoCompleteField extends React.Component {
  static propTypes = {
    filtersI18n: UIShapes.FiltersI18nList,
    filterKey: PropTypes.string.isRequired,
    updateFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    useDebounce: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    arrayActions: PropTypes.instanceOf(BasicArrayActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    arraySelectors: PropTypes.instanceOf(BasicArraySelectors).isRequired, // to retrieve entities from store
  }

  static defaultProps = {
    useDebounce: true,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      filtersI18n, inputValues, filterKey, updateFilter, useDebounce,
      arrayActions, arraySelectors,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { searchPane: { autocompleteStyle } } } = this.context
    const hintTextKey = get(filtersI18n, `${filterKey}.hintTextKey`, '')
    return (
      <FiltersPaneLineComponent
        label={formatMessage({ id: filtersI18n[filterKey].labelKey })}
      >
        <TableHeaderAutoCompleteFilterContainer
          id={`pane.${filterKey}`}
          key={`pane.${filterKey}.auto`}
          hintText={!isEmpty(hintTextKey) ? formatMessage({ id: filtersI18n[filterKey].hintTextKey }) : hintTextKey}
          onChangeText={(value) => updateFilter(value, filterKey, useDebounce)}
          text={get(inputValues, filterKey, '')}
          arrayActions={arrayActions}
          arraySelectors={arraySelectors}
          fullWidth
          style={autocompleteStyle}
        />
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneAutoCompleteField
