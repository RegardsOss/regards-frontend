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
import { withEntitiesCacheContainer } from '../common/withEntitiesCacheContainer'

export const MapViewCompoWithEntitiesCache = withEntitiesCacheContainer(MapViewComponent)
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
  static mapDispatchToProps(dispatch, { moduleId }) {
    return {
      updateResultsContext: (newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
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
  }

  /** Initial state */
  state = {
    itemOfInterestPicked: null,
  }

  /**
   * User callback: split dropped: update with new split position
   * @param {number} splitPosition split position
   */
  onSplitDropped = (splitPosition) => {
    const {
      tabType, resultsContext, updateResultsContext,
    } = this.props
    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    // update current mode state by diff
    updateResultsContext({
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
   * Force the Quicklooks view to redraw
   */
  onNewItemOfInterestPicked = (itemOfInterest) => {
    const {
      tabType, resultsContext, updateResultsContext,
    } = this.props
    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // update current mode state by diff
    updateResultsContext({
      // update, for current tab and type, the point of interest
      tabs: {
        [tabType]: {
          types: {
            [selectedType]: {
              modes: {
                [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                  itemOfInterest,
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

  /**
   * User double click on a single feature, let's save that feature into store
   * @param {*} zoomToFeature picked feature, matches Catalog.Entity shape (content)
   */
  onZoomToFeature = (zoomToFeature) => {
    if (zoomToFeature) {
      const {
        tabType, updateResultsContext, resultsContext,
      } = this.props
      const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

      // update selection mode in mode state
      updateResultsContext({
        tabs: {
          [tabType]: {
            types: {
              [selectedType]: {
                modes: {
                  [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                    zoomToFeature,
                  },
                },
              },
            },
          },
        },
      })
    }
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
      <MapViewCompoWithEntitiesCache
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
        onNewItemOfInterestPicked={this.onNewItemOfInterestPicked}
        onSplitDropped={this.onSplitDropped}
        itemOfInterestPicked={itemOfInterestPicked}
        onZoomToFeature={this.onZoomToFeature}
      />)
  }
}

export default connect(null, MapViewContainer.mapDispatchToProps)(MapViewContainer)
