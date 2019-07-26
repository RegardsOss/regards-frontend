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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import last from 'lodash/last'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { AccessProjectClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { modulesManager } from '@regardsoss/modules'
import { HOCUtils } from '@regardsoss/display-control'
import { DescriptionHelper } from '@regardsoss/entities-common'

// get default layout client selectors - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.LayoutSelectors()
// get default modules client selectors - required to check that a description module exist and is not dynamic
const modulesSelectors = AccessProjectClient.ModuleSelectors()

/**
 * This HOC provides entity description tools. Children will receive automatically the following properties:
 * - descriptionModule: A clone of used description module properties with runtime data (entities to show)
 * - showDescription: true when description should currently be shown
 * - onShowDescription: showDescription callback, provided when there is a description
 * module and user has rights to fetch entities models. It expects the entity as parameter
 * - isDescAvailableFor: (entityType) => (bool). That method return true when a description module is available AND
 * can be displayed for a given entity type (by configuration)
 *
 * @author Raphaël Mechali
 */
export class DescriptionProviderContainer extends React.Component { // TODO : delete me after partial recovering in description view
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

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    project: PropTypes.string.isRequired, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string.isRequired, // used only in onPropertiesUpdated
    // callback: user navigated in description view
    onNavigate: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string, // used only in onPropertiesUpdated
  }

  /** Initial state */
  state = {
    descriptionModule: null,
    describedEntity: null, // entity for wich description is currently shown
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
    // when user rights changed, layout changed or modules list changed, recompute if the
    // description is available
    const {
      appName, project, availableDependencies, dynamicContainerId, modules,
      onNavigate, levels,
    } = newProps
    const newState = { ...this.state }
    if (!isEqual(oldProps.availableDependencies, availableDependencies)
      || !isEqual(oldProps.dynamicContainerId, dynamicContainerId)
      || !isEqual(oldProps.modules, modules)) {
      const descriptionModule = DescriptionHelper.getFirstDescriptionModule(
        availableDependencies, dynamicContainerId, modules)
      // when module is found, store in state the module configuration
      newState.descriptionModule = get(descriptionModule, 'content')
    }
    // handle levels lifecycle: keep entity to describe or null if no entity to describe currently
    if (!isEqual(oldProps.levels, levels)) {
      const lastLevel = last(levels)
      // when last level is a description AND there is a description module, prepare data to show it
      newState.describedEntity = lastLevel && lastLevel.type === UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL
        ? lastLevel.entity : null
    }

    // when description module ID changes, or children list changed
    if (!isEqual(this.state.descriptionModule, newState.descriptionModule)
      || !isEqual(this.state.describedEntity, newState.describedEntity)
      || !isEqual(oldProps.onNavigate, onNavigate)
      || oldProps.children !== newProps.children) {
      const showDescription = !!newState.descriptionModule && !!newState.describedEntity
      // compile the description module props with runtime data, so that children can display it
      const descriptionModuleProps = newState.descriptionModule ? {
        appName,
        project,
        module: {
          id: newState.descriptionModule.id,
          type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
          active: true,
          applicationId: appName,
          conf: {
            ...newState.descriptionModule.conf,
            runtime: {
              onNavigate,
              entity: newState.describedEntity, // computed in levels lifecycle
            },
          },
        },
      } : {} // no configuration available

      // clone all children with new props and update state
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        showDescription,
        descriptionModuleProps,
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
    const { onNavigate } = this.props
    // navigate to that description level
    onNavigate(UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity)
  }

  /**
   * Is description available for entity type as parameter (from module configuration)
   * @param {string} entityType entity type (from ENTITY_TYPES_ENUM)
   * @return {boolean} true when available, false otherwise
   */
  isDescAvailableFor = entityType => DescriptionHelper.isDescAvailableFor(this.state.descriptionModule, entityType)

  render() {
    // Otherwise, show results components
    return HOCUtils.renderChildren(this.state.children)
  }
}
export default connect(DescriptionProviderContainer.mapStateToProps)(DescriptionProviderContainer)
