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
import isEqual from 'lodash/isEqual'
import head from 'lodash/head'
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import { UIDomain } from '@regardsoss/domain'
import { CatalogShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes } from '@regardsoss/components'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'
import { getSelectionClient } from '../../../../../clients/SelectionClient'

const getReactCompoName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

/**
 * Return the list of displayed entity selected
 * When selectionMode is exclude, compute the displayed list
 */
export function getSelectedProducts({ selectionMode, toggledElements, entities }) {
  if (TableSelectionModes.includeSelected === selectionMode) {
    return toggledElements
  }
  return reduce(entities, (acc, entity) => {
    const entityId = entity.content.id
    if (!find(toggledElements, (toggledElement) => toggledElement.content.id === entityId)) {
      acc[entityId] = entity
    }
    return acc
  }, {})
}

/**
 * Decorates a React component to inject (table) selection related functionnalities and values
  *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Léo Mieulet
 */
export const withMapSelectionContainer = (DecoratedComponent) => {
  /**
   * Handle feature selection on map
   * @author Léo Mieulet
   */
  class MapSelectionContainer extends React.Component {
    static propTypes = {
      // eslint-disable-next-line react/no-unused-prop-types
      tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
      // Call when user has selected a new product on map
      onNewItemOfInterestPicked: PropTypes.func.isRequired,

      // product selection management
      // from mapStateToProps
      entities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
      toggledElements: PropTypes.objectOf(CatalogShapes.Entity).isRequired, // inner object is entity type
      // eslint-disable-next-line react/no-unused-prop-types
      selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,

      // from mapDispatchToProps
      setSelection: PropTypes.func.isRequired,
    }

    static displayName = `withMapSelectionContainer(${getReactCompoName(DecoratedComponent)})`

    /**
     * Redux: map state to props function
     * @param {*} state: current redux state
     * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
    static mapStateToProps(state, { tabType }) {
      const { searchSelectors } = getSearchCatalogClient(tabType)
      const { tableSelectors } = getSelectionClient(tabType)

      return {
        // results entities
        entities: searchSelectors.getOrderedList(state),
        selectionMode: tableSelectors.getSelectionMode(state),
        toggledElements: tableSelectors.getToggledElements(state),
      }
    }

    /**
     * Redux: map dispatch to props function
     * @param {*} dispatch: redux dispatch function
     * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of actions ready to be dispatched in the redux store
     */
    static mapDispatchToProps(dispatch, { tabType }) {
      const { tableActions } = getSelectionClient(tabType)
      return {
        setSelection: (selectionMode, toggledElements) => dispatch(tableActions.setSelection(selectionMode, toggledElements)),
      }
    }

    state = {
      selectedProducts: {},
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
      const {
        toggledElements, entities, selectionMode,
      } = newProps

      if (!isEqual(oldProps.toggledElements, toggledElements)
        || oldProps.selectionMode !== selectionMode
        || !isEqual(oldProps.entities, entities)) {
        this.setState({
          selectedProducts: getSelectedProducts(newProps),
        })
      }
    }

    /**
     * Add provided products to the initElements list
     */
    includeProductsIntoResult = (initElements, products) => {
      const {
        entities,
      } = this.props
      return {
        ...initElements,
        ...reduce(products, (acc, product) => {
          acc[product.id] = find(entities, (entity) => entity.content.id === product.id)
          return acc
        }, {}),
      }
    }

    /**
     * Remove provided products from the initElements list
     */
    excludeProductsFromResult = (initElements, products) => reduce(products, (acc, product) => {
      delete acc[product.id]
      return acc
    }, { ...initElements })

    /**
     * Handle product selection in Mizar/Cesium & in Quicklooks
     * @param {*} product products selected : id & label
     */
    onProductSelected = (products) => {
      const {
        selectionMode, toggledElements, setSelection, onNewItemOfInterestPicked,
      } = this.props
      if (products.length) {
        // Update list of product selected
        const hasToggleExistingElement = find(toggledElements, (toggledElement) => find(products, (product) => toggledElement.content.id === product.id))
        const newToggledElements = hasToggleExistingElement ? this.excludeProductsFromResult(toggledElements, products) : this.includeProductsIntoResult(toggledElements, products)
        setSelection(selectionMode, newToggledElements)
        // Update point of interest
        if (!hasToggleExistingElement) {
          const itemOfInterest = head(products)
          onNewItemOfInterestPicked(itemOfInterest)
        }
      } else {
        console.error('No product')
      }
    }

    render() {
      const {
        // eslint-disable-next-line no-unused-vars
        toggledElements, entities, selectionMode, setSelection, onNewItemOfInterestPicked, ...props
      } = this.props
      const { selectedProducts } = this.state
      return <DecoratedComponent
        {...props}
        onProductSelected={this.onProductSelected}
        selectedProducts={selectedProducts}
      />
    }
  }
  return connect(
    MapSelectionContainer.mapStateToProps,
    MapSelectionContainer.mapDispatchToProps)(MapSelectionContainer)
}
