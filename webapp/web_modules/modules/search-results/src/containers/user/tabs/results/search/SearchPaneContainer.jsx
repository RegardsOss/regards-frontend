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
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
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
   * Collects request parameters from plugins into an array of results context criteria
   * @param {[*]} groups, matching array of UIShapes.CriteriaGroup shape
   * @return {*} parameters list (may contain q, geometry, ...), matching CommonShapes.RequestParameters
   */
  static collectRequestParameters(groups) {
    // accumulute for each group...
    return groups.reduce((groupsParamsAcc, { criteria }) => ({
      ...groupsParamsAcc,
      // ... and each criterion in a group...
      ...criteria.reduce((groupParamsAcc, { requestParameters }) => ({
        ...groupParamsAcc,
        // each non null nor empty request parameter
        ...reduce(requestParameters, (requestAcc, value, key) => isNil(value) || isEmpty(value)
          ? requestAcc
          : { ...requestAcc, [key]: value }, {}),
      })),
    }), {})
  }

  /**
   * Duplicate edited references in criteria groups
   * @param {[*]} groups to duplicate, matching array of UIShapes.CriteriaGroup shape
   * @return {[*]} duplicated groups
   */
  static duplicateGroups(groups) {
    return groups.map(({ criteria, ...groupFields }) => ({
      criteria: [...criteria],
      ...groupFields,
    }))
  }

  state = {
    groups: [],
  }

  /**
   * Lifecycle method: component will mount, used here to recover plugins state from
   * restored research state. That edition state will evolve separately later on,
   * to be published only when user clicks on search button (only the last applied state get
   * serialized to redux and URL)
   */
  componentWillMount = () => {
    const { tabType, resultsContext } = this.props
    const { tab: { search: { groups = [] } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    this.setState({
      // duplicate criteria list to remove link with original references
      groups: SearchPaneContainer.duplicateGroups(groups),
    })
  }

  /**
   * Publishes plugin state and request parameters (usually follows user editon)
   * @param {*} groupIndex parent group index
   * @param {*} criterionIndex criterion index in group
   * @param {*} newState new state for criterion
   * @param {*} newRequestParameters new request parameters for criterion
   */
  onUpdatePluginState(groupIndex, criterionIndex, newState, newRequestParameters) {
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
          requestParameters: null,
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
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          search: {
            groups: SearchPaneContainer.duplicateGroups(groups),
          },
          criteria: {
            // collect newly applying criteria
            searchTags: SearchPaneContainer.collectRequestParameters(groups),
          },
        },
      },
    })
  }

  render() {
    const { tabType, resultsContext } = this.props
    const { groups } = this.state
    const { tab: { search: { open } } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <SearchPaneComponent open={open} groups={groups} />
    )
  }
}
export default connect(
  SearchPaneContainer.mapStateToProps,
  SearchPaneContainer.mapDispatchToProps)(SearchPaneContainer)
