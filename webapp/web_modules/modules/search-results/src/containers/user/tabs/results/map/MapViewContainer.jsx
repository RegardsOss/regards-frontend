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
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import MapViewComponent from '../../../../../components/user/tabs/results/map/MapViewComponent'
import { getSelectionClient } from '../../../../../clients/SelectionClient'

/**
 * Container for map view
 * @author Sebastien Binda
 */
export class MapViewContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { tabType }) {
    const { tableActions } = getSelectionClient(tabType)
    return {
      dispatchSelectAll: () => dispatch(tableActions.selectAll()),
      updateResultsContext: (moduleId, newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // Description management
    descriptionAvailable: PropTypes.bool.isRequired,
    onShowDescription: PropTypes.func,
    // Download option and quicklooks display management
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Basket management
    onAddElementToCart: PropTypes.func, // used in onPropertiesUpdated
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
    dispatchSelectAll: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    itemOfInterestPicked: null,
  }

  UNSAFE_componentWillMount = () => {
    this.props.dispatchSelectAll()
  }

  /**
   * User callback: split dropped: update with new split position
   * @param {number} splitPosition split position
   */
  onSplitDropped = (splitPosition) => {
    const {
      moduleId, tabType, resultsContext, updateResultsContext,
    } = this.props
    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    // update current mode state by diff
    updateResultsContext(moduleId, {
      // update, for current tab and type, the split position in map mode state
      tabs: {
        [tabType]: {
          types: {
            [selectedType]: {
              modes: {
                [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                  splitPosition,
                },
              },
            },
          },
        },
      },
    })
  }

  /**
   * Handle product selection in Mizar/Cesium & in Quicklooks
   * @param {*} remove if true remove product from selectedProducts list
   * @param {*} product product selected : id & label
   */
  onProductSelected = (remove, product) => {
    const {
      moduleId, tabType, resultsContext, updateResultsContext,
    } = this.props
    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // We deal with only one selectedProduct for the moment
    // Change it later if we want to use more products
    const newSelectedProducts = remove ? [] : [product]
    // update current mode state by diff
    updateResultsContext(moduleId, {
      // update, for current tab and type, the selectedProducts
      tabs: {
        [tabType]: {
          types: {
            [selectedType]: {
              modes: {
                [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                  selectedProducts: newSelectedProducts,
                },
              },
            },
          },
        },
      },
    })
    this.setState({
      itemOfInterestPicked: new Date().getTime(),
    })
  }

  render() {
    const {
      moduleId, tabType, resultsContext, requestParameters, searchActions,
      descriptionAvailable, onShowDescription,
      accessToken, projectName, onAddElementToCart,
    } = this.props
    const {
      itemOfInterestPicked,
    } = this.state

    return (
      <MapViewComponent
        moduleId={moduleId}
        tabType={tabType}
        resultsContext={resultsContext}
        requestParameters={requestParameters}
        searchActions={searchActions}
        descriptionAvailable={descriptionAvailable}
        onShowDescription={onShowDescription}
        accessToken={accessToken}
        projectName={projectName}
        onAddElementToCart={onAddElementToCart}
        onProductSelected={this.onProductSelected}
        onSplitDropped={this.onSplitDropped}
        itemOfInterestPicked={itemOfInterestPicked}
      />)
  }
}

export default connect(null, MapViewContainer.mapDispatchToProps)(MapViewContainer)
