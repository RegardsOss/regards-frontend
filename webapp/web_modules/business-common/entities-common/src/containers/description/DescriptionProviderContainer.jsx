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
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AccessProjectClient, DataManagementClient, UIClient } from '@regardsoss/client'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AccessShapes } from '@regardsoss/shape'
import { HOCUtils, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { modulesManager } from '@regardsoss/modules'
import { buildDescriptionModuleConsumerID } from '../../definitions/description/DescriptionConsumerID'

// get default layout client selectors - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.LayoutSelectors()
// get default modules client selectors - required to check that a description module exist and is not dynamic
const modulesSelectors = AccessProjectClient.ModuleSelectors()
// get default dialog requests actions. Those actions results will be consumes by the description modules
const dialogRequestsActions = new UIClient.DialogRequestsActions()

/**
 * This HOC provides entity description tools. Children will receive automatically the following properties:
  * - onShowDescription: showDescription callback, provided when there is a description
  * module and user has rights to fetch entities models. It expects the entity as parameter
  * - isDescAvailableFor: (entityType) => (bool). That method return true when a description module is available AND
  * can be displayed for a given entity type (by configuration)
  * It expects to receive as properties:
  * - children: the list of children that should receive HOC properties
  * - onSearchTag: the search tag callback for description view
 * @author Raphaël Mechali
 */
export class DescriptionProviderContainer extends React.Component {
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
      onShowDescriptionModule: (entity, onSearchTag, consumerId) => dispatch(dialogRequestsActions.show({ entity, onSearchTag }, consumerId)),
    }
  }

  static propTypes = {
    // callback: user searched a tag in description view
    onSearchTag: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    onShowDescriptionModule: PropTypes.func.isRequired, // used only in onPropertiesUpdated
  }

  /** Dependencies to be able showing description */
  static DESCRIPTION_DEPENDENCIES = [
    // the current user must be able to fetch model attributes
    new DataManagementClient.ModelAttributesActions('').getDependency(RequestVerbEnum.GET_LIST),
  ]

  /** Keep a track of the warning log, to avoid loggin it multiple times */
  static hasLoggedWarning = false

  /**
   * Returns first available description module description module can be shown
   * @param {*} availableDependencies available depencies to endpoints
   * @param {*} dynamicContainerId dynamic container ID (the module found should not be in dynamic container)
   * @param {*} modules modules list
   * @return {Module} first found module or null
   */
  static getFirstDescriptionModule(availableDependencies, dynamicContainerId, modules) {
    // 0 - pre: don't show cart to non logged users or users that do not have enough rights
    if (!allMatchHateoasDisplayLogic(DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES, availableDependencies)) {
      // current user has not right to show description
      return null
    }
    // Find static description modules
    const staticDescriptionModules = filter((modules || {}), (module) => {
      const containerId = get(module, 'content.container', '')
      const moduleType = get(module, 'content.type', '')
      const isActiveModule = get(module, 'content.active', false)
      // module is retained when active, of type description and set up in any non dynamic container
      return isActiveModule && modulesManager.AllDynamicModuleTypes.DESCRIPTION === moduleType
        && dynamicContainerId !== containerId
    })
    // log warning if there are many available description modules (only one can be used and there is no selection rule!)
    if (staticDescriptionModules.length > 1 && !DescriptionProviderContainer.hasLoggedWarning) {
      DescriptionProviderContainer.hasLoggedWarning = true
      console.warn(`Multiple active description modules where found, only the first one will be used (id: ${staticDescriptionModules[0].content.id})`)
    }
    return staticDescriptionModules.length ? staticDescriptionModules[0] : null
  }

  /** Initial state */
  state = {
    descriptionModule: null,
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
    const { availableDependencies, dynamicContainerId, modules } = newProps
    const newState = { ...this.state }
    if (!isEqual(oldProps.availableDependencies, availableDependencies)
      || !isEqual(oldProps.dynamicContainerId, dynamicContainerId)
      || !isEqual(oldProps.modules, modules)) {
      newState.descriptionModule = DescriptionProviderContainer.getFirstDescriptionModule(
        availableDependencies, dynamicContainerId, modules)
    }
    // when description module ID changes, or children list changed
    if (this.state.descriptionModule !== newState.descriptionModule || oldProps.children !== newProps.children) {
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
    const { onShowDescriptionModule, onSearchTag } = this.props
    const { descriptionModule } = this.state
    // show only when available
    if (descriptionModule) {
      const consumerId = buildDescriptionModuleConsumerID(descriptionModule.content.id)
      onShowDescriptionModule(entity, onSearchTag, consumerId)
    }
  }

  /**
   * Is description available for entity type as parameter (from module configuration)
   * @param {string} entityType entity type (from ENTITY_TYPES_ENUM)
   * @return {boolean} true when available, false otherwise
   */
  isDescAvailableFor = (entityType) => {
    const { descriptionModule } = this.state
    return get(descriptionModule, `content.conf.${entityType}.showDescription`, false)
  }

  render() {
    // render children as computed in state
    return HOCUtils.renderChildren(this.state.children)
  }
}
export default connect(
  DescriptionProviderContainer.mapStateToProps,
  DescriptionProviderContainer.mapDispatchToProps)(DescriptionProviderContainer)
