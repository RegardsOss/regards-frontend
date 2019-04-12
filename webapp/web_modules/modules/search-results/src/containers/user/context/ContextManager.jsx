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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CatalogDomain, UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { HOCUtils } from '@regardsoss/display-control'
import ModuleConfiguration from '../../../shapes/ModuleConfiguration'
import { actions as searchEntityActions } from '../../../clients/SearchEntityClient'
import { resultsContextActions, resultsContextSelectors } from '../../../clients/ResultsContextClient'
import { ContextInitializationHelper } from '../../../definitions/ContextInitializationHelper'
import { CriterionBuilder } from '../../../definitions/CriterionBuilder'

/**
 * Results context manager:
 * - It initializes context with module configuration
 * - Retrieves context parts from URL (ignoring possible driving modules parameters) at initialization
 * - Update context tags list from URL when authentication changes (to disable / enable tags from URL in context)
 * - Updates URL during component lifecycle
 * while context is updated
 */
export class ContextManager extends React.Component {
  /**
   * module URL parameters
   */
  static MODULE_URL_PARAMETERS = {
    VIEW_TYPE_PARAMETER: 't',
    SEARCH_TAGS_PARAMETER: 'tags',
    RESULTS_DISPLAY_MODE_PARAMETER: 'd',
  }

  /** Tag values separator in local URL parameter */
  static TAG_VALUES_SEPARATOR = ','

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleId }) {
    return {
      resultsContext: resultsContextSelectors.getResultsContext(state, moduleId),
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
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
      fetchEntity: datasetId => dispatch(searchEntityActions.getEntity(datasetId)),
      updateResultsContext: (moduleId, newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
    }
  }

  static propTypes = {
    // module ID, used in mapStateToProps and mapDispatchToProps to access the
    moduleId: PropTypes.number.isRequired,
    // module configuration
    configuration: ModuleConfiguration.isRequired,
    // Attributes models (must always be provided and non empty)
    attributeModels: DataManagementShapes.AttributeModelList.isRequired,
    // children
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // from mapStateToProps
    // Optional object, as a parent module could have set state partially (only contextTags expected so far)
    // eslint-disable-next-line react/forbid-prop-types
    resultsContext: PropTypes.object,
    authentication: AuthenticateShape.isRequired, // used only to ge authentication change notification in componentWillReceiveProps
    // from mapDispatchToProps
    fetchEntity: PropTypes.func.isRequired,
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    initialized: false,
  }

  /**
   * When component mounted: resolve initial context from URL if there is any then push in redux a valid
   * initial state for table, according
   */
  componentDidMount() {
    // 1 - collect URL data that should apply to the module
    const { query } = browserHistory.getCurrentLocation()

    const viewTypeFromURL = query[ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]
    const viewModeFromURL = query[ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]
    const tagsFromURL = get(query, ContextManager.MODULE_URL_PARAMETERS.SEARCH_TAGS_PARAMETER, '')
    const tagsArrayFromURL = tagsFromURL ? tagsFromURL.split(ContextManager.TAG_VALUES_SEPARATOR) : []

    // 2 - Resolve tags from URL before computing initial context
    this.resolveURLTags(tagsArrayFromURL).then((resolvedTags) => {
      this.initializeState(viewTypeFromURL, viewModeFromURL, tagsArrayFromURL, resolvedTags)
    }).catch((e) => {
      this.initializeState(viewTypeFromURL, viewModeFromURL, tagsArrayFromURL)
    })
  }

  /**
   * When results context changes, report new type, mode and tags into URL
   */
  componentWillReceiveProps = (nextProps) => {
    if (!this.state.initialized) {
      // cannot handle it yet (also cuts the initial URL update wich is useless)
      return
    }
    const { authentication: { result: newAuthResults }, resultsContext: newResultsContext } = nextProps
    const { authentication: { result: oldAuthResults }, resultsContext: oldResultsContext } = this.props
    if (get(oldAuthResults, 'sub') !== get(newAuthResults, 'sub')) {
      // A - Manage specific case of tags with authentication rights
      this.onAuthenticationChanged()
    } else if (!isEqual(oldResultsContext, newResultsContext)) {
      // B  - Manage any results context change: update URL
      this.onResultsContextChanged(oldResultsContext, newResultsContext)
    }
  }

  /**
   * Authentication state changed: update context according with current URL
   * tags (as some tag entities may not be available to all users)
   **/
  onAuthenticationChanged = () => {
    const { moduleId, updateResultsContext } = this.props
    const { query } = browserHistory.getCurrentLocation()
    const tagsFromURL = get(query, ContextManager.MODULE_URL_PARAMETERS.SEARCH_TAGS_PARAMETER, '')
    const tagsArrayFromURL = tagsFromURL ? tagsFromURL.split(ContextManager.TAG_VALUES_SEPARATOR) : []
    if (tagsFromURL.length) {
      // resolve tags from URL
      this.resolveURLTags(tagsArrayFromURL).then((resolvedTags) => {
        updateResultsContext(moduleId, {
          criteria: {
            tags: resolvedTags,
          },
        })
      }).catch((e) => {
        // some entities are forbidden for current user: remove them in context
        updateResultsContext(moduleId, {
          criteria: {
            tags: [],
          },
        })
      })
    }
  }

  /**
   * Results context changed: update current URL when required
   * @param {*} oldResultsContext old results context (mandatory, respect ResultsContext shape)
   * @param {*} newResultsContext new results context (mandatory, respect ResultsContext shape)
   */
  onResultsContextChanged = (oldResultsContext, newResultsContext) => {
    const { type, mode } = UIDomain.ResultsContextConstants.getViewData(newResultsContext)
    const { type: oldType, mode: oldMode } = UIDomain.ResultsContextConstants.getViewData(oldResultsContext)
    if (!isEqual(oldType, type) || !isEqual(oldMode, mode)
      || !isEqual(oldResultsContext.criteria.tags, newResultsContext.criteria.tags)) {
      const { pathname, query } = browserHistory.getCurrentLocation()
      // Compute next query
      const nextBrowserQuery = { ...query }
      // type
      nextBrowserQuery[ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER] = type
      // mode
      nextBrowserQuery[ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER] = mode
      // tags (serialized by the tag searchKey)
      const searchTagParameterValue = newResultsContext.criteria.tags.map(({ searchKey }) => searchKey).join(ContextManager.TAG_VALUES_SEPARATOR)
      if (searchTagParameterValue) {
        nextBrowserQuery[ContextManager.MODULE_URL_PARAMETERS.SEARCH_TAGS_PARAMETER] = searchTagParameterValue
      } else { // clear the parameter
        delete nextBrowserQuery[ContextManager.MODULE_URL_PARAMETERS.SEARCH_TAGS_PARAMETER]
      }
      // Update browser query (do not push to avoid crazy history)
      browserHistory.replace({ pathname, query: nextBrowserQuery })
    }
  }

  /**
   * Resolves tags by their search key (from URL) into tag models usable for search context
   * @param {[string]} tags
   * @return {Promise} resolution promise
   */
  resolveURLTags = (tags) => {
    const { fetchEntity } = this.props
    return Promise.all(tags.map((tagSearchKey) => {
      if (CatalogDomain.isURNTag(tagSearchKey)) {
        // 1 - An entity tag: resolve through fetching
        return fetchEntity(tagSearchKey).then(({ payload }) => {
          // entity was retrieved
          if (payload.error || !payload.content || !payload.content.id) {
            throw new Error(`Fetching entity for URN "${tagSearchKey}" failed.`)
          }
          return CriterionBuilder.buildEntityTagCriterion(payload)
        })
      }
      // 2 - a word tag: return immediately resolved promise
      return new Promise(resolve => resolve({
        label: tagSearchKey, // label is search key
        type: CatalogDomain.TAG_TYPES_ENUM.WORD,
        searchKey: tagSearchKey,
        requestParameters: {
          [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
            new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME, tagSearchKey).toQueryString(),
        },
      }))
    }))
  }

  /**
   * Initializes the results context with collected DATA from URL. It applies the following logic
   * - URL has highest priority, when not null nor empty
   * - Context values, if any was found, should be preserved
   * - Configuration values, if any was specified, should apply when previous conditions are not filling some values
   * - Finally, default values are used to fill remaining empty parameters
   * @param {string} viewTypeFromURL view type from URL
   * @param {string} viewModeFromURL view mode from URL
   * @param {[string]} tagsArrayFromURL tags from URL, as array
   * @param {[{*}]} resolvedTags array of resolved tags as defined in ResultsContext shapes
   */
  initializeState(viewTypeFromURL, viewModeFromURL, tagsArrayFromURL, resolvedTags = []) {
    const {
      configuration, resultsContext, attributeModels,
      moduleId, updateResultsContext,
    } = this.props

    // TODO: think about merging with pre-existing state, while making sure the configuration will be taken in account!

    // A - Compute default state from configuration
    const defaultState = ContextInitializationHelper.buildDefaultResultsContext(configuration, attributeModels)

    // B - override specific values that can come from URL
    // B.1 - type (check that view type is still enabled to avoid old and wrong URL issues)
    const urlTypeState = defaultState.typeState[viewTypeFromURL] || {}
    if (viewTypeFromURL && urlTypeState.enabled) {
      defaultState.type = viewTypeFromURL // update type in default state
    }

    // B.2 - mode (same check)
    const currentTypeState = defaultState.typeState[defaultState.type]
    const urlModeState = currentTypeState.modeState[viewModeFromURL] || {}
    if (viewModeFromURL && urlModeState.enabled) {
      currentTypeState.mode = viewModeFromURL // update mode in current state by reference
    }

    // B.2 - Restore found tags in default state
    defaultState.criteria.tags = resolvedTags

    // B.3 - Make sure any parent context tags are not be removed
    defaultState.criteria.contextTags = get(resultsContext, 'criteria.contextTags', [])

    // C - update state
    updateResultsContext(moduleId, defaultState)
    this.setState({ initialized: true })
  }

  render() {
    const { children } = this.props
    const { initialized } = this.state
    // render only when initialized to block sub element requests
    if (initialized) {
      return HOCUtils.renderChildren(children)
    }
    return null
  }
}
export default connect(ContextManager.mapStateToProps, ContextManager.mapDispatchToProps)(ContextManager)
