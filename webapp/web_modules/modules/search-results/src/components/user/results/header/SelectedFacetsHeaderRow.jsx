/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ShowableAtRender } from '@regardsoss/display-control'
import { TableHeaderLine, TableHeaderContentBox } from '@regardsoss/components'

import { FilterListShape } from '../../../../models/facets/FilterShape'
import SelectedFacetComponent from '../facets/SelectedFacetComponent'

/**
 * Header line for facets and results count row
 */
class SelectedFacetsHeaderRow extends React.Component {
  static propTypes = {
    showingFacettes: PropTypes.bool.isRequired,
    filters: FilterListShape,
    onDeleteFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { showingFacettes, filters, onDeleteFilter } = this.props
    return (
      <ShowableAtRender show={showingFacettes && !!filters.length}>
        <TableHeaderLine>
          <TableHeaderContentBox>
            {
              filters.map(filter => (
                <SelectedFacetComponent
                  key={filter.filterKey}
                  filter={filter}
                  onDeleteFilter={onDeleteFilter}
                />))
            }
          </TableHeaderContentBox>
        </TableHeaderLine>
      </ShowableAtRender>
    )
  }
}
export default SelectedFacetsHeaderRow
