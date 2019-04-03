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
import { connect } from '@regardsoss/redux'
import { UIShapes } from '@regardsoss/shape'
import { resultsContextActions } from '../../../../clients/ResultsContextClient'
import SelectedFacetsHeaderRowComponent from '../../../../components/user/results/header/SelectedFacetsHeaderRowComponent'


/**
 * Container to show selected facets values header row. It provides callback to delete a selected facet value and the list of values
 * currently applying to results
 * @author Raphaël Mechali
 */
export class SelectedFacetsHeaderRowContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      updateResultsContext: (moduleId, newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    // current results context
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * User callback: facet value unselected (remove it from applying facets list)
   * @param {*} selectedFacet selected facet to remove (respects SelectedFacetCriterion shape)
   * @param {*} query query for selected value
   * @param {*} facetValue selected value (one of one string, boolean, date range or number range, SelectedFacetCriterion shape)
   */
  onUnselectFacetValue = (selectedFacet) => {
    const { moduleId, updateResultsContext, resultsContext: { criteria: { appliedFacets } } } = this.props

    //  update facets in state root: remove the facet in current facets list
    updateResultsContext(moduleId, {
      criteria: {
        appliedFacets: appliedFacets.filter(facetCrit => facetCrit !== selectedFacet),
      },
    })
  }

  render() {
    const { resultsContext: { criteria: { appliedFacets } } } = this.props
    return (
      <SelectedFacetsHeaderRowComponent
        selectedFacetValues={appliedFacets}
        onUnselectFacetValue={this.onUnselectFacetValue}
      />
    )
  }
}
export default connect(null, SelectedFacetsHeaderRowContainer.mapDispatchToProps)(SelectedFacetsHeaderRowContainer)
