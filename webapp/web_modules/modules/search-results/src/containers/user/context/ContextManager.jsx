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
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes, UIShapes } from '@regardsoss/shape'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { HOCUtils } from '@regardsoss/display-control'
import ModuleConfiguration from '../../../shapes/ModuleConfiguration'
import { actions as searchEntityActions } from '../../../clients/SearchEntityClient'
import { resultsContextActions, resultsContextSelectors } from '../../../clients/ResultsContextClient'
import { ContextInitializationHelper } from './ContextInitializationHelper'
import { URLContextHelper } from './URLContextHelper'

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
    if (get(oldAuthResults, 'sub') !== get(newAuthResults, 'sub')) {
      // A - Manage specific case of tags with authentication rights: attempt restoring them
      this.onAuthenticationChanged()
    } else if (!isEqual(oldResultsContext, newResultsContext) || !this.state.initialized) {
      // B  - Manage any results context change: let helper update URL when context changes or at initialization
      URLContextHelper.updateURLForContext(newResultsContext)
      // TODO : here, we need to serialize the module context into local storage (pick only elements that can not be retrieved from configuration)
    }
  }

  /**
   * Authentication state changed: update context according with current URL
   * tags (as some tag entities may not be available to all users)
   **/
  onAuthenticationChanged = () => {
    const { fetchEntity } = this.props
    // Attempt current context reolsution from URL (handles URL sharing cases with authentication required and context update on
    // profile change). Nota: we use here an initial void state diff to avoid overriding parent control and user changes
    URLContextHelper.resolveContextFromURL({}, fetchEntity).then(contextWithURL => this.commitCoherentContext(contextWithURL))
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
    if (nextFullContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS
      && !get(nextFullContext, `tabs.${UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS}.criteria.contextTags.length`, 0)) {
      contextToCommit.selectedTab = UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS
    }
    updateResultsContext(moduleId, contextToCommit)
    this.setState({ initialized: true })
  }

  /**
   * Initializes results context from current URL
   */
  initializeFromURL() {
    const {
      configuration, resultsContext, attributeModels, fetchEntity,
    } = this.props
    // 1 - Convert module configuration into results context
    const contextFromConfiguration = ContextInitializationHelper.buildDefaultResultsContext(configuration, attributeModels)
    // 2 - Report any parent control already added in resolved context. XXX - Comes from the last parent controller (search-graph)
    const contextWithParentControl = UIDomain.ResultsContextHelper.deepMerge(contextFromConfiguration, resultsContext)
    // 3 - Resolve context from URL then commit it to module state
    // TODO: restore criteria context too! when URL is empty, use redux context
    // TODO 2: we will need here to make sure configuration parts (label / title / deleted / added elements) is never overriden!
    URLContextHelper.resolveContextFromURL(contextWithParentControl, fetchEntity).then(contextWithURL => this.commitCoherentContext(contextWithURL))
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
