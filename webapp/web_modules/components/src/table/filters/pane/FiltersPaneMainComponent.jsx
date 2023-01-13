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
import { themeContextType } from '@regardsoss/theme'
import { UIShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'

/**
 * @author Théo Lasserre
 */
class FiltersPaneMainComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func,
    updateDatesFilter: PropTypes.func,
    updateValuesFilter: PropTypes.func,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    filters18n: UIShapes.Filtersi18nList.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      children, updateFilter, inputValues, filters18n, updateDatesFilter, updateValuesFilter,
    } = this.props
    const {
      moduleTheme: { searchPane: { childrenStyles: { mainDivStyle } } },
    } = this.context
    return (
      <div style={mainDivStyle}>
        {
          React.Children.map(children, (child) => React.cloneElement(child, {
            ...child.props,
            updateFilter,
            inputValues,
            filters18n,
            updateDatesFilter,
            updateValuesFilter,
          }))
        }
      </div>
    )
  }
}
export default FiltersPaneMainComponent
