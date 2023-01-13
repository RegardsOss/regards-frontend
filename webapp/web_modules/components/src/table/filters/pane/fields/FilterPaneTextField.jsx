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
import TextField from 'material-ui/TextField'
import get from 'lodash/get'
import {
  FiltersPaneLineComponent,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
class FilterPaneTextField extends React.Component {
  static propTypes = {
    filters18n: UIShapes.Filtersi18nList,
    filterKey: PropTypes.string.isRequired,
    updateFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    useDebounce: PropTypes.bool,
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
      filters18n, inputValues, filterKey, updateFilter, useDebounce,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const hintTextKey = get(filters18n, `${filterKey}.hintTextKey`, '')
    return (
      <FiltersPaneLineComponent
        label={formatMessage({ id: filters18n[filterKey].labelKey })}
      >
        <TextField
          id={`pane.${filterKey}`}
          hintText={!isEmpty(hintTextKey) ? formatMessage({ id: filters18n[filterKey].hintTextKey }) : hintTextKey}
          value={get(inputValues, filterKey, '')}
          onChange={(event, value) => updateFilter(value, filterKey, useDebounce)}
          fullWidth
        />
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneTextField
