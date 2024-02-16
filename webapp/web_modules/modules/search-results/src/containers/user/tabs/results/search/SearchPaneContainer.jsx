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
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import omit from 'lodash/omit'
import reduce from 'lodash/reduce'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import isEmpty from 'lodash/isEmpty'
import { StabilityDelayer } from '@regardsoss/display-control'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import { searchHistorySelectors, searchHistoryActions } from '../../../../../clients/SearchHistoryClient'
import SearchPaneComponent from '../../../../../components/user/tabs/results/search/SearchPaneComponent'

/**
 * Search pane container: initializes the pane search context
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class SearchPaneContainer extends React.Component {
  static EMPTY_SELECTED_SEARCH_HISTORY = {
    name: '',
    id: '',
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
      addSearchHistory: (moduleId, accountEmail, name, configuration) => dispatch(searchHistoryActions.createEntity({ name, configuration }, null, { moduleId, accountEmail })),
      deleteSearchHistory: (searchHistoryId) => dispatch(searchHistoryActions.deleteEntity(searchHistoryId)),
      fetchSearchHistory: (moduleId, accountEmail) => dispatch(searchHistoryActions.fetchPagedEntityList(0, 20, null, { moduleId, accountEmail })),
      updateSearchHistory: (searchHistoryId, searchHistoryConfig) => dispatch(searchHistoryActions.updateEntity(searchHistoryId, searchHistoryConfig)),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
    }
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isUserSearchHistoryFetching: searchHistorySelectors.isFetching(state),
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    flushSelection: PropTypes.func.isRequired,
    // from mapStateToProps
    authentication: AuthenticateShape.isRequired,
    isUserSearchHistoryFetching: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
    addSearchHistory: PropTypes.func.isRequired,
    deleteSearchHistory: PropTypes.func.isRequired,
    fetchSearchHistory: PropTypes.func.isRequired,
    updateSearchHistory: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
  }

  /**
   * Pack groups models from configuration
   * @param {[*]} groupsConfiguration arrays of groups configuration, as UIShapes.SearchCriteriaGroup
   * @param {[*]} storedApplyingCriteria stored applying criteria values as array
   * of ApplyingSearchCriterion.storedApplyingCriteria. Holds the states and request
   * parameters to restore for each criteria (optionnal)
   * @return {[*]} groups models matching SearchCriteriaGroupRuntime
   */
  static packGroupModels(groupsConfiguration, storedApplyingCriteria = []) {
    // pack for each group...
    return groupsConfiguration.map((g) => ({
      ...g,
      // and each criteria...
      criteria: g.criteria.map((criterion) => {
        // A - The state and parameters to restore (undefined when not found)
        const { state, requestParameters } = storedApplyingCriteria.find((c) => c.pluginInstanceId === criterion.pluginInstanceId) || {}
        // B - with the current configuration
        return {
          // report configuration
          ...criterion,
          // report state and request parameters when found
          state,
          requestParameters,
          delayedRequestParameters: undefined, // put here for readibility sake only
        }
      }),
    }))
  }

  /**
   * Filters empty parameters in request parameters
   * @param {*} requestParameters request parameters
   * @return {*} request parameters without empty keys
   */
  static filterEmptyParameters(requestParameters) {
    return reduce(requestParameters, (acc, value, key) => isNil(value) || ((isArray(value) || isString(value)) && isEmpty(value))
      ? acc
      : { ...(acc || {}), [key]: value },
    null)
  }

  /**
   * Collects criteria from edited plugins
   * @param {[*]} groups, matching array of UIShapes.SearchCriteriaGroup shape
   * @return {[*]} criteria list, as UIShapes.ApplyingSearchCriterion array
   */
  static collectCriteria(groups, criteriaType) {
    // accumulute for each group...
    return groups.reduce((groupsAcc, group) => ([
      ...groupsAcc,
      // ... and each criterion in a group as a context filtering criterion...
      ...group.criteria.reduce((criteriaAcc, { pluginInstanceId, state, requestParameters }) => {
        // find((pluginInfo) => (pluginInfo))
        // the criteria with non empty parameters
        const filteredParameters = SearchPaneContainer.filterEmptyParameters(requestParameters)
        const ignoreCriteriaType = get(state, 'criteria', UIDomain.CRITERIA_TYPES_ENUM.SEARCH) !== criteriaType
        return isEmpty(filteredParameters) || ignoreCriteriaType
          ? criteriaAcc // criterion ignored as its parameters are empty
          : [...criteriaAcc, { pluginInstanceId, state, requestParameters }]
      }, []),
    ]), [])
  }

  /**
   * Collects search criteria from edited plugins
   * @param {[*]} groups, matching array of UIShapes.SearchCriteriaGroup shape
   * @return {[*]} criteria list, as UIShapes.ApplyingSearchCriterion array
   */
  static collectSearchCriteria(groups) {
    return SearchPaneContainer.collectCriteria(groups, UIDomain.CRITERIA_TYPES_ENUM.SEARCH)
  }

  /**
   * Collects toponym criteria from edited plugins
   * @param {[*]} groups, matching array of UIShapes.SearchCriteriaGroup shape
   * @return {[*]} criteria list, as UIShapes.ApplyingSearchCriterion array
   */
  static collectToponymCriteria(groups) {
    return SearchPaneContainer.collectCriteria(groups, UIDomain.CRITERIA_TYPES_ENUM.TOPONYM)
  }

  /**
   * Applies any delayed request parameters in criteria of groups as parameters
   * @param {[*]} groups to duplicate, matching array of SearchCriteriaGroupRuntime shape
   * @return {[*]} duplicated groups and criteria, with applied delayed request parameters (strict copy if there were none)
   */
  static applyDelayedParameters(groups) {
    return groups.map((g) => ({
      ...g,
      criteria: g.criteria.map((criterion) => ({
        ...criterion,
        // 1 - report delayed request parameters is that criterion has some
        requestParameters: isNil(criterion.delayedRequestParameters) ? criterion.requestParameters : criterion.delayedRequestParameters,
        // 2  - clear any delayed request parameter
        delayedRequestParameters: undefined,
      })),
    }))
  }

  /** Initial state (never used) */
  state = {
    groups: [],
    rootContextCriteria: [],
    searchDisabled: true,
    selectedSearchHistory: SearchPaneContainer.EMPTY_SELECTED_SEARCH_HISTORY,
  }

  /** Instance stability delayer, used to avoid publishing to much context updates while user inputs */
  stabilityDelayer = new StabilityDelayer()

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    // Initialize from configuration and pack with runtime data
    const { resultsContext, tabType } = this.props
    const { tab: { criteria, search: { groups } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    this.onStateChange({
      groups: SearchPaneContainer.packGroupModels(groups, criteria.searchCriteria), // when mounting, restore values from applying criteria
      rootContextCriteria: UIDomain.ResultsContextHelper.getCriteriaMapAsArray(
        omit(criteria, ['searchCriteria', 'requestFacets', 'staticParameters'])),
    })
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { resultsContext, tabType } = nextProps
    const { tab: { criteria } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // update root context criteria when it changes
    this.onStateChange({
      rootContextCriteria: UIDomain.ResultsContextHelper.getCriteriaMapAsArray(
        omit(criteria, ['searchCriteria', 'requestFacets', 'staticParameters'])),
    })
  }

  /**
   * Performs this.setState, but prevents calling it if there is no change
   * @param {*} nextState
   */
  onStateChange = (newState) => {
    const nextState = {
      ...this.state, // ensure the state is complete before computing anything
      ...newState,
    }
    // disable search when there is no search criteria
    // or toponym criteria
    // or when any criterion is in error
    const criteriaExist = (!!SearchPaneContainer.collectSearchCriteria(nextState.groups).length
      || !!SearchPaneContainer.collectToponymCriteria(nextState.groups).length)
    nextState.searchDisabled = !criteriaExist
      || nextState.groups.some(({ criteria }) => criteria.some((criterion) => get(criterion, 'state.error')))

    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
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
    // As this method may be called on each user input, the local plugins state is immediately updated
    // but request parameters are kept unchanged while receiving events
    // the field is shared to be used in onSearch (if user starts search before new context were committed)
    // 1 - Commit new state and store delayed update for criterion request parameters
    this.onStateChange({
      groups: this.state.groups.map((group, gI) => gI === groupIndex ? {
        ...group,
        criteria: group.criteria.map((criterion, cI) => cI === criterionIndex ? {
          ...criterion,
          state: newState,
          // internally used field: stores last delayed update to be committed when stabilized (onSearch can also
          // use it if user was very quick!)
          delayedRequestParameters: newRequestParameters,
        } : criterion),
      } : group),
    })
    // 2 - Start / restart delay to wait before committing the delayed updates
    this.stabilityDelayer.onEvent(this.onCommitRequestParameters)
  }

  /**
   * After stabilization delay: commit new request parameters for each criterion
   */
  onCommitRequestParameters = () => {
    // A - Apply all delayed criteria
    const { groups } = this.state
    this.onStateChange({
      groups: SearchPaneContainer.applyDelayedParameters(groups),
    })
  }

  /**
   * User callback: Resets all plugins state
   */
  onResetPluginsStates = () => {
    const { resultsContext, tabType } = this.props
    const { tab: { search: { groups } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    this.stabilityDelayer.cancel() // remove any later changes commit
    // reset all states by packing groups grom configuration (no initial value for criteria)
    this.onStateChange({
      groups: SearchPaneContainer.packGroupModels(groups),
      selectedSearchHistory: SearchPaneContainer.EMPTY_SELECTED_SEARCH_HISTORY,
    })
  }

  /**
   * User callback: on search called. Publish current criteria status
   */
  onSearch = () => {
    const { flushSelection } = this.props
    if (this.state.searchDisabled) {
      // Don't update result if disabled
      return
    }
    const {
      moduleId, tabType, updateResultsContext,
    } = this.props
    const { groups: editionGroups } = this.state
    // 1 - Applying any pending update to the groups to commit
    const groups = SearchPaneContainer.applyDelayedParameters(editionGroups)
    // 2 - Collect criteria
    const newSearchCriteria = SearchPaneContainer.collectSearchCriteria(groups)
    const newToponymCriteria = SearchPaneContainer.collectToponymCriteria(groups)
    // 3 - If there is any parameter, start search
    if (newSearchCriteria.length || newToponymCriteria.length) {
      flushSelection() // flush table selection when searching products
      let criteria = {
        searchCriteria: newSearchCriteria,
      }
      if (newToponymCriteria.length) {
        criteria = {
          ...criteria,
          toponymCriteria: newToponymCriteria,
          geometry: [],
        }
      }
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            criteria,
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

  /**
   * Update groups and rootContextCriteria with search history configuration
   * @param {*} searchHistoryConfig
   */
  onSelectUserSearchHistory = (searchHistoryId, searchHistoryName, searchHistoryConfig) => {
    const searchHistoryObj = JSON.parse(searchHistoryConfig)
    this.onStateChange({
      groups: get(searchHistoryObj, 'groups', []),
      rootContextCriteria: get(searchHistoryObj, 'rootContextCriteria', []),
      selectedSearchHistory: {
        name: searchHistoryName,
        id: searchHistoryId,
      },
    })
  }

  /**
   * Add a new search history element
   * @param {string} name
   * @param {string} searchHistory
   */
  onAddUserSearchHistory = (name, searchHistoryConfig) => {
    const {
      addSearchHistory, moduleId, authentication,
    } = this.props
    return addSearchHistory(moduleId, get(authentication, 'result.sub'), name, searchHistoryConfig)
  }

  /**
   * Delete a search history element using its id
   * @param {number} searchHistoryId
   */
  onDeleteUserSearchHistory = (searchHistoryId) => {
    const {
      fetchSearchHistory, deleteSearchHistory, moduleId, authentication, throwError,
    } = this.props
    const { selectedSearchHistory } = this.state
    deleteSearchHistory(searchHistoryId).then((actionResult) => {
      if (!actionResult.error) {
        // Refresh search history list when delete is done
        fetchSearchHistory(moduleId, get(authentication, 'result.sub'))
        // If deleted search history is current selected search history, reset current selected search history
        if (searchHistoryId === selectedSearchHistory.id) {
          this.onStateChange({
            selectedSearchHistory: SearchPaneContainer.EMPTY_SELECTED_SEARCH_HISTORY,
          })
        }
      } else {
        throwError('Unable to delete element')
      }
    })
  }

  /**
   * Update a search history element using its id and a new config
   * @param {number} searchHistoryId
   * @param {string} searchHistoryConfig
   */
  onUpdateUserSearchHistory = (searchHistoryId, searchHistoryConfig) => {
    const { updateSearchHistory, throwError } = this.props
    updateSearchHistory(searchHistoryId, searchHistoryConfig).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to update element')
      }
    })
  }

  /**
   * Enable de clear selected search history and reset to initial form
   */
  onRemoveSelectedSearchHistory = () => {
    // Initialize from configuration and pack with runtime data
    const { resultsContext, tabType } = this.props
    const { tab: { criteria, search: { groups } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    this.onStateChange({
      groups: SearchPaneContainer.packGroupModels(groups, criteria.searchCriteria), // when mounting, restore values from applying criteria
      rootContextCriteria: UIDomain.ResultsContextHelper.getCriteriaMapAsArray(
        omit(criteria, ['searchCriteria', 'requestFacets', 'staticParameters'])),
      selectedSearchHistory: SearchPaneContainer.EMPTY_SELECTED_SEARCH_HISTORY,
    })
  }

  render() {
    const {
      tabType, resultsContext, moduleId, authentication, isUserSearchHistoryFetching, throwError,
    } = this.props
    const {
      groups, rootContextCriteria, searchDisabled, selectedSearchHistory,
    } = this.state
    const { tab: { search: { open } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <SearchPaneComponent
        open={resultsContext.selectedTab === tabType && open} // show when open AND current tab is this one
        groups={groups}
        rootContextCriteria={rootContextCriteria}
        searchDisabled={searchDisabled}
        onUpdatePluginState={this.onUpdatePluginState}
        onResetPluginsStates={this.onResetPluginsStates}
        onSearch={this.onSearch}
        onClose={this.onClose}
        moduleId={moduleId}
        accountEmail={get(authentication, 'result.sub')}
        onSelectUserSearchHistory={this.onSelectUserSearchHistory}
        onAddUserSearchHistory={this.onAddUserSearchHistory}
        onDeleteUserSearchHistory={this.onDeleteUserSearchHistory}
        isUserSearchHistoryFetching={isUserSearchHistoryFetching}
        throwError={throwError}
        selectedSearchHistory={selectedSearchHistory}
        onRemoveSelectedSearchHistory={this.onRemoveSelectedSearchHistory}
        onUpdateUserSearchHistory={this.onUpdateUserSearchHistory}
      />
    )
  }
}
export default connect(
  SearchPaneContainer.mapStateToProps,
  SearchPaneContainer.mapDispatchToProps)(SearchPaneContainer)
