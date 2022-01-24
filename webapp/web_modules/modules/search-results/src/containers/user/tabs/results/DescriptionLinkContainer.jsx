/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessProjectClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { HOCUtils } from '@regardsoss/display-control'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { resultsContextActions } from '../../../../clients/ResultsContextClient'

// get default layout client selectors - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.getLayoutSelectors()
// get default modules client selectors - required to check that a description module exist and is not dynamic
const modulesSelectors = AccessProjectClient.getModuleSelectors()

/**
 * This HOC provides entity description link system. Children will receive automatically the following properties:
 * * onShowDescription: (entity) => (). showDescription callback, provided when there is a description
 * module and user has rights to fetch entities models. It expects the entity as parameter
 * - isDescAvailableFor: (entityType) => (bool). That method return true when a description module is available AND
 * can be displayed for a given entity type (by configuration)
 *
 * @author Raphaël Mechali
 */
export class DescriptionLinkContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
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
  static mapDispatchToProps(dispatch) {
    return {
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string, // used only in onPropertiesUpdated
    // from mapDispachToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    descriptionModule: null,
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
      newState.descriptionModule = get(DescriptionHelper.getFirstDescriptionModule(
        availableDependencies, dynamicContainerId, modules), 'content', null)
    }

    // when description module ID changes, or children list changed
    if (!isEqual(this.state.descriptionModule, newState.descriptionModule) || oldProps.children !== newProps.children) {
      // clone all children with new props and update state
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        // provide callbacks to children
        onShowDescription: this.onShowDescription,
        isDescAvailableFor: this.isDescAvailableFor,
      })
      this.setState(newState)
    }
  }

  /**
   * User callback: show description. Provided to children for external use.
   * @param {CatalogEntity} entity entity to show (mandatory)
   */
  onShowDescription = (entity) => {
    const { moduleId, updateResultsContext } = this.props
    updateResultsContext(moduleId, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          // mute any previous unresolved values
          unresolvedTreeEntry: null,
          unresolvedRootEntityId: null,
          // replace the current description path
          descriptionPath: [{
            entity,
            selectedTreeEntry: {
              section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
              child: null,
            },
          }],
          selectedIndex: 0,
        },
      },
    })
  }

  /**
   * Is description available for entity type as parameter (from module configuration)
   * @param {string} entityType entity type (from ENTITY_TYPES_ENUM)
   * @return {boolean} true when available, false otherwise
   */
  isDescAvailableFor = (entityType) => DescriptionHelper.isDescAvailableFor(this.state.descriptionModule, entityType)

  render() {
    // Otherwise, show results components
    return HOCUtils.renderChildren(this.state.children)
  }
}
export default connect(DescriptionLinkContainer.mapStateToProps, DescriptionLinkContainer.mapDispatchToProps)(DescriptionLinkContainer)
