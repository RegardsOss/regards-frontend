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
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'

/**
* Displays a selected facet with delete option (== filter)
*/
class SelectedFacetComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    selectedFacetValue: UIShapes.SelectedFacetCriterion.isRequired,
    // on delete selected facet value criterion callback: SelectedFacetCriterion => ()
    onUnselectFacetValue: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: user unselected this facet value
   */
  onUnselectFacetValue = () => {
    const { onUnselectFacetValue, selectedFacetValue } = this.props
    onUnselectFacetValue(selectedFacetValue)
  }

  render() {
    const { label } = this.props
    const { moduleTheme: { user: { filters } } } = this.context
    return (
      <Chip style={filters.style} onRequestDelete={this.onUnselectFacetValue}>
        {
          label
        }
      </Chip>
    )
  }
}


export default SelectedFacetComponent
