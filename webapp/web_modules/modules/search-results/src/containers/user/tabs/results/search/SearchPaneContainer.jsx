/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import reduce from 'lodash/reduce'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import isEmpty from 'lodash/isEmpty'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import SearchPaneComponent from '../../../../../components/user/tabs/results/search/SearchPaneComponent'

/**
 * Search pane container: initializes the pane search context
 * @author Raphaël Mechali
 */
export class SearchPaneContainer extends React.Component {
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
    resultsContext: UIShapes.ResultsContext.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * Filters empty parameters in request parameters
   * @param {*} requestParameters request parameters
   * @return {*} request parameters without empty keys
   */
  static filterEmptyParameters(requestParameters) {
    return reduce(requestParameters, (acc, value, key) => isNil(value) || isEmpty(value) ? acc : { ...acc, [key]: value })
  }

  /**
   * Collects search criteria from plugins
   * @param {[*]} groups, matching array of UIShapes.CriteriaGroup shape
   * @return {[*]} criteria list, as UIShapes.BasicCriterion array
   */
  static collectSearchCriteria(groups) {
    // accumulute for each group...
    return groups.reduce((groupsParamsAcc, group) => ([
      ...groupsParamsAcc,
      // ... and each criterion in a group as a context filtering criterion...
      ...group.criteria.reduce((criteriaParameters, { requestParameters }) => {
        // the non empty parameters to be applied as resulting request
        const filteredParameters = SearchPaneContainer.filterEmptyParameters(requestParameters)
        return isEmpty(filteredParameters)
          ? criteriaParameters // all ignored
          : [...criteriaParameters, { requestParameters }]
      }, []),
    ]), [])
  }

  /**
   * Duplicate edited references in criteria groups and criteria (to avoid changes by reference)
   * @param {[*]} groups to duplicate, matching array of UIShapes.CriteriaGroup shape
   * @return {[*]} duplicated groups and criteria
   */
  static duplicateGroups(groups) {
    return groups.map(({ criteria, ...groupFields }) => ({
      criteria: criteria.map(c => ({ ...c })),
      ...groupFields,
    }))
  }

  state = {
    groups: [],
    rootContextCriteria: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated(null, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { resultsContext, tabType } = newProps
    const { tab: { criteria, search: { groups } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    const newState = { ...this.state }
    // 1 - Initialization case (create a local working copy of all criteria)
    if (isNil(oldProps)) {
      newState.groups = SearchPaneContainer.duplicateGroups(groups)
    }
    // 2 - Collect root context criteria to check changes in them (nota: presentation parameters like sorting and
    // dynamic parameters in searchTags are ignored, as that value will be used by each criterion to compute its
    // own local request, based on it and previous criteria parameters)
    newState.rootContextCriteria = UIDomain.ResultsContextHelper.getCriteriaMapAsArray(
      omit(criteria, ['searchTags', 'requestFacets']))

    // 3 - Commit new state when any change is detected
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Publishes plugin state and request parameters (usually follows user editon)
   * @param {*} groupIndex parent group index
   * @param {*} criterionIndex criterion index in group
   * @param {*} newState new state for criterion
   * @param {*} newRequestParameters new request parameters for criterion
   */
  onUpdatePluginState = (groupIndex, criterionIndex, newState, newRequestParameters) => {
    this.setState({
      groups: this.state.groups.map((group, gI) => gI === groupIndex ? {
        ...group,
        criteria: group.criteria.map((criterion, cI) => cI === criterionIndex ? {
          ...criterion,
          state: newState,
          requestParameters: newRequestParameters,
        } : criterion),
      } : group),
    })
  }

  /**
   * User callback: Resets all plugins state
   */
  onResetPluginsStates = () => {
    this.setState({
      groups: this.state.groups.map(group => ({
        ...group,
        criteria: group.criteria.map(criterion => ({
          ...criterion,
          state: null,
          requestParameters: {},
        })),
      })),
    })
  }

  /**
   * User callback: on search called. Publish current criteria status
   */
  onSearch = () => {
    const { moduleId, tabType, updateResultsContext } = this.props
    const { groups } = this.state
    const newSearchCriteria = SearchPaneContainer.collectSearchCriteria(groups)
    // perform search only when there are resulting criteria
    if (newSearchCriteria.length) {
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            search: {
              open: false, // close pane
              groups: SearchPaneContainer.duplicateGroups(groups), // commit criteria state
            },
            criteria: {
            // collect newly applying criteria
              searchTags: newSearchCriteria,
            },
          },
        },
      })
    }
  }

  /**
   * Use callback: close search pane
   */
  onClose = () => {
    const { moduleId, tabType, updateResultsContext } = this.props
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          search: {
            open: false,
          },
        },
      },
    })
  }

  render() {
    const { moduleId, tabType, resultsContext } = this.props
    const { groups, rootContextCriteria } = this.state
    const { tab: { search: { open } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <SearchPaneComponent
        open={resultsContext.selectedTab === tabType && open} // show when open AND current tab is this one
        groups={groups}
        criterionBaseId={`${moduleId}:${tabType}`}
        rootContextCriteria={rootContextCriteria}
        onUpdatePluginState={this.onUpdatePluginState}
        onResetPluginsStates={this.onResetPluginsStates}
        onSearch={this.onSearch}
        onClose={this.onClose}
      />
    )
  }
}
export default connect(
  SearchPaneContainer.mapStateToProps,
  SearchPaneContainer.mapDispatchToProps)(SearchPaneContainer)
