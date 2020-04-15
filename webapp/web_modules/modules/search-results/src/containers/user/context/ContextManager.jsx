/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { DataManagementShapes, UIShapes } from '@regardsoss/shape'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { HOCUtils } from '@regardsoss/display-control'
import ModuleConfiguration from '../../../shapes/ModuleConfiguration'
import { actions as searchEntityActions } from '../../../clients/SearchEntityClient'
import { resultsContextActions, resultsContextSelectors } from '../../../clients/ResultsContextClient'
import { ContextInitializationHelper } from './ContextInitializationHelper'
import { URLContextHelper } from './URLContextHelper'
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
    resultsContext: PropTypes.oneOfType([
      PropTypes.object, // during initialization
      UIShapes.ResultsContext, // after initialization
    ]),
    authentication: AuthenticateShape.isRequired, // used only to ge authentication change notification in componentWillReceiveProps
    // from mapDispatchToProps
    fetchEntity: PropTypes.func.isRequired,
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    // flag to avoid suppression of initial URL (may be used on later authentication).
    // False while complete initialization has not been performed
    initialized: false,
  }


  /**
   * When component mounted: resolve initial context module configuration and URL if there is any then push in redux a valid
   * initial state for table, according
   */
  componentDidMount() {
    this.initializeFromURL()
  }

  /**
   * When results context changes, report new type, mode and tags into URL
   */
  componentWillReceiveProps = (nextProps) => {
    const { authentication: { result: newAuthResults }, resultsContext: newResultsContext } = nextProps
    const { authentication: { result: oldAuthResults }, resultsContext: oldResultsContext } = this.props
    if (!isEqual(get(oldAuthResults, 'sub'), get(newAuthResults, 'sub')) && this.state.initialized) {
      // A - Authentication changed: update entities related elements (tags / description path)
      this.onRightsChanged()
    } else if (!isEqual(oldResultsContext, newResultsContext) && this.state.initialized) {
      // B  - Manage any results context change: let helper update URL when context changes or at initialization
      URLContextHelper.updateURLForContext(newResultsContext)
      // TODO : here, we need to serialize the module context into local storage (pick only elements that can not be retrieved from configuration)
    }
  }

  /**
   * Checks and corrects a resolved context from URL, then commits it to redux store and marks the component initialized
   * @param {*} contextDiff partial context to commit
   */
  commitCoherentContext = (contextDiff) => {
    const { moduleId, updateResultsContext, resultsContext } = this.props
    const contextToCommit = { ...contextDiff }
    // compute the resulting next context
    const nextFullContext = UIDomain.ResultsContextHelper.deepMerge(resultsContext, contextDiff)
    // Is description tab without entities?
    if (nextFullContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.DESCRIPTION
      && !get(nextFullContext, `tabs.${UIDomain.RESULTS_TABS_ENUM.DESCRIPTION}.descriptionPath.length`, 0)) {
      contextToCommit.selectedTab = UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS
    }
    // Is tag results with context tag?
    if (nextFullContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS) {
      const contextTags = get(nextFullContext, `tabs.${UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS}.criteria.contextTags`, [])
      if (!contextTags.length || contextTags[0].type === CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED) {
        // no context tag or unresolved entity
        contextToCommit.selectedTab = UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS
      }
    }
    updateResultsContext(moduleId, contextToCommit)
    this.setState({ initialized: true })
  }

  /**
   * Initializes results context from current URL
   */
  initializeFromURL = () => {
    const {
      moduleId, configuration, resultsContext,
      attributeModels, fetchEntity,
    } = this.props
    // 1 - Convert root context from configuration
    const configurationContext = ContextInitializationHelper.buildDefaultResultsContext(moduleId, configuration, attributeModels)
    // 2 - Apply any parent control on it (XXX only search graph may still use that mechanism)
    const contextWithControl = UIDomain.ResultsContextHelper.deepMerge(configurationContext, resultsContext)
    // 3 - Resolve context from URL then commit it to module state
    // TODO: consider also local storage, when not in auth change case
    URLContextHelper.resolveContextFromURL(contextWithControl, fetchEntity).then(contextWithURL => this.commitCoherentContext(contextWithURL))
  }


  /**
   * Resolves entity with id as parameter
   * @param {string} id entity ID (URN)
   * @return {Promise} resolution promise, resolving null when it fails (never entering catch clause)
   */
  resolveEntity = (id) => {
    const { fetchEntity } = this.props
    return new Promise(resolve => fetchEntity(id)
      .then(({ payload }) => {
        if (payload.error || !payload.content || !payload.content.id) {
          throw new Error('Loading failed') // retrieval failure, get in catch clause
        }
        resolve(payload) // resolved OK
      })
      .catch(() => resolve(null)), // resolution failed
    )
  }

  /**
   * Updates a tag
   * @param {*} tag matching UIShapes.TagCriterion
   * @return {Promise} update promise, never entering catch clause
   */
  updateTag = tag => tag.type === CatalogDomain.TAG_TYPES_ENUM.WORD
  // Word tag: immediately resolved
    ? new Promise(resolve => resolve(tag))
  // Entities: requires a rights checking
    : this.resolveEntity(tag.searchKey)
      .then(e => e
        ? CriterionBuilder.buildEntityTagCriterion(e)
        : CriterionBuilder.buildUnresolvedEntityTagCriterion(tag.searchKey))

  /**
   * Updates a tag list
   * @param [*] tags list, matching UIShapes.TagsArray
   * @return {Promise} update promise, never going though catch clause
   */
  updateTagsList = tagsList => Promise.all(tagsList.map(this.updateTag))

  /**
   * Updates description Tab
   * @param {*} descriptionState matching UIShapes.DescriptionTabModel
   * @return {Promise} update promise, never going though catch clause
   */
  updateDescriptionTab = ({ unresolvedRootEntityId, descriptionPath, selectedIndex }) => {
    // Case 1: there is an old unresolved description entity: resolve it and update state
    if (unresolvedRootEntityId) {
      return this.resolveEntity(unresolvedRootEntityId)
        .then(e => e ? { unresolvedRootEntityId: null, descriptionPath: [e], selectedIndex: 0 } : {
          unresolvedRootEntityId, // still not resolved
          descriptionPath: [],
          selectedIndex: 0,
        })
    }
    // Case 2: Check rights on each entity
    const previouslySelectedEntityId = descriptionPath.length ? descriptionPath[selectedIndex].content.id : null
    return Promise.all(descriptionPath.map(this.resolveEntity))
      .then((resolvedEntities) => {
        // remove null
        const filtered = resolvedEntities.filter(e => !!e)
        const newSelectedIndex = filtered.findIndex(e => e.content.id === previouslySelectedEntityId)
        return {
          descriptionPath: filtered,
          selectedIndex: newSelectedIndex < 0 ? 0 : newSelectedIndex,
          // when all where filtered, keep one entity to restore (the one in URL)
          unresolvedRootEntityId: !filtered.length ? previouslySelectedEntityId : null,
        }
      })
  }

  /**
   * Rights changed: perform entities tag resolution again, to match them against current user rights
   */
  onRightsChanged = () => {
    const { resultsContext } = this.props
    // A - Resolve tags
    // 1 - main tab context tags
    this.updateTagsList(resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria.contextTags)
      // 2 - main tab tags filtering
      .then(mainContextTags => this.updateTagsList(resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria.tagsFiltering)
        // 3 - Tag tab results context tags
        .then(mainTagsFiltering => this.updateTagsList(resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].criteria.contextTags)
          // 4 - Tag tab tags filtering
          .then(tagContextTags => this.updateTagsList(resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].criteria.tagsFiltering)
            // 5 - Description tab update
            .then(tagTagsFiltering => this.updateDescriptionTab(resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION])
              // 6 - Pack in a complete results context state and commit (with coherence control)
              .then((newDescriptionState) => {
                const contextDiff = {
                  tabs: {
                    [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
                      criteria: {
                        contextTags: mainContextTags,
                        tagsFiltering: mainTagsFiltering,
                      },
                    },
                    [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
                      criteria: {
                        contextTags: tagContextTags,
                        tagsFiltering: tagTagsFiltering,
                      },
                    },
                    [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: newDescriptionState,
                  },
                }
                this.commitCoherentContext(contextDiff)
              })))))
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
