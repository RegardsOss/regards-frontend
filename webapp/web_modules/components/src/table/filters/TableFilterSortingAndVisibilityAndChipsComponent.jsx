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
import { BasicSelector } from '@regardsoss/store-utils'
import { UIShapes } from '@regardsoss/shape'
import { FiltersActions } from '@regardsoss/components'
import FiltersChipsContainer from './chips/FiltersChipsContainer'
import TableFilterSortingAndVisibilityContainer from './TableFilterSortingAndVisibilityContainer'

/**
 * @author Théo
 */
export class TableFilterSortingAndVisibilityAndChipsComponent extends React.Component {
  static propTypes = {
    // components children as a function, where this container will inject select all related properties
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/no-unused-prop-types
    filtersActions: PropTypes.instanceOf(FiltersActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    filtersSelectors: PropTypes.instanceOf(BasicSelector).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
  }

  render() {
    const {
      children, filtersActions, filtersSelectors, filtersI18n, ...otherProps
    } = this.props
    return (
      <>
        <FiltersChipsContainer
          filtersActions={filtersActions}
          filtersSelectors={filtersSelectors}
          filtersI18n={filtersI18n}
        />
        <TableFilterSortingAndVisibilityContainer
          filtersActions={filtersActions}
          filtersSelectors={filtersSelectors}
          filtersI18n={filtersI18n}
          {...otherProps}
        >
          {children}
        </TableFilterSortingAndVisibilityContainer>
      </>
    )
  }
}
export default TableFilterSortingAndVisibilityAndChipsComponent
