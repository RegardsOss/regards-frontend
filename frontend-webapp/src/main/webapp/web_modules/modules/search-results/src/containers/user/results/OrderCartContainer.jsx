/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AccessShapes, CatalogShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { TableSelectionModes } from '@regardsoss/components'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import TableClient from '../../../clients/TableClient'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'

// get default modules client actions and reducers instances - we will use it to verify if a basket exists AND if it is in a dynamic container
const modulesSelectors = AccessProjectClient.ModuleSelectors()

// build default basket actions and extract common dependencies on it
const defaultBasketActions = new OrderClient.OrderBasketActions()
const basketDependencies = [
  ...defaultBasketActions.getDependencies('GET'),
  ...defaultBasketActions.getDependencies('POST'),
]

/**
 * Container to add order basket functionality (allows to split a little the SearchResultsContainer code and separate
 * responsabilities)
 * @author Raphaël Mechali
 */
export class OrderCartContainer extends React.Component {

  /** Required basket controller dependencies */
  static BASKET_DEPENDENCIES = basketDependencies

  /**
   * TODO share with services container when merging V1.1
   * @param selectionMode current seletion mode
   * @param toggledElements toggled elements
   * @param pageMetadata page metadata
   * @return true if selection is empty
   */
  static isEmptySelection = (selectionMode, toggledElements, pageMetadata) => {
    const totalElements = (pageMetadata && pageMetadata.totalElements) || 0
    const selectionSize = keys(toggledElements).length

    return (selectionMode === TableSelectionModes.includeSelected && selectionSize === 0) ||
      (selectionMode === TableSelectionModes.excludeSelected && selectionSize === totalElements)
  }

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
      // TODO when mergin 1.1.0, think about sharing those values
      // seletion and research related
      selectionMode: TableClient.tableSelectors.getSelectionMode(state),
      toggledElements: TableClient.tableSelectors.getToggledElements(state),
      pageMetadata: searchSelectors.getMetaData(state),
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
       * Dispatches add to cart action (sends add to cart command to server)
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
    showingDataobjects: PropTypes.bool.isRequired,
    // from mapStateToProps
    // cart availability related
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthenticated: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string),
    // seletion and research related
    // TODO when merging v1.1, think about sharing those properties with ServicesContainer
    toggledElements: PropTypes.objectOf(CatalogShapes.Entity).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),
    // eslint-disable-next-line react/no-unused-prop-types
    pageMetadata: PropTypes.shape({ // only used in onPropertiesChanged
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from map dispatch to props
    dispatchAddToCart: PropTypes.func.isRequired,
    // ... child component properties
  }

  /** Specific container properties, that should not be provided to child component */
  static CONTAINER_SPECIFIC_PROPERTIES = [
    'initialSearchQuery',
    'openSearchQuery',
    'isAuthenticated',
    'modules',
    'availableDependencies',
    'toggledElements',
    'selectionMode',
    'dispatchAddToCart',
  ]

  static DEFAULT_STATE = {
    basketAvailaible: false, // marks a state where basket is available
    onAddElementToBasket: null,  // callback to add an element into basket
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
    const oldState = this.state
    const newState = { ...(oldState || OrderCartContainer.DEFAULT_STATE) }
    if (!isEqual(oldProps.isAuthenticated, newProps.isAuthenticated) ||
      !isEqual(oldProps.modules, newProps.modules) ||
      !isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      // recompute if basket should be displayed
      newState.basketAvailaible = this.isBasketAvailable(newProps)
    }

    if (newState.basketAvailaible) {
      // set up the right callbacks for current state
      if (newProps.showingDataobjects) {
        newState.onAddElementToBasket = this.onAddDataOjbectToBasketHandler
        // enable selection add only when there is a selection
        newState.onAddSelectionToBasket =
          OrderCartContainer.isEmptySelection(newProps.selectionMode, newProps.toggledElements, newProps.pageMetadata) ?
            null : this.onAddDataOjbectsSelectionToBasketHandler
      } else {
        newState.onAddElementToBasket = this.onAddDatasetToBasketHandler
        newState.onAddSelectionToBasket = null // user cannot add a dataset selection to basket
      }
    } else {
      // remove callbacks to disable the functionnality
      newState.onAddElementToBasket = null
      newState.onAddSelectionToBasket = null
    }


    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
  * Callback: user adds a dataobject to his basket
  */
  onAddDataOjbectToBasket = (dataobjectEntity) => {
    const { dispatchAddToCart } = this.props
    const ipIds = [get(dataobjectEntity, 'content.ipId')]
    dispatchAddToCart(ipIds)
  }

  /** Corresponding handler */
  onAddDataOjbectToBasketHandler = this.onAddDataOjbectToBasket.bind(this)

  /**
   * Callback: user adds a dataobjects selection to basket
   */
  onAddDataOjbectsSelectionToBasket = () => {
    const { openSearchQuery: currentQuery, selectionMode, toggledElements, dispatchAddToCart } = this.props
    const ipIds = values(toggledElements).map(element => get(element, 'content.ipId'))
    // Should we dispatch an include or an exclude from request selection?
    const openSearchQuery = selectionMode === TableSelectionModes.excludeSelected ? currentQuery : null
    dispatchAddToCart(ipIds, openSearchQuery)
  }

  /** Corresponding handler */
  onAddDataOjbectsSelectionToBasketHandler = this.onAddDataOjbectsSelectionToBasket.bind(this)

  /**
   * User adds a dataset to basket (ie: every dataset dataobjects)
   * @param datasetEntity dataset entity
   */
  onAddDatasetToBasket = (datasetEntity) => {
    const { initialSearchQuery, dispatchAddToCart } = this.props
    const dataobjectQuery = new OpenSearchQuery(initialSearchQuery, [OpenSearchQuery.buildTagParameter(datasetEntity.content.ipId)])
    dispatchAddToCart([], dataobjectQuery.toQueryString())
  }

  /** Corresponding handler */
  onAddDatasetToBasketHandler = this.onAddDatasetToBasket.bind(this)

  /**
 * Computes cart related state fields from component properties
 * @param {*} properties this component properties
 * @return {boolean} true if basket is available
 */
  isBasketAvailable = ({ isAuthenticated, modules, availableDependencies }) => {
    // Available if...
    // A - User is logged in
    if (isAuthenticated) {
      // B - There is / are active Order cart module(s)
      const hasOrderCartModule = find((modules || {}), module =>
        (get(module, 'content.type', '') === modulesManager.ModuleTypes.ORDER_CART &&
          get(module, 'content.active', false)),
      )
      if (hasOrderCartModule) {
        // C - Finally, user must have rights to manage the basket
        return allMatchHateoasDisplayLogic(OrderCartContainer.BASKET_DEPENDENCIES, availableDependencies)
      }
    }
    // otherwise: NO it isn't
    return false
  }


  render() {
    const componentReportedProps = omit(this.props, OrderCartContainer.CONTAINER_SPECIFIC_PROPERTIES)
    const { onAddElementToBasket, onAddSelectionToBasket } = this.state
    return (
      <SearchResultsComponent
        {...componentReportedProps}
        onAddElementToCart={onAddElementToBasket}
        onAddSelectionToCart={onAddSelectionToBasket}
      />
    )
  }
}
export default connect(OrderCartContainer.mapStateToProps, OrderCartContainer.mapDispatchToProps)(OrderCartContainer)
