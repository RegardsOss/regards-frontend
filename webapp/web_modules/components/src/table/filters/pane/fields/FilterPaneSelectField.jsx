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
import isEmpty from 'lodash/isEmpty'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {
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
class FilterPaneSelectField extends React.Component {
  static propTypes = {
    filtersI18n: UIShapes.FiltersI18nList,
    filterKey: PropTypes.string.isRequired,
    updateValuesFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    allValuesOption: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    allValuesOption: false,
    disabled: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      filtersI18n, updateValuesFilter, filterKey, inputValues, allValuesOption,
      children, disabled,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const hintTextKey = get(filtersI18n, `${filterKey}.hintTextKey`, '')
    return (
      <FiltersPaneLineComponent
        label={formatMessage({ id: filtersI18n[filterKey].labelKey })}
      >
        <SelectField
          id={`pane.${filterKey}`}
          onChange={(event, index, value) => updateValuesFilter(value, filterKey)}
          value={get(inputValues, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.VALUES}`)}
          fullWidth
          multiple
          hintText={!isEmpty(hintTextKey) ? formatMessage({ id: hintTextKey }) : hintTextKey}
          disabled={disabled}
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
export default FilterPaneSelectField
