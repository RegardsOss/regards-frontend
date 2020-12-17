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
import Filter from 'mdi-material-ui/Filter'
import { UIShapes } from '@regardsoss/shape'
import ApplyingCriterionComponent from '../ApplyingCriterionComponent'

/**
 * Displays a selected facet with delete option (== filter)
 * @author Raphaël Mechali
 */
class SelectedFacetComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    selectedFacetValue: UIShapes.SelectedFacetCriterion.isRequired,
    // on delete selected facet value criterion callback: SelectedFacetCriterion => ()
    onUnselectFacetValue: PropTypes.func.isRequired,
  }

  /** Icon for selected facet value criterion */
  static ICON = <Filter />

  render() {
    const { label, selectedFacetValue, onUnselectFacetValue } = this.props
    return (
      <ApplyingCriterionComponent
        label={label}
        selectedCriterion={selectedFacetValue}
        onUnselectCriterion={onUnselectFacetValue}
        filterIcon={SelectedFacetComponent.ICON}
      />
    )
  }
}

export default SelectedFacetComponent
