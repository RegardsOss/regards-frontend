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
import Chip from 'material-ui/Chip'
import { themeContextType } from '@regardsoss/theme'
import { FilterShape } from '../../../../models/facets/FilterShape'

/**
* Displays a selected facet with delete option (== filter)
*/
class SelectedFacetComponent extends React.Component {
  static propTypes = {
    filter: FilterShape.isRequired,
    // on delete filter
    onDeleteFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  onDelete = () => {
    const { onDeleteFilter, filter } = this.props
    onDeleteFilter(filter)
  }

  render() {
    const { filter: { filterLabel } } = this.props
    const { moduleTheme: { user: { filters } } } = this.context
    return (
      <Chip style={filters.style} onRequestDelete={this.onDelete} >
        {filterLabel}
      </Chip>
    )
  }
}


export default SelectedFacetComponent
