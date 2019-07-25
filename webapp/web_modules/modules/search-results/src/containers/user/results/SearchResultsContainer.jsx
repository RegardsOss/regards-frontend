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
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { CatalogDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AuthenticationClient, AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { DescriptionProviderContainer } from '@regardsoss/entities-common'
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
      projectName: AuthenticationParametersSelectors.getProject(state),
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
    // from mapStateToProps
    resultsContext: UIShapes.ResultsContext.isRequired,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * Compares a tag to a type and key.
   * @param {*} tag tag to check
   * @param {*} comparedType comparison type
   * @param {*} comparedKey comparison search key
   * @returns {boolean} true when tags stands for that type and key, false otherwise
   */
  static isSameTag(tag, comparedType, comparedKey) {
    return tag.type === comparedType && tag.searchKey === comparedKey
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
        ...get(resultsContext.criteria, 'tags', []).filter(t => t.type === CatalogDomain.TAG_TYPES_ENUM.DATASET),
      ].map(datasetTag => datasetTag.searchKey)))

      // B - Collect all request parameters from applying criteria as a map string:Array(string), where array holds all values found for
      // parameter
      const nextRequestParameters = newState.applyingCriteria.reduce((acc, { requestParameters }) => {
        const nextAcc = { ...acc }
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
   * On search tag added, from description view - appends new tag in results context
   * @param {type: string, data: {string}} descriptionTag description tag, as callback from tag selection in description component
   */
  onAddSearchTagFromDescription = ({ type, data }) => {
    const { moduleId, resultsContext: { criteria: { contextTags, tags: currentTags } }, updateResultsContext } = this.props
    // 1 - pack tag
    const newTag = { type }
    switch (type) {
      case CatalogDomain.TAG_TYPES_ENUM.WORD: // data is a simple word
        newTag.label = data
        newTag.searchKey = data
        break
      default: // data is an entity
        newTag.label = data.content.label
        newTag.searchKey = data.content.id
    }
    // in both cases, query is q=tag:xxx
    newTag.requestParameters = {
      [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
      new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME, newTag.searchKey).toQueryString(),
    }
    // 2 - update state by diff with the previous one. Make sure the added tag is present only once, at end (remove it from previous tags if found)
    // Nota: refuse adding a tag that already exists in context tags
    if (!contextTags.find(t => SearchResultsContainer.isSameTag(t, newTag.type, newTag.searchKey))) {
      updateResultsContext(moduleId, {
        criteria: {
          tags: [
            ...currentTags.filter(t => !SearchResultsContainer.isSameTag(t, newTag.type, newTag.searchKey)),
            newTag,
          ],
        },
      })
    }
  }

  /**
   * Search entity callback: restrict results to those holding entity URN as tag
   * @param {*} entity selected entity (matches EntityWithServices shape)
   */
  onSearchEntity = (entity) => {
    const { moduleId, updateResultsContext, resultsContext: { type: currentType, criteria: { contextTags, tags: currentTags } } } = this.props
    const { content: { entityType, id } } = entity
    // Deny adding a tag that is already in context
    const shouldUpdateTags = !contextTags.find(t => SearchResultsContainer.isSameTag(t, entityType, id))
    updateResultsContext(moduleId, {
      type: UIDomain.ResultsContextConstants.getNavigateToViewType(currentType), // swap to next view type
      criteria: {
        tags: shouldUpdateTags ? [ // report current tags EXCEPT the one currently added, then add it at end
          ...currentTags.filter(t => SearchResultsContainer.isSameTag(t, entityType, id)),
          CriterionBuilder.buildEntityTagCriterion(entity),
        ] : currentTags,
      },
    })
  }

  render() {
    const {
      moduleId, resultsContext, accessToken, projectName,
    } = this.props
    const { restrictedDatasetsIds, requestParameters, searchActions } = this.state
    const currentType = resultsContext.type
    const typeState = resultsContext.typeState[resultsContext.type]
    const currentMode = typeState.mode
    return (
      <React.Fragment>
        {/* Enable entities description management */}
        <DescriptionProviderContainer onSearchTag={this.onAddSearchTagFromDescription}>
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
                projectName={projectName}
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
