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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {
  FiltersPaneLineComponent,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Legacy select field, used only for unique value filter
 * @author Théo Lasserre
 */
class FilterPaneSelectFieldLegacy extends React.Component {
  static propTypes = {
    filtersI18n: UIShapes.FiltersI18nList,
    filterKey: PropTypes.string.isRequired,
    updateFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    allValuesOption: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    allValuesOption: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      filtersI18n, updateFilter, filterKey, inputValues, allValuesOption,
      children,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const hintTextKey = get(filtersI18n, `${filterKey}.hintTextKey`, '')
    const labelKey = get(filtersI18n, `${filterKey}.labelKey`, '')
    return (
      <FiltersPaneLineComponent
        label={!isEmpty(labelKey) ? formatMessage({ id: labelKey }) : null}
      >
        <SelectField
          id={`pane.${filterKey}`}
          value={get(inputValues, filterKey, null)}
          onChange={(event, index, value) => updateFilter(value, filterKey)}
          fullWidth
          hintText={!isEmpty(hintTextKey) ? formatMessage({ id: hintTextKey }) : hintTextKey}
        >
          {
            allValuesOption ? <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'filter.pane.select.field.any' })} /> : null
          }
          {children}
        </SelectField>
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneSelectFieldLegacy
