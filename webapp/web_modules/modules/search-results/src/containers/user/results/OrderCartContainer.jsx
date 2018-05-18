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
import find from 'lodash/find'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { EntityIpIdTester } from '@regardsoss/domain/common'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AccessShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { TableSelectionModes } from '@regardsoss/components'
import { allMatchHateoasDisplayLogic, HOCUtils } from '@regardsoss/display-control'
import { TableDisplayModeEnum, TableDisplayModeValues } from '../../../models/navigation/TableDisplayModeEnum'
import TableClient from '../../../clients/TableClient'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'

// get default modules client actions and reducers instances - we will use it to verify if a basket exists AND if it is in a dynamic container
const modulesSelectors = AccessProjectClient.ModuleSelectors()

// build default basket actions and extract common dependencies on it
const defaultBasketActions = new OrderClient.OrderBasketActions()
const basketDependencies = [
  ...defaultBasketActions.getDependencies('GET'),
  ...defaultBasketActions.getDependencies('POST'),
]

/**
 * Container for cart management functionalities and related feedback
 * @author Raphaël Mechali
 */
export class OrderCartContainer extends React.Component {
  /** Required basket controller dependencies */
  static BASKET_DEPENDENCIES = basketDependencies

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    return {
      // cart availability related
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      modules: modulesSelectors.getList(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      // seletion and research related
      toggledElements: TableClient.tableSelectors.getToggledElements(state),
      selectionMode: TableClient.tableSelectors.getSelectionMode(state),
      emptySelection: TableClient.tableSelectors.isEmptySelection(state, searchSelectors),
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
      /**
       * Dispatches add to cart action (sends add to cart command to server), showing then hiding feedback
       * @param ipIds IP ID list to add to cart, when request is null, or to exclude from add request when it isn't
       * @param selectAllOpenSearchRequest request to retrieve elements to add, when not null
       * @return {Promise} add to cart promise
       */
      dispatchAddToCart: (ipIds = [], selectAllOpenSearchRequest = null) =>
        dispatch(defaultBasketActions.addToBasket(ipIds, selectAllOpenSearchRequest)),
    }
  }

  static propTypes = {
    // initial open search query value (used when computing dataset's dataobjects add query)
    initialSearchQuery: PropTypes.string,
    // current open search query value (used when computing selection add query)
    openSearchQuery: PropTypes.string.isRequired,
    // this property is used by this container and sub components (used only in onPropertiesChanged)
    // eslint-disable-next-line react/no-unused-prop-types
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    // components children, where this container will inject order cart related properties
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    tableViewMode: PropTypes.oneOf(TableDisplayModeValues).isRequired, // Display mode
    // from mapStateToProps
    // cart availability related
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthenticated: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string),
    // seletion and research related
    toggledElements: PropTypes.objectOf(AccessShapes.EntityWithServices).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),
    // eslint-disable-next-line react/no-unused-prop-types
    emptySelection: PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchAddToCart: PropTypes.func.isRequired,
    // ... child component properties

  }

  /** Keys of properties that should not be reported to this children */
  static NON_REPORTED_PROPS = [
    'initialSearchQuery',
    'openSearchQuery',
    'viewObjectType',
    'children',
    'tableViewMode',
    'isAuthenticated',
    'modules',
    'availableDependencies',
    'toggledElements',
    'selectionMode',
    'emptySelection',
    'dispatchAddToCart',
  ]

  static DEFAULT_STATE = {
    children: [], // pre rendered children
    basketAvailaible: false, // marks a state where basket is available
    onAddElementToBasket: null, // callback to add an element into basket
    onAddSelectionToBasket: null, // callback to add selection to basket
  }

  /**
   * Lifecycle hook: component will mount, used here to update component state
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle hook: component will receive props, used here to update component state
   * @param nextProps component next properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
  * Updates component state (recompute properties related elements)
  * @param oldProps previous component
  * @param newProps new component props
  */
  onPropertiesChanged = (oldProps, newProps) => {
    // when dependencies, modules, layout or authentication changes, update the state properties related to displaying cart
    // note that it may throw an exception to inform the administor that the module configuration is wrong
    const oldState = this.state || {}
    const newState = { ...(oldState || OrderCartContainer.DEFAULT_STATE) }
    if (!isEqual(oldProps.isAuthenticated, newProps.isAuthenticated) ||
      !isEqual(oldProps.modules, newProps.modules) ||
      !isEqual(oldProps.toggledElements, newProps.toggledElements) ||
      !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      // recompute if basket should be displayed
      newState.basketAvailaible = this.isBasketAvailable(newProps)
    }
    // update callbacks when basket available state changes or view object type changes
    if (oldProps.viewObjectType !== newProps.viewObjectType ||
      oldProps.emptySelection !== newProps.emptySelection ||
      oldState.basketAvailaible !== newState.basketAvailaible) {
      if (newState.basketAvailaible) {
        // set up the right callbacks for current state
        if (newProps.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA) {
          newState.onAddElementToBasket = this.onAddDataObjectToBasket
          // enable selection add only when there is a selection
          newState.onAddSelectionToBasket = newProps.emptySelection ? null : this.onAddDataObjectsSelectionToBasket
        } else {
          newState.onAddElementToBasket = this.onAddDatasetToBasket
          newState.onAddSelectionToBasket = null // user cannot add a dataset selection to basket
        }
      } else {
        // remove callbacks to disable the functionnality
        newState.onAddElementToBasket = null
        newState.onAddSelectionToBasket = null
      }
    }

    // when callbacks or children changed, re render children
    if (HOCUtils.shouldCloneChildren(oldProps, newProps, OrderCartContainer.NON_REPORTED_PROPS) ||
      !isEqual(oldState.onAddElementToBasket, newState.onAddElementToBasket) ||
      !isEqual(oldState.onAddSelectionToBasket, newState.onAddSelectionToBasket)) {
      // pre render children (attempt to enhance render performances)
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        ...omit(newProps, OrderCartContainer.NON_REPORTED_PROPS), // this will report injected service data
        // report cart information
        onAddElementToCart: newState.onAddElementToBasket,
        onAddSelectionToCart: newState.onAddSelectionToBasket,
      })
      this.setState(newState)
    }
  }

  /**
  * Callback: user adds a dataobject to his basket
  */
  onAddDataObjectToBasket = (dataobjectEntity) => {
    const { dispatchAddToCart } = this.props
    const ipIds = [get(dataobjectEntity, 'content.ipId')]
    // On quicklook table display mode, the Add button has a different behavior than in Table or List mode
    if (this.props.tableViewMode === TableDisplayModeEnum.QUICKLOOK) {
      // Add linked dataobject of the added dataobject to the basket too
      const tags = get(dataobjectEntity, 'content.tags')
      forEach(tags, (tag) => {
        if (EntityIpIdTester.isIpIdAData(tag)) {
          ipIds.push(tag)
        }
      })
    }
    dispatchAddToCart(ipIds)
  }

  /**
   * Callback: user adds a dataobjects selection to basket
   */
  onAddDataObjectsSelectionToBasket = () => {
    const {
      openSearchQuery: currentQuery, selectionMode, toggledElements, dispatchAddToCart,
    } = this.props
    const ipIds = values(toggledElements).map(element => get(element, 'content.ipId'))
    // Should we dispatch an include or an exclude from request selection?
    const openSearchQuery = selectionMode === TableSelectionModes.excludeSelected ? currentQuery : null
    dispatchAddToCart(ipIds, openSearchQuery)
  }

  /**
   * User adds a dataset to basket (ie: every dataset dataobjects)
   * @param datasetEntity dataset entity
   */
  onAddDatasetToBasket = (datasetEntity) => {
    const { initialSearchQuery, dispatchAddToCart } = this.props
    const dataobjectQuery = new OpenSearchQuery(initialSearchQuery, [OpenSearchQuery.buildTagParameter(datasetEntity.content.ipId)])
    dispatchAddToCart([], dataobjectQuery.toQueryString())
  }

  /**
   * Computes cart related state fields from component properties
   * @param {*} properties this component properties
   * @return {boolean} true if basket is available
   */
  isBasketAvailable = ({
    isAuthenticated, modules, availableDependencies, viewObjectType,
  }) => {
    // Available if...
    // A - User is logged in - and not displaying documents
    if (isAuthenticated && viewObjectType !== DamDomain.ENTITY_TYPES_ENUM.DOCUMENT) {
      // B - There is / are active Order cart module(s)
      const hasOrderCartModule = find((modules || {}), module =>
        (get(module, 'content.type', '') === modulesManager.AllDynamicModuleTypes.ORDER_CART &&
          get(module, 'content.active', false)))
      if (hasOrderCartModule) {
        // C - Finally, user must have rights to manage the basket
        return allMatchHateoasDisplayLogic(OrderCartContainer.BASKET_DEPENDENCIES, availableDependencies)
      }
    }
    // otherwise: it isn't available
    return false
  }

  render() {
    const { children } = this.state
    // render only the children list
    return HOCUtils.renderChildren(children)
  }
}
export default connect(OrderCartContainer.mapStateToProps, OrderCartContainer.mapDispatchToProps)(OrderCartContainer)
