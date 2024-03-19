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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { CatalogShapes, UIShapes } from '@regardsoss/shape'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'
import ResultFacetsHeaderRowComponent from '../../../../../components/user/tabs/results/header/ResultFacetsHeaderRowComponent'

/**
 * Container to show results facets header row.
 * @author Raphaël Mechali
 */
export class ResultFacetsHeaderRowContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { searchSelectors } = getSearchCatalogClient(tabType)
    return {
      isFetching: searchSelectors.isFetching(state),
      loadedResultsCount: searchSelectors.getLoadedResultCount(state),
      resultsCount: searchSelectors.getResultsCount(state),
      facets: searchSelectors.getFacets(state),
    }
  }

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
    // from mapStateToProps
    isFetching: PropTypes.bool.isRequired,
    loadedResultsCount: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    facets: CatalogShapes.FacetArray, // facets as provided by the backend, used only in onPropertiesUpdated
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * Builds facets models from results facets list, current configuration and current attribute models
   * @param {[{*}]} resultsFacets results facets
   * @param {[{*}]} stateFacets view resolved facets, built from configuration (that do not hold their values)
   * @param {*} attributeModels current attribute models list (or map)
   * @return facets list
   */
  static buildFacetModels(resultsFacets = [], viewFacets = []) {
    // build the facet list in the order configured for view
    return viewFacets.reduce((acc, { facetLabels, attribute }) => {
      // check if corresponding facet is present in results, has enough values and a valid attribute model
      const correspondingResultFacet = resultsFacets.find(({ attributeName }) => attributeName === attribute.content.jsonPath)
      if (correspondingResultFacet) {
        const filteredFacetValues = correspondingResultFacet.values.filter((value) => value.count)
        if (filteredFacetValues.length >= 2) {
          return [
            ...acc, { // return facet plus required presentation attributes
              facetLabels,
              attribute,
              model: { // facet model
                ...correspondingResultFacet,
                values: filteredFacetValues,
              },
            },
          ]
        }
      }
      return acc // facet will not be displayed to user, because it has either to few values or no valid model
    }, [])
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { tabType, resultsContext, facets: resultsFacets } = newProps
    const { tab: { facets } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    const oldFacets = oldProps.resultsContext
      ? get(UIDomain.ResultsContextHelper.getViewData(oldProps.resultsContext, oldProps.tabType), 'tab.facets')
      : null
    // when results facets or selected type facets state changed, update resolved facets (store them in state to avoid
    // computing it at render time
    if (!isEqual(oldProps.facets, resultsFacets) || !isEqual(oldFacets, facets)) {
      this.setState({
        facets: ResultFacetsHeaderRowContainer.buildFacetModels(resultsFacets || [], facets.list),
      })
    }
  }

  /**
   * User callback: facet value selected (add it to applying facets list)
   * @param {*} selectedFacet selected facet (UI facet)
   * @param {*} query query for selected value
   * @param {*} facetValue selected value (one of one string, boolean, date range or number range, SelectedFacetCriterion shape)
   */
  onSelectFacetValue = (selectedFacet, query, facetValue) => {
    const {
      moduleId, updateResultsContext, tabType, resultsContext,
    } = this.props
    const { tab: { criteria: { appliedFacets } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // 1 - build new applying facets list: remove facet on that attribute if any was already there, then add the new selected facet value
    const nextAppliedFacets = appliedFacets.filter(({ attribute: { content: { jsonPath } } }) => selectedFacet.attribute.content.jsonPath !== jsonPath)
    nextAppliedFacets.push({
      facetLabels: selectedFacet.facetLabels,
      facetType: selectedFacet.model.type,
      facetValue,
      attribute: selectedFacet.attribute,
      requestParameters: {
        q: query,
      },
    })

    // 2 - update facets in state root (selected facets apply to all tabs, so that dataset can be filtered on data facets for instance)
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          criteria: {
            appliedFacets: nextAppliedFacets,
          },
        },
      },
    })
  }

  render() {
    const {
      resultsContext, tabType,
      isFetching, loadedResultsCount, resultsCount,
    } = this.props
    const { facets } = this.state
    const { tab, selectedTypeState, selectedModeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    return (
      <ResultFacetsHeaderRowComponent
        isFetching={isFetching}
        loadedResultsCount={loadedResultsCount}
        resultsCount={resultsCount}
        facetsEnabled={tab.facets.enabled && selectedTypeState.facetsAllowed && facets.length > 0}
        selectionEnabled={selectedModeState.enableSelection}
        facets={facets}
        onSelectFacetValue={this.onSelectFacetValue}
        tabType={tabType}
      />
    )
  }
}
export default connect(
  ResultFacetsHeaderRowContainer.mapStateToProps,
  ResultFacetsHeaderRowContainer.mapDispatchToProps)(ResultFacetsHeaderRowContainer)
