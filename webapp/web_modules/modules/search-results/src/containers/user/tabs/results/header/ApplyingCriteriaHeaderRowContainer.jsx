/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import ApplyingCriteriaHeaderRowComponent from '../../../../../components/user/tabs/results/header/ApplyingCriteriaHeaderRowComponent'

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
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * User callback: tag criterion unselected (remove it from applying tag filters selections list)
   * @param {*} tagCriterion tag criterion to remove (respects TagCriterion shape)
   */
  onUnselectTagFilter = (tagCriterion) => {
    const {
      moduleId, updateResultsContext, resultsContext, tabType,
    } = this.props
    const { tab: { criteria: { tagsFiltering } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            tagsFiltering: tagsFiltering.filter(
              (criterion) => tagCriterion.type !== criterion.type || tagCriterion.searchKey !== criterion.searchKey),
          },
        },
      },
    })
  }

  /**
   * User callback: facet value unselected (remove it from applying facets list)
   * @param {*} facetValueCriterion facet value criterion to remove (respects SelectedFacetCriterion shape)
   */
  onUnselectFacetValue = (facetValueCriterion) => {
    const {
      moduleId, updateResultsContext, resultsContext, tabType,
    } = this.props
    const { tab: { criteria: { appliedFacets } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            appliedFacets: appliedFacets.filter((criterion) => criterion !== facetValueCriterion),
          },
        },
      },
    })
  }

  /**
   * User callback: geometry unselected (remove it from applying geometries list)
   * @param {*} geometryCriterion geometry criterion to remove (respects GeometryCriterion shape)
   */
  onUnselectGeometry = (geometryCriterion) => {
    const {
      moduleId, updateResultsContext, resultsContext, tabType,
    } = this.props
    const { tab: { criteria: { geometry } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            geometry: geometry.filter((criterion) => criterion !== geometryCriterion),
          },
        },
      },
    })
  }

  /**
   * User callback: entities selection unselected (remove it from applying entities selections list)
   * @param {*} entitiesSelectionCriterion entities selection criterion to remove (respects EntitiesSelectionCriterion shape)
   */
  onUnselectEntitiesSelection = (entitiesSelectionCriterion) => {
    const {
      moduleId, updateResultsContext, resultsContext, tabType,
    } = this.props
    const { tab: { criteria: { entitiesSelection } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            entitiesSelection: entitiesSelection.filter((criterion) => criterion !== entitiesSelectionCriterion),
          },
        },
      },
    })
  }

  /**
   * User callback: search criteria unselected (clear applying searchCriteria)
   */
  onUnselectSearchCriteria = () => {
    const {
      moduleId, updateResultsContext, tabType,
    } = this.props
    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            searchCriteria: [], // reset search criteria
          },
        },
      },
    })
  }

  /**
   * User callback: toponym criteria unselected (clear applying toponymCriteria)
   */
  onUnselectToponymCriteria = () => {
    const {
      moduleId, updateResultsContext, tabType,
    } = this.props
    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            toponymCriteria: [], // reset toponym criteria
          },
        },
      },
    })
  }

  /**
   * User callback: static parameter toggle
   */
  onToggleStaticParameter = (selectedStaticParameter) => {
    const {
      moduleId, updateResultsContext, tabType, resultsContext,
    } = this.props
    const { tab: { criteria: { staticParameters } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    updateResultsContext(moduleId, { // update results context by diff
      tabs: {
        [tabType]: {
          criteria: {
            staticParameters: map(staticParameters, (staticParameter) => {
              let result
              if (staticParameter === selectedStaticParameter) {
                const newActive = !staticParameter.active
                result = {
                  ...staticParameter,
                  active: newActive,
                  requestParameters: newActive ? staticParameter.parameters : {},
                }
              } else {
                result = staticParameter
              }
              return result
            }),
          },
        },
      },
    })
  }

  render() {
    const { resultsContext, tabType } = this.props
    const {
      tab: {
        criteria: {
          tagsFiltering, appliedFacets, geometry,
          entitiesSelection, searchCriteria, staticParameters,
          toponymCriteria,
        },
      },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <ApplyingCriteriaHeaderRowComponent
        tagsFiltering={tagsFiltering}
        facetValues={appliedFacets}
        geometries={geometry}
        entitiesSelections={entitiesSelection}
        searchCriteria={searchCriteria}
        staticParameters={staticParameters}
        toponymCriteria={toponymCriteria}
        onUnselectTagFilter={this.onUnselectTagFilter}
        onUnselectFacetValue={this.onUnselectFacetValue}
        onUnselectGeometry={this.onUnselectGeometry}
        onUnselectEntitiesSelection={this.onUnselectEntitiesSelection}
        onUnselectSearchCriteria={this.onUnselectSearchCriteria}
        onToggleStaticParameter={this.onToggleStaticParameter}
        onUnselectToponymCriteria={this.onUnselectToponymCriteria}
      />)
  }
}
export default connect(null, ApplyingCriteriaHeaderRowContainer.mapDispatchToProps)(ApplyingCriteriaHeaderRowContainer)
