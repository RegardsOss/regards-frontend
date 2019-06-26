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
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { CatalogDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { CatalogSearchQueryHelper } from '@regardsoss/domain/catalog'
import { resultsContextActions, resultsContextSelectors } from '../../../clients/ResultsContextClient'
import {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
  searchDocumentsActions,
} from '../../../clients/SearchEntitiesClient'
import PluginServicesContainer from './PluginServicesContainer'
import OrderCartContainer from './OrderCartContainer'
import DescriptionProviderContainer from './DescriptionProviderContainer'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'
import { CriterionBuilder } from '../../../definitions/CriterionBuilder'

/**
 * Search results container: provides to the results component below the following elements:
 * - current view data
 * - Services capacities
 * - Order capacities
 * - Description capacities
 * - Request parameters for the current context

 * @author Raphaël Mechali
 */
export class SearchResultsContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleId }) {
    return {
      accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
      resultsContext: resultsContextSelectors.getResultsContext(state, moduleId),
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
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
    }
  }

  /**
   * Flattens all criteria arrays in map into a single criteria array
   * @param {*} criteriaMap criteria holder (with field named 'criteria' and matching ResultsContext#Criteria field)
   * @return {[*]} array of applying criteria in that holder
   */
  static getCriteriaMapAsArray(criteriaMap) {
    return (isEmpty(criteriaMap) ? [] : values(criteriaMap))
      .reduce((acc, criteriaForKey) => [...acc, ...(criteriaForKey || [])], [])
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    // from mapStateToProps
    resultsContext: UIShapes.ResultsContext.isRequired,
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
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
   componentWillMount = () => this.onPropertiesUpdated({}, this.props)

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
    const { resultsContext } = newProps
    const newState = { ...this.state }

    // 1 - Gather all applying criteria and store them in state (to know when request parameters should be recomputed)
    const { type, currentTypeState } = UIDomain.ResultsContextConstants.getViewData(resultsContext)

    newState.applyingCriteria = [
      ...SearchResultsContainer.getCriteriaMapAsArray(resultsContext.criteria),
      ...SearchResultsContainer.getCriteriaMapAsArray(currentTypeState.criteria),
    ]

    // 2 - Recompute request parameters based on criteria  (dataset restrictions, request parameters, sorting ... )
    if (!isEqual(this.state.applyingCriteria, newState.applyingCriteria)) {
      // A - Update restricted dataset Ids
      newState.restrictedDatasetsIds = Array.from(new Set([
        ...get(resultsContext.criteria, 'contextTags', []).filter(t => t.type === CatalogDomain.TAG_TYPES_ENUM.DATASET),
        ...get(resultsContext.criteria, 'levels', []).filter(t => t.type === CatalogDomain.TAG_TYPES_ENUM.DATASET),
      ].map(datasetTag => datasetTag.searchKey)))

      // B - Collect all request parameters from applying criteria as a map string:Array(string), where array holds all values found for
      // parameter
      const nextRequestParameters = newState.applyingCriteria.reduce((acc, level) => {
        const nextAcc = { ...acc }
        const requestParameters = level.requestParameters || {} // nota: request parameters can be ommitted for description levels for instance
        // Add in local accumulator all parameters of the current criterion (preserving other values)
        forEach(requestParameters, (paramValue, paramKey) => {
          if (paramValue && paramKey) { // avoid empty / null parmeter values
            const previousParameterValues = nextAcc[paramKey]
            if (previousParameterValues && CatalogSearchQueryHelper.isAllowingMultipleValues(paramKey)) {
              // That parameter can accept many values, add new one at end
              nextAcc[paramKey] = [...nextAcc[paramKey], ...(isArray(paramValue) ? paramValue : [paramValue])]
            } else if (!previousParameterValues) {
              // first value found for parameter
              nextAcc[paramKey] = isArray(paramValue) ? paramValue : [paramValue]
            }
          }
        })
        return nextAcc
      }, {})
      // in parameters, merge specifically the Q parameter (it must not be merged using "&q=" !)
      const qParts = nextRequestParameters[CatalogSearchQueryHelper.Q_PARAMETER_NAME]
      nextRequestParameters[CatalogSearchQueryHelper.Q_PARAMETER_NAME] = CatalogSearchQueryHelper.mergeQueryParameter(qParts)
      //  compute resulting parameters as map string:string
      newState.requestParameters = nextRequestParameters
    }

    // 3 - update actions if view type or parameters changed
    if (!isEqual(oldProps.type, type) || !isEqual(this.state.requestParameters, newState.requestParameters)) {
      switch (type) {
        case DamDomain.ENTITY_TYPES_ENUM.DATA:
          newState.searchActions = searchDataobjectsActions
          break
        case DamDomain.ENTITY_TYPES_ENUM.DATASET:
          // when in dataset mode, use basic dataset actions without query and parameters. Use dataset
          // actions with dataobject query otherwise
          newState.searchActions = isEmpty(newState.requestParameters) ? searchDatasetsActions : searchDatasetsFromDataObjectsActions
          break
        case DamDomain.ENTITY_TYPES_ENUM.DOCUMENT:
          newState.searchActions = searchDocumentsActions
          break
        case DamDomain.ENTITY_TYPES_ENUM.COLLECTION:
        default:
          throw new Error(`Unsupported results type: ${type}`)
      }
    }

    // 4 - update when any change is detetected in new state
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Inner callback to navigate to a level (tag or description). It behaves as following:
   * - If the level is a context tag, removes dynamic levels.
   * - If it is already presents, moves backward in levels list.
   * - Otherwise append it at levels list end.
   * @param {string} type next view type (may be unchanged, required)
   * @param {{type: string}} level level to add
   */
  onNavigateToLevel = (type, level) => {
    const { moduleId, resultsContext: { criteria: { contextTags, levels: currentLevels } }, updateResultsContext } = this.props

    let levels
    if (contextTags.find(lvl => isEqual(lvl, level))) {
      // backward to context tags (flaw case: the context tag is not the last one, in such case, it will feel a bit weird)
      levels = [] // clear all levels after
    } else {
      // not a context tag. Is it already present in levels list?
      const levelIndex = currentLevels.findIndex(lvl => isEqual(lvl, level))
      levels = levelIndex >= 0
        ? currentLevels.slice(0, levelIndex + 1) // already present, forward levels to that element
        : [...currentLevels, level] // append at end
    }
    updateResultsContext(moduleId, { type, criteria: { levels } })
  }


  /**
   * On Callback: navigate to level (when called from description)
   * @param {string} type level type, one of ResultsContextConstants.DESCRIPTION_LEVEL, CatalogDomain.TagTypes
   * @param {string|{*}} data level data, can be string for a word or catalog entity otherwise
   */
  onNavigate = (type, data) => {
    const { resultsContext: { type: viewType } } = this.props
    // pack level
    let newLevel
    switch (type) {
      case UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL:
        newLevel = { type, entity: data } // description level, no search parameter
        break
      case CatalogDomain.TAG_TYPES_ENUM.WORD: // data is a simple word
        newLevel = CriterionBuilder.buildWordTagCriterion(data)
        break
      default: // entity tag level
        newLevel = CriterionBuilder.buildEntityTagCriterion(data)
    }
    // user inner callback to add it
    this.onNavigateToLevel(viewType, newLevel)
  }

  /**
   * Search entity callback: Navigate to corresponding entity level and restrict results
   * @param {*} entity selected entity (matches EntityWithServices shape)
   */
  onSearchEntity = (entity) => {
    const { resultsContext: { type: viewType } } = this.props
    this.onNavigateToLevel(UIDomain.ResultsContextConstants.getNavigateToViewType(viewType), CriterionBuilder.buildEntityTagCriterion(entity))
  }

  render() {
    const {
      moduleId, resultsContext, accessToken, project, appName,
    } = this.props
    const { restrictedDatasetsIds, requestParameters, searchActions } = this.state
    const currentType = resultsContext.type
    const typeState = resultsContext.typeState[resultsContext.type]
    const currentMode = typeState.mode
    return (
      <React.Fragment>
        {/* Enable entities description management */}
        <DescriptionProviderContainer
          levels={resultsContext.criteria.levels}
          project={project}
          appName={appName}
          onNavigate={this.onNavigate}
        >
          {/* enable the services functionnalities */}
          <PluginServicesContainer
            viewObjectType={currentType}
            restrictedDatasetsIds={restrictedDatasetsIds}
            requestParameters={requestParameters}
          >
            {/* enable the order cart link functionnality */}
            <OrderCartContainer
              viewObjectType={currentType}
              tableViewMode={currentMode}
              requestParameters={requestParameters}
            >
              {/** Render a default search results component with common properties (sub elements will clone it with added properties)*/}
              <SearchResultsComponent
                moduleId={moduleId}
                resultsContext={resultsContext}
                requestParameters={requestParameters}
                searchActions={searchActions}
                accessToken={accessToken}
                projectName={project}
                onSearchEntity={this.onSearchEntity}
              />
            </OrderCartContainer>
          </PluginServicesContainer>
        </DescriptionProviderContainer>
      </React.Fragment>
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)
