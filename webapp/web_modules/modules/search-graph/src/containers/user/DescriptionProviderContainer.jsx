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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { AccessProjectClient, UIClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { HOCUtils } from '@regardsoss/display-control'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { resultsContextActions } from '../../clients/ResultsContextClient'

// get default layout client selectors - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.getLayoutSelectors()
// get default modules client selectors - required to check that a description module exist and is not dynamic
const modulesSelectors = AccessProjectClient.getModuleSelectors()
/** Module pane state actions default instance */
const moduleExpandedStateActions = new UIClient.ModuleExpandedStateActions()

/**
 * This HOC provides entity description properties. Children will receive automatically the property descriptionProperties, matching
 * shapes/DescriptionProperties
 *
 * When the current level is of type description, shows a copy of description module with right configuration. Otherwise,
 * shows sub components
 *
 * @author Raphaël Mechali
 */
export class DescriptionProviderContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { id }) {
    return {
      // bind available dependencies to evaluate user access rights to entities models
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      // bind modules list
      modules: modulesSelectors.getList(state),
      // bind dynamic container ID (we need the module to be any container BUT THAT ONE)
      dynamicContainerId: layoutSelectors.getDynamicContainerId(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { id }) {
    const searchGraphPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_GRAPH, id)
    const searchResultsPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, id)
    return {
      dispatchExpandResults: () => dispatch(moduleExpandedStateActions.setNormal(searchResultsPaneKey)),
      dispatchCollapseGraph: () => dispatch(moduleExpandedStateActions.setMinimized(searchGraphPaneKey)),
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
    }
  }

  static propTypes = {
    // module ID to connect with results context
    id: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]), // used in on onPropertiesUpdated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    dispatchExpandResults: PropTypes.func.isRequired,
    dispatchCollapseGraph: PropTypes.func.isRequired,
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    descriptionModule: null,
    children: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // when user rights changed, layout changed or modules list changed, recompute if the
    // description is available
    const { availableDependencies, dynamicContainerId, modules } = newProps
    const newState = { ...this.state }
    if (!isEqual(oldProps.availableDependencies, availableDependencies)
      || !isEqual(oldProps.dynamicContainerId, dynamicContainerId)
      || !isEqual(oldProps.modules, modules)) {
      const descriptionModule = DescriptionHelper.getFirstDescriptionModule(
        availableDependencies, dynamicContainerId, modules)
      // keep only module content
      newState.descriptionModule = get(descriptionModule, 'content')
    }

    // when description module or children list changed, update children description properties
    if (!isEqual(this.state.descriptionModule, newState.descriptionModule)
      || oldProps.children !== newProps.children) {
      // prepare an is available for type closure
      const isDescriptionAvailableFor = (entityType) => DescriptionHelper.isDescAvailableFor(newState.descriptionModule, entityType)

      // clone all children with new props and update state
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        descriptionProperties: {
          // show option when available for collections or datasets
          showDescriptionOption: isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION) || isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET),
          isDescriptionAvailableFor,
          onShowDescription: this.onShowDescription,
        },
      })
      this.setState(newState)
    }
  }

  /**
   * User callback: show description.
   * @param {*} entity matching CatalogShapes.Entity
   */
  onShowDescription = (entity) => {
    const {
      id, dispatchExpandResults, dispatchCollapseGraph, updateResultsContext,
    } = this.props
    // Reset description path to that entity and show description tab
    updateResultsContext(id, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          descriptionPath: [entity],
          selectedIndex: 0,
        },
      },
    })
    // Attempt to show results and hide graph
    dispatchExpandResults()
    dispatchCollapseGraph()
  }

  render() {
    // Otherwise, show results components
    return HOCUtils.renderChildren(this.state.children)
  }
}
export default connect(
  DescriptionProviderContainer.mapStateToProps,
  DescriptionProviderContainer.mapDispatchToProps)(DescriptionProviderContainer)
