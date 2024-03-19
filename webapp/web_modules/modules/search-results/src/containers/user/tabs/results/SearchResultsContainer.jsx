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
import { connect } from '@regardsoss/redux'
import { CatalogDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { resultsContextActions } from '../../../../clients/ResultsContextClient'
import { toponymActions } from '../../../../clients/ToponymClient'
import { getSearchCatalogClient } from '../../../../clients/SearchEntitiesClient'
import { getSelectionClient } from '../../../../clients/SelectionClient'
import { CriterionBuilder } from '../../../../definitions/CriterionBuilder'
import PluginServicesContainer from './PluginServicesContainer'
import DescriptionLinkContainer from './DescriptionLinkContainer'
import OrderCartContainer from './OrderCartContainer'
import SearchResultsComponent from '../../../../components/user/tabs/results/SearchResultsComponent'

/**
 * Search results container: provides to the results component below the following elements:
 * - current view data
 * - Services capacities
 * - Order capacities
 * - Description capacities
 * - Request parameters for the current context
 * Nota: it is instanciated for a results tab, which defines the context it should bind with

 * @author Raphaël Mechali
 */
export class SearchResultsContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { tabType }) {
    const { tableActions } = getSelectionClient(tabType)
    return {
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
      fetchToponym: (businessId) => dispatch(toponymActions.fetchEntity(businessId)),
      flushSelection: () => dispatch(tableActions.unselectAll()),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchToponym: PropTypes.func.isRequired,
    flushSelection: PropTypes.func.isRequired,
  }

  state = {
    restrictedDatasetsIds: [],
    requestParameters: {},
    applyingCriteria: [],
    searchActions: null,
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

  componentWillUnmount() {
    const { flushSelection } = this.props
    // Clear table selection when unmount
    flushSelection()
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { resultsContext, tabType, fetchToponym } = newProps
    const newState = { ...this.state }

    // 1 - Gather all applying criteria and store them in state (to know when request parameters should be recomputed)
    const { tab, selectedType, selectedTypeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    newState.applyingCriteria = [
      ...UIDomain.ResultsContextHelper.getCriteriaMapAsArray(tab.criteria),
      ...UIDomain.ResultsContextHelper.getCriteriaMapAsArray(selectedTypeState.criteria),
    ]

    // 2 - Recompute request parameters based on criteria  (dataset restrictions, request parameters, sorting ... )
    if (!isEqual(this.state.applyingCriteria, newState.applyingCriteria)) {
      // A - Update restricted dataset Ids
      newState.restrictedDatasetsIds = Array.from(new Set([
        ...tab.criteria.contextTags.filter((t) => t.type === CatalogDomain.TAG_TYPES_ENUM.DATASET),
        ...tab.criteria.tagsFiltering.filter((t) => t.type === CatalogDomain.TAG_TYPES_ENUM.DATASET),
      ].map((datasetTag) => datasetTag.searchKey)))

      // B - Compute new applying request parameters
      newState.requestParameters = UIDomain.ResultsContextHelper.getQueryParametersFromCriteria(newState.applyingCriteria)
    }

    // 3 - update actions if view type or parameters changed
    const oldSelectedTab = get(oldProps.resultsContext, 'selectedTab')
    const oldSelectedType = oldSelectedTab ? get(oldProps.resultsContext, `tabs.${oldSelectedTab}.selectedType`) : null
    if (!isEqual(oldSelectedType, selectedType) || !isEqual(this.state.requestParameters, newState.requestParameters)) {
      const { searchDataobjectsActions, searchDatasetsActions } = getSearchCatalogClient(tabType)
      switch (selectedType) {
        case DamDomain.ENTITY_TYPES_ENUM.DATA:
          newState.searchActions = searchDataobjectsActions
          break
        case DamDomain.ENTITY_TYPES_ENUM.DATASET:
          // when in dataset mode, use basic dataset actions without query and parameters. Use dataset
          newState.searchActions = searchDatasetsActions
          // actions with dataobject query otherwise
          break
        default:
          throw new Error(`Unsupported results type: ${selectedType}`)
      }
    }

    const oldToponymCriteria = oldSelectedTab ? get(oldProps.resultsContext, `tabs.${oldSelectedTab}.criteria.toponymCriteria`) : null
    if (!isEqual(oldToponymCriteria, tab.criteria.toponymCriteria)) {
      const toponymBusinessId = get(tab.criteria.toponymCriteria, `[0]requestParameters.${CatalogDomain.CatalogSearchQueryHelper.TOPONYM_PARAMETER_NAME}`)
      if (toponymBusinessId) {
        fetchToponym(toponymBusinessId)
      }
    }

    // 4 - update when any change is detetected in new state
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Search entity callback: set entity as user tag
   * @param {*} entity selected entity (matches CatalogShapes.EntityWithServices shape)
   */
  onSearchEntity = (entity) => {
    const {
      moduleId, resultsContext, tabType, updateResultsContext, flushSelection,
    } = this.props

    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    flushSelection()
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          // swap automatically view type on search, when searching for dataset
          selectedType: UIDomain.ResultsContextConstants.getNavigateToViewType(selectedType),
          // set criterion as user criteria (replace list)
          criteria: {
            tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(entity)],
          },
        },
      },
    })
  }

  render() {
    const {
      moduleId, resultsContext, tabType,
      accessToken, project, flushSelection,
    } = this.props
    const { restrictedDatasetsIds, requestParameters, searchActions } = this.state
    const { selectedType, selectedMode } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    return (
      <>
        {/* enable the services functionnalities */}
        <DescriptionLinkContainer moduleId={moduleId}>
          {/* Enable description links functionnality */}
          <PluginServicesContainer
            tabType={tabType}
            viewObjectType={selectedType}
            restrictedDatasetsIds={restrictedDatasetsIds}
            requestParameters={requestParameters}
          >
            {/* enable the order cart link functionnality */}
            <OrderCartContainer
              tabType={tabType}
              viewObjectType={selectedType}
              tableViewMode={selectedMode}
              requestParameters={requestParameters}
            >
              {/** Render a default search results component with common properties (sub elements will clone it with added properties)*/}
              <SearchResultsComponent
                moduleId={moduleId}
                tabType={tabType}
                resultsContext={resultsContext}
                requestParameters={requestParameters}
                searchActions={searchActions}
                accessToken={accessToken}
                projectName={project}
                onSearchEntity={this.onSearchEntity}
                flushSelection={flushSelection}
              />
            </OrderCartContainer>
          </PluginServicesContainer>
        </DescriptionLinkContainer>
      </>
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)
