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
import ApplyingCriteriaHeaderRowComponent from '../../../../components/user/results/header/ApplyingCriteriaHeaderRowComponent'

/**
 * Container to show applying criteria header row. It provides callback to delete a criterion and the list of values
 * currently applying to results
 * @author Raphaël Mechali
 */
export class ApplyingCriteriaHeaderRowContainer extends React.Component {
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
   * @param {*} facetValueCriterion facet value criterion to remove (respects SelectedFacetCriterion shape)
   */
  onUnselectFacetValue = (facetValueCriterion) => {
    const { moduleId, updateResultsContext, resultsContext: { criteria: { appliedFacets } } } = this.props
    updateResultsContext(moduleId, { // update results context by diff
      criteria: {
        appliedFacets: appliedFacets.filter(criterion => criterion !== facetValueCriterion),
      },
    })
  }


  /**
   * User callback: geometry unselected (remove it from applying geometries list)
   * @param {*} geometryCriterion geometry criterion to remove (respects GeometryCriterion shape)
   */
  onUnselectGeometry = (geometryCriterion) => {
    const { moduleId, updateResultsContext, resultsContext: { criteria: { geometry } } } = this.props
    updateResultsContext(moduleId, { // update results context by diff
      criteria: {
        geometry: geometry.filter(criterion => criterion !== geometryCriterion),
      },
    })
  }

  /**
   * User callback: entities selection unselected (remove it from applying entities selections list)
   * @param {*} entitiesSelectionCriterion entities selection criterion to remove (respects EntitiesSelectionCriterion shape)
   */
  onUnselectEntitiesSelection = (entitiesSelectionCriterion) => {
    const { moduleId, updateResultsContext, resultsContext: { criteria: { entitiesSelection } } } = this.props
    updateResultsContext(moduleId, { // update results context by diff
      criteria: {
        entitiesSelection: entitiesSelection.filter(criterion => criterion !== entitiesSelectionCriterion),
      },
    })
  }


  render() {
    const { resultsContext: { criteria: { appliedFacets, geometry, entitiesSelection } } } = this.props
    return (
      <ApplyingCriteriaHeaderRowComponent
        facetValues={appliedFacets}
        geometries={geometry}
        entitiesSelections={entitiesSelection}
        onUnselectFacetValue={this.onUnselectFacetValue}
        onUnselectGeometry={this.onUnselectGeometry}
        onUnselectEntitiesSelection={this.onUnselectEntitiesSelection}
      />
    )
  }
}
export default connect(null, ApplyingCriteriaHeaderRowContainer.mapDispatchToProps)(ApplyingCriteriaHeaderRowContainer)
