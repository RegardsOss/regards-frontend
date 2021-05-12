/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import some from 'lodash/some'
import { connect } from '@regardsoss/redux'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { EntityIdTester } from '@regardsoss/domain/common'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AccessShapes, CommonShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { TableSelectionModes } from '@regardsoss/components'
import { allMatchHateoasDisplayLogic, HOCUtils } from '@regardsoss/display-control'
import { getTableClient } from '../../../../clients/TableClient'
import { getSearchCatalogClient } from '../../../../clients/SearchEntitiesClient'
import AddElementToCartContainer from './common/options/AddElementToCartContainer'

// get default modules client actions and reducers instances - we will use it to verify if a basket exists AND if it is in a dynamic container
const modulesSelectors = AccessProjectClient.getModuleSelectors()

// build default basket actions and extract common dependencies on it
const defaultBasketActions = new OrderClient.OrderBasketActions()
const basketDependencies = [
  ...defaultBasketActions.getDependencies('GET'),
  ...defaultBasketActions.getDependencies('POST'),
]

/**
 * Container for cart management functionalities and related feedback. It provides to children the following properties:
 * - onAddElementToCart: callback to add one element to cart, null if functionality is not available
 * - onAddSelectionToCart: callback to add an elements selection to cart, null if functionality is not available
 * @author Raphaël Mechali
 */
export class OrderCartContainer extends React.Component {
  /** Required basket controller dependencies */
  static BASKET_DEPENDENCIES = basketDependencies

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired, // used in mapStateToProps
    // current open search query value (used when computing selection add query)
    requestParameters: CommonShapes.RequestParameters.isRequired, // current open search request parameters
    // this property is used by this container and sub components (used only in onPropertiesChanged)
    // eslint-disable-next-line react/no-unused-prop-types
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    // components children, where this container will inject order cart related properties
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    tableViewMode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired, // Display mode
    // from parent HOCs
    // eslint-disable-next-line react/no-unused-prop-types
    onShowDescription: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    isDescAvailableFor: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    selectionServices: AccessShapes.PluginServiceWithContentArray, // used only in onPropertiesChanged
    // eslint-disable-next-line react/no-unused-prop-types
    onStartSelectionService: PropTypes.func, // used only in onPropertiesChanged
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
  }

  static DEFAULT_STATE = {
    children: [], // pre rendered children
    basketAvailaible: false, // marks a state where basket is available
    onAddElementToBasket: null, // callback to add an element into basket
    onAddSelectionToBasket: null, // callback to add selection to basket
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { tableSelectors } = getTableClient(tabType)
    const { searchSelectors } = getSearchCatalogClient(tabType)
    return {
      // cart availability related
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      modules: modulesSelectors.getList(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      // seletion and research related
      toggledElements: tableSelectors.getToggledElements(state),
      selectionMode: tableSelectors.getSelectionMode(state),
      emptySelection: tableSelectors.isEmptySelection(state, searchSelectors),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      /**
       * Dispatches add to cart action (sends add to cart command to server), showing then hiding feedback
       * @param ids entities ID (URN) list to add to cart, when request is null, or to exclude from add request when it isn't
       * @param requestParameters Open search request parameters
       * @return {Promise} add to cart promise
       */
      dispatchAddToCart: (includedIds, excludedIds, requestParameters, datasetUrn) => dispatch(defaultBasketActions.addToBasket(includedIds, excludedIds, requestParameters, datasetUrn)),
    }
  }

  /**
   * Lifecycle hook: component will mount, used here to update component state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle hook: component will receive props, used here to update component state
   * @param nextProps component next properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
  * Updates component state (recompute properties related elements)
  * @param oldProps previous component
  * @param newProps new component props
  */
  onPropertiesChanged = (oldProps, newProps) => {
    // when dependencies, modules, layout or authentication changes, update the state properties related to displaying cart
    // note that it may throw an exception to inform the administor that the module configuration is wrong
    const oldState = this.state || {}
    const newState = { ...(this.state || OrderCartContainer.DEFAULT_STATE) }

    if (!isEqual(oldProps.isAuthenticated, newProps.isAuthenticated)
      || !isEqual(oldProps.modules, newProps.modules)
      || !isEqual(oldProps.toggledElements, newProps.toggledElements)
      || !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      // recompute if basket should be displayed
      newState.basketAvailaible = this.isBasketAvailable(newProps)
    }
    // update callbacks when basket available state changes or view object type changes
    if (oldProps.viewObjectType !== newProps.viewObjectType
      || oldProps.emptySelection !== newProps.emptySelection
      || oldState.basketAvailaible !== newState.basketAvailaible
      || !isEqual(oldProps.toggledElements, newProps.toggledElements)) {
      if (newState.basketAvailaible) {
        // set up the right callbacks for current state
        if (newProps.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA) {
          newState.onAddElementToBasket = this.onAddDataObjectToBasket
          // 1- enable selection add when there is a selection
          const allowAddSelectionToBasket = !newProps.emptySelection
            // One of these possibilities
            && (
              (
                // 2.1 - user picked few elements from the list
                newProps.selectionMode === TableSelectionModes.includeSelected
                // 2.2 - at least one item has some orderable file
                && some(newProps.toggledElements, (element) => AddElementToCartContainer.canOrderDataObject(element))
              )
              // 3 - user selected all elements and we cannot check if they are orderable
              || newProps.selectionMode === TableSelectionModes.excludeSelected
            )
          if (allowAddSelectionToBasket) {
            newState.onAddSelectionToBasket = this.onAddDataObjectsSelectionToBasket
          } else {
            newState.onAddSelectionToBasket = null
          }
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

    // when callbacks, children changed or parent HOC props changed, re render children
    if (oldProps.children !== newProps.children
      || !isEqual(oldProps.isDescAvailableFor, newProps.isDescAvailableFor)
      || !isEqual(oldProps.onShowDescription, newProps.onShowDescription)
      || !isEqual(oldProps.selectionServices, newProps.selectionServices)
      || !isEqual(oldProps.onStartSelectionService, newProps.onStartSelectionService)
      || !isEqual(oldState.onAddElementToBasket, newState.onAddElementToBasket)
      || !isEqual(oldState.onAddSelectionToBasket, newState.onAddSelectionToBasket)) {
      // pre render children (attempt to enhance render performances)
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        // From description HOC
        isDescAvailableFor: newProps.isDescAvailableFor,
        onShowDescription: newProps.onShowDescription,
        // From services HOC
        selectionServices: newProps.selectionServices,
        onStartSelectionService: newProps.onStartSelectionService,
        // This HOC properties
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
    // ID of the single object to push in basket
    const ids = [get(dataobjectEntity, 'content.id')]
    if (this.props.tableViewMode === UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK) {
      // Quicklook view specific behavior:
      // Also add IDs of linked dataobject to push in basket
      const tags = get(dataobjectEntity, 'content.tags')
      forEach(tags, (tag) => {
        if (EntityIdTester.isDataURN(tag)) {
          ids.push(tag)
        }
      })
    }
    dispatchAddToCart(ids)
  }

  /**
   * Callback: user adds a dataobjects selection to basket
   */
  onAddDataObjectsSelectionToBasket = () => {
    const {
      requestParameters, selectionMode, toggledElements, dispatchAddToCart,
    } = this.props
    const ids = values(toggledElements).map((element) => get(element, 'content.id'))
    if (selectionMode === TableSelectionModes.includeSelected) {
      // inclusive selection: provide only included elements from selection (parameters useless)
      dispatchAddToCart(ids)
    } else {
      // exclusive selection: provide request parameters and elements to exclude from selection
      dispatchAddToCart(null, ids, requestParameters)
    }
  }

  /**
   * User adds a dataset to basket (ie: every dataset dataobjects currently retrieved)
   * @param datasetEntity dataset entity
   */
  onAddDatasetToBasket = (datasetEntity) => {
    const { requestParameters, dispatchAddToCart } = this.props
    // Provide current parameters as restriction on dataset
    dispatchAddToCart(null, null, requestParameters, datasetEntity.content.id)
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
    // A - User is logged in
    if (isAuthenticated) {
      // B - There is / are active Order cart module(s)
      const hasOrderCartModule = find((modules || {}), (module) => (get(module, 'content.type', '') === modulesManager.AllDynamicModuleTypes.ORDER_CART
        && get(module, 'content.active', false)))
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
