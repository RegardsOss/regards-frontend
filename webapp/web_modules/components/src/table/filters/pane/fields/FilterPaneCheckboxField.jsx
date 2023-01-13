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
import Checkbox from 'material-ui/Checkbox'
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
class FilterPaneCheckboxField extends React.Component {
  static propTypes = {
    filters18n: UIShapes.Filtersi18nList,
    filterKey: PropTypes.string.isRequired,
    updateFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    // UI specified value we want to send to the backend application when the current checkbox field is checked.
    // eslint-disable-next-line react/forbid-prop-types
    uiValue: PropTypes.any,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    uiValue: null,
  }

  render() {
    const {
      filters18n, inputValues, filterKey, updateFilter, uiValue,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const filterValue = uiValue || !inputValues[filterKey]
    return (
      <FiltersPaneLineComponent
        label={formatMessage({ id: filters18n[filterKey].labelKey })}
      >
        <Checkbox
          checked={!!inputValues[filterKey]}
          onCheck={() => updateFilter(!!inputValues[filterKey] === false ? filterValue : null, filterKey)}
        />
      </FiltersPaneLineComponent>
    )
  }
}
export default FilterPaneCheckboxField
