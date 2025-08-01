/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import head from 'lodash/head'
import map from 'lodash/map'
import { ToponymUploader, UPLOADER_DISPLAY_MODES } from '@regardsoss/components'
import { CatalogDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes, CatalogShapes, UIShapes } from '@regardsoss/shape'
import { toAreaFeature, toBoxCoordinates, geometryToAreaFeature } from '@regardsoss/mizar-adapter'
import { connect } from '@regardsoss/redux'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import MapComponent from '../../../../../components/user/tabs/results/map/MapComponent'
import { toponymSelectors } from '../../../../../clients/ToponymClient'
import { withSelectionContainer } from '../common/withSelectionContainer'

export const MapComponentWithSelection = withSelectionContainer(MapComponent)
/**
 * Map container: adapts current context and results to display it on a map. Provides corresponding callbacks
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class MapContainer extends React.Component {
  static propTypes = {
    // results context
    moduleId: PropTypes.number.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    // product selection management
    onNewItemOfInterestPicked: PropTypes.func.isRequired,
    // product zoom to management
    onZoomToFeature: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    loadedEntities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired, // Entities cached
    // flush table selection
    flushSelection: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    toponymList: AccessShapes.ToponymList,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Drawing selection feature ID */
  static DRAWING_SELECTION_FEATURE_ID = 'DRAWING_SELECTION_FEATURE'

  /** Drawing selection feature ID  (basis, use index to ensure unique)*/
  static CURRENT_CRITERION_FEATURE_ID = 'CURRENT_SELECTION_FEATURE#'

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      toponymList: toponymSelectors.getList(state),
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
      updateResultsContext: (moduleId, newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
    }
  }

  /**
   * Builds GeoJson features collections from regards catalog entities or toponyms as parameter.
   * Removes entities with null geometry
   * @param {*} entities
   */
  static buildGeoJSONFeatureCollection(entities = []) {
    return {
      // REGARDS entities & toponyms are features withing content field. Filter entities without geometry
      features: entities.filter((e) => !isNil(e.geometry) && !isEmpty(e.geometry)),
      type: 'FeatureCollection',
    }
  }

  /**
   * Build toponym collection thanks to toponym criteria & toponym list from redux store
   * Used to drawn a restriction area around toponym feature collection
   * @param {*} toponymCriteria
   * @param {*} toponymList
   */
  static buildToponymCollection(toponymCriteria, toponymList) {
    return map(toponymCriteria, (topoCriteria) => {
      const toponymBusinessId = get(topoCriteria, `requestParameters.${CatalogDomain.CatalogSearchQueryHelper.TOPONYM_PARAMETER_NAME}`, '')
      const toponym = find(toponymList, (topo) => topo.content.businessId === toponymBusinessId)
      return get(toponym, 'content')
    }).filter((c) => !!c)
  }

  /** Initial state */
  state = {
    // Holds loaded entities with geometry as features collection
    featuresCollection: MapContainer.buildGeoJSONFeatureCollection([]),
    // holds the single area user is currently drawing (as array to avoid creating it at runtime)
    currentlyDrawingAreas: [],
    // holds the areas currently applying as geometry criteria
    criteriaAreas: [],
    // holds the background layer conf
    backgroundLayerConf: {},
    /** Holds selected toponyms */
    selectedToponyms: [],
    featureShapefile: MapContainer.buildGeoJSONFeatureCollection([]),
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const nextState = { ...this.state }
    const {
      loadedEntities: oldLoadedEntities, resultsContext: oldResultsContext, tabType: oldTabType,
      toponymList: oldToponymList,
    } = oldProps
    const {
      loadedEntities,
      resultsContext,
      tabType,
      toponymList,
      // fetchToponym,
    } = newProps

    // detect entities list changes: re build locally the full list shown (Note: both entities and metadata change together, see BasicPageReducers)
    if (!isEqual(oldLoadedEntities, loadedEntities)) {
      // add newly loaded entities, removing content field level, as expected for features
      nextState.featuresCollection = MapContainer.buildGeoJSONFeatureCollection(loadedEntities.map((e) => e.content))
    }

    // Handle feedback displayed area: each time selection mode change, reset it to empty
    const { tab, selectedModeState: { mapSelectionMode } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    const { tab: oldTab, selectedModeState: { mapSelectionMode: oldSelectionMode } } = oldResultsContext && oldTabType
      ? UIDomain.ResultsContextHelper.getViewData(oldResultsContext, oldTabType)
      : { tab: null, selectedModeState: {} }
    if (!isEqual(oldSelectionMode, mapSelectionMode)) {
      nextState.currentlyDrawingAreas = []
    }

    // Handle criteria update: pre-compute the list of areas in state
    if (!isEqual(get(oldTab, 'criteria.geometry'), tab.criteria.geometry)
      || !isEqual(get(oldTab, 'criteria.toponymCriteria'), tab.criteria.toponymCriteria)
      || !isEqual(oldToponymList, toponymList)) {
      if (!isEmpty(tab.criteria.geometry)) {
        nextState.criteriaAreas = tab.criteria.geometry.map(
          ({ point1, point2 }, index) => toAreaFeature(`${MapContainer.CURRENT_CRITERION_FEATURE_ID}${index}`, point1, point2))
        nextState.selectedToponyms = MapContainer.buildGeoJSONFeatureCollection() // build empty list
      } else {
        const toponymCollection = MapContainer.buildToponymCollection(tab.criteria.toponymCriteria, toponymList)
        nextState.selectedToponyms = MapContainer.buildGeoJSONFeatureCollection(toponymCollection)
        nextState.criteriaAreas = map(nextState.selectedToponyms.features, (toponym) => {
          let boundingBox = get(toponym, 'boundingBox')
          if (boundingBox) {
            boundingBox = JSON.parse(boundingBox)
            const swPointLon = get(boundingBox, 'sw.lon')
            const swPointLat = get(boundingBox, 'sw.lat')
            const nePointLon = get(boundingBox, 'ne.lon')
            const nePointLat = get(boundingBox, 'ne.lat')
            if (swPointLon && swPointLat && nePointLon && nePointLat) {
              return toAreaFeature(`${MapContainer.CURRENT_CRITERION_FEATURE_ID}${toponym.businessId}`, [swPointLon, swPointLat], [nePointLon, nePointLat])
            }
          }
          return geometryToAreaFeature(`${MapContainer.CURRENT_CRITERION_FEATURE_ID}${toponym.businessId}`, toponym.geometry)
        })
      }
    }
    // update state on change
    if (!isEqual(nextState, this.state)) {
      this.setState(nextState)
    }
  }

  /**
   * User toggled on / off view mode
   * @param {string} mode new mode either MODE_3D or MODE_2D
   */
  onToggleViewMode = (mode) => {
    const {
      moduleId, tabType, updateResultsContext, resultsContext,
    } = this.props
    const { selectedType, selectedModeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // update only when there is some change
    if (mode !== selectedModeState.viewMode) {
      // update selection mode in mode state
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            types: {
              [selectedType]: {
                modes: {
                  [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                    viewMode: mode,
                  },
                },
              },
            },
          },
        },
      })
    }
  }

  /**
   * User toggled on / off selection mode
   * @param {string} mode new mode either PICK_ON_CLICK or DRAW_RECTANGLE
   */
  onToggleSelectionMode = (mode) => {
    const {
      moduleId, tabType, updateResultsContext, resultsContext,
    } = this.props
    const { selectedType, selectedModeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // update only when there is some change
    if (mode !== selectedModeState.mapSelectionMode) {
      // update selection mode in mode state
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            types: {
              [selectedType]: {
                modes: {
                  [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                    mapSelectionMode: mode,
                  },
                },
              },
            },
          },
        },
      })
    }
  }

  /**
   * Currently drawing selection updated. Update feedback
   * @param {[number]} point1 first point as coordinates array
   * @param {[number]} point2 second point as coordinates array
   */
  onDrawingSelectionUpdated = (point1, point2) => {
    const feedbackFeature = toAreaFeature(MapContainer.DRAWING_SELECTION_FEATURE_ID, point1, point2)
    // update displayed area
    this.setState({
      currentlyDrawingAreas: feedbackFeature ? [
        toAreaFeature(MapContainer.DRAWING_SELECTION_FEATURE_ID, point1, point2),
      ] : [],
    })
  }

  /**
   * Currently drawing selection finished: set it as geometry criterion
   * @param {[number]} point1 first point as coordinates array
   * @param {[number]} point2 second point as coordinates array
   */
  onDrawingSelectionDone = (point1, point2) => {
    const {
      moduleId, tabType, updateResultsContext, resultsContext, flushSelection,
    } = this.props
    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    const {
      minX, maxX, minY, maxY, empty,
    } = toBoxCoordinates(point1, point2)

    // check area is not empty (empty area cannot be applied as criterion)
    if (!empty) {
      flushSelection()
      // update in results context, by diff
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            criteria: {
              geometry: [{ // add or replace geometry parameter
                point1,
                point2,
                requestParameters: {
                  [CatalogDomain.CatalogSearchQueryHelper.GEOMETRY_PARAMETER_NAME]:
                    // WKT
                    `POLYGON((${minX} ${minY},${maxX} ${minY},${maxX} ${maxY},${minX} ${maxY},${minX} ${minY}))`,
                },
              }],
              toponymCriteria: [],
            },
            types: {
              [selectedType]: {
                modes: {
                  [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                    mapSelectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
                  },
                },
              },
            },
          },
        },
      })
    }
  }

  /**
   * User double click on a list of features, let's zoom on the first one
   * @param {*} zoomToFeatureProduct picked features list
   */
  onProductsZoomTo = (zoomToFeatureProduct) => {
    // skip when selection is empty
    if (!zoomToFeatureProduct.length) {
      return
    }
    const firstZoomToProduct = head(zoomToFeatureProduct)
    if (firstZoomToProduct) {
      const { onZoomToFeature } = this.props
      onZoomToFeature(firstZoomToProduct)
    }
  }

  /**
   * User picked a toponym, apply it as research criterion
   * @param {*} selectedToponymBusinessId picked toponym businessId
   */
  onToponymSelected = (selectedToponymBusinessId) => {
    // skip when selection is empty
    if (!selectedToponymBusinessId) {
      return
    }
    const {
      moduleId, tabType, updateResultsContext, flushSelection,
    } = this.props
    flushSelection()
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          criteria: {
            toponymCriteria: [{
              requestParameters: {
                [CatalogDomain.CatalogSearchQueryHelper.TOPONYM_PARAMETER_NAME]:
                  selectedToponymBusinessId,
              },
            }],
            geometry: [],
          },
        },
      },
    })
  }

  render() {
    const {
      tabType, resultsContext, onNewItemOfInterestPicked, loadedEntities,
    } = this.props
    const {
      featuresCollection, currentlyDrawingAreas, criteriaAreas,
      selectedToponyms, featureShapefile,
    } = this.state

    // pre: respects necessarily MapViewModeState shapes
    const {
      selectedModeState: {
        layers, mapSelectionMode, mapEngine, viewMode, zoomToFeature,
      },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <ToponymUploader
        onToponymUploaded={this.onToponymSelected}
        displayMode={UPLOADER_DISPLAY_MODES.LARGE}
      >
        <MapComponentWithSelection
          loadedEntities={loadedEntities}
          featuresCollection={featuresCollection}
          displayedAreas={mapSelectionMode === UIDomain.MAP_SELECTION_MODES_ENUM.DRAW_RECTANGLE
            ? currentlyDrawingAreas /* drawing: show feedback area */
            : criteriaAreas /* not drawing: show criteria areas */}
          mapSelectionMode={mapSelectionMode}
          viewMode={viewMode}
          onToggleViewMode={this.onToggleViewMode}
          onToggleSelectionMode={this.onToggleSelectionMode}
          onDrawingSelectionUpdated={this.onDrawingSelectionUpdated}
          onDrawingSelectionDone={this.onDrawingSelectionDone}
          onProductsZoomTo={this.onProductsZoomTo}
          layers={layers}
          mapEngine={mapEngine}
          tabType={tabType}
          onToponymSelected={this.onToponymSelected}
          selectedToponyms={selectedToponyms}
          featureShapefile={featureShapefile}
          zoomToFeature={zoomToFeature}
          // Selection container props
          onNewItemOfInterestPicked={onNewItemOfInterestPicked}
        />
      </ToponymUploader>
    )
  }
}
export default connect(
  MapContainer.mapStateToProps,
  MapContainer.mapDispatchToProps)(MapContainer)
