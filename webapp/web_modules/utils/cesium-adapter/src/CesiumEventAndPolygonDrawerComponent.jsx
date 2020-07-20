import { GeoJsonFeature } from '@regardsoss/mizar-adapter'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import has from 'lodash/has'
import {
  ScreenSpaceEventType, Cartographic, Rectangle, Ellipsoid, Math, CallbackProperty, Color, Viewer,
} from 'cesium'
import {
  ScreenSpaceEventHandler, ScreenSpaceCameraController, ScreenSpaceEvent, Entity, RectangleGraphics,
} from 'resium'
import compact from 'lodash/compact'
import { CatalogDomain } from '@regardsoss/domain'

const INTERACTION_DRAW = {
  UNSTARTED: 'UNSTARTED',
  STARTED: 'STARTED',
}

/**
 * This class listens to Cesium events
 * Also allows user to draw a rectangle over the map
 */
export default class CesiumEventAndPolygonDrawerComponent extends React.Component {
  static propTypes = {
    cesiumContext: PropTypes.shape({
      current: PropTypes.shape({
        cesiumElement: PropTypes.instanceOf(Viewer),
      }),
    }),
    cesiumDrawColor: PropTypes.instanceOf(Color),
    drawingSelection: PropTypes.bool.isRequired,
    onDrawingSelectionDone: PropTypes.func.isRequired, // (initPoint, finalPoint) => ()
    // Currently shownig areas - ONLY used to display currently applyed areas
    // eslint-disable-next-line react/no-unused-prop-types
    drawnAreas: PropTypes.arrayOf(GeoJsonFeature),
    onFeaturesSelected: PropTypes.func.isRequired,
  }

  /**
   * The current Cesium object storing rectangle position
   */
  rectangle = null

  /**
   * Callback used by Cesium to retrieve the rectangle position
   */
  callback = new CallbackProperty((time, result) => Rectangle.clone(this.rectangle, result), false)

  /**
   * First point pick by the user
   */
  currentDrawingInitPoint = null

  /**
   * Current interaction state
   */
  currentInteractionState = INTERACTION_DRAW.UNSTARTED

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
   // reset to default when drawingSelection changes
   if (!isEqual(oldProps.drawingSelection, newProps.drawingSelection)) {
     this.currentDrawingInitPoint = null
     this.currentInteractionState = INTERACTION_DRAW.UNSTARTED
     this.rectangle = new Rectangle()
   }
   // Draw the rectangle if provided by parent, clear it if
   if (!isEqual(oldProps.drawnAreas, newProps.drawnAreas)) {
     if (!isEmpty(newProps.drawnAreas)) {
       this.rectangle = Rectangle.fromCartographicArray([
         Cartographic.fromDegrees(
           newProps.drawnAreas[0].geometry.coordinates[0][0][0],
           newProps.drawnAreas[0].geometry.coordinates[0][0][1]),
         Cartographic.fromDegrees(
           newProps.drawnAreas[0].geometry.coordinates[0][2][0],
           newProps.drawnAreas[0].geometry.coordinates[0][2][1],
         )])
     } else {
       // When user clear the criteria
       this.rectangle = new Rectangle()
     }
   }
 }

  getLatLongFromCartesian3 = (cartesian3Point) => {
    const carto = Ellipsoid.WGS84.cartesianToCartographic(cartesian3Point)
    return [
      Math.toDegrees(carto.longitude),
      Math.toDegrees(carto.latitude),
    ]
  }

  getLatLongFromPosition = (position) => {
    const {
      cesiumContext,
    } = this.props
    const cartesian = cesiumContext.current.cesiumElement.scene.camera.pickEllipsoid(position, Ellipsoid.WGS84)
    let result
    if (cartesian) {
      result = this.getLatLongFromCartesian3(cartesian)
    }
    return result
  }

  handleSaveInitPoint = (movement) => {
    const initPoint = this.getLatLongFromPosition(movement.position)
    if (initPoint) {
      this.currentDrawingInitPoint = initPoint
      this.currentInteractionState = INTERACTION_DRAW.STARTED
    }
  }

  handleSaveLastPoint = (movement) => {
    const {
      onDrawingSelectionDone,
    } = this.props
    const endPoint = this.getLatLongFromPosition(movement.position)
    if (endPoint) {
      onDrawingSelectionDone(this.currentDrawingInitPoint, endPoint)
      this.currentInteractionState = INTERACTION_DRAW.UNSTARTED
    }
  }

  handleSelectFeatures = (movement) => {
    const { cesiumContext } = this.props
    const pickedObjects = cesiumContext.current.cesiumElement.scene.drillPick(movement.position)
    if (!isEmpty(pickedObjects)) {
      // Iterate over picked entites from Cesium and remove all objects not coming from REGARDS catalog
      const selectedEntities = compact(map(pickedObjects, (entity) => {
        if (has(entity, 'id') && CatalogDomain.TagsHelper.isURNTag(entity.id.id)) {
          return {
            feature: {
              id: entity.id.id,
            },
          }
        }
        return null
      }))
      // Do not send event if there is no REGARDS feature selected
      if (!isEmpty(selectedEntities)) {
        this.props.onFeaturesSelected(selectedEntities)
      }
    }
  }

  handleLeftClick = (movement) => {
    const {
      drawingSelection,
    } = this.props

    // Ensure movement usable
    if (movement.position != null) {
      if (drawingSelection) {
        // When drawing selection active
        switch (this.currentInteractionState) {
          // 1- No point registred yet
          case INTERACTION_DRAW.UNSTARTED:
            this.handleSaveInitPoint(movement)
            break
          // 2- the user clicked a second time to finished the rectangle
          case INTERACTION_DRAW.STARTED:
            this.handleSaveLastPoint(movement)
            break
          default:
            throw new Error(`Unexpected state ${this.currentInteractionState}`)
        }
      } else {
        // When drawing selection not active, intersect the cursor with the datasource
        this.handleSelectFeatures(movement)
      }
    }
  }

  handleMouseMove = (movement) => {
    const {
      drawingSelection,
    } = this.props
    // console.error("Mouse move :=)")
    // Ensure the drawing selection is active and movement usable
    if (drawingSelection && movement.endPosition != null && this.currentInteractionState === INTERACTION_DRAW.STARTED) {
      // the user is moving the mouse so rectangle too
      const currentPoint = this.getLatLongFromPosition(movement.endPosition)
      if (currentPoint) {
        this.rectangle = Rectangle.fromCartographicArray([
          Cartographic.fromDegrees(
            this.currentDrawingInitPoint[0],
            this.currentDrawingInitPoint[1]),
          Cartographic.fromDegrees(
            currentPoint[0],
            currentPoint[1],
          )])
      }
    }
  }

  handleLeftDown = (movement) => {
    const {
      drawingSelection,
    } = this.props
    // Ensure the drawing selection is active and movement usable
    if (drawingSelection && movement.position != null && this.currentInteractionState === INTERACTION_DRAW.UNSTARTED) {
      this.handleSaveInitPoint(movement)
    }
  }

  handleLeftUp = (movement) => {
    const {
      drawingSelection,
    } = this.props
    // Ensure the drawing selection is active and movement usable
    if (drawingSelection && movement.position != null && this.currentInteractionState === INTERACTION_DRAW.STARTED) {
      // 1- the user released the button to finish the rectangle
      this.handleSaveLastPoint(movement)
    }
  }

  render() {
    const {
      drawingSelection, cesiumDrawColor,
    } = this.props
    return <React.Fragment>
      <Entity>
        <RectangleGraphics
          coordinates={this.callback}
          fill={false}
          outline
          outlineColor={cesiumDrawColor}
          outlineWidth={2}
        />
      </Entity>
      <ScreenSpaceEventHandler>
        <ScreenSpaceCameraController
          enableRotate={!drawingSelection}
          enableZoom={!drawingSelection}
        />
        <ScreenSpaceEvent action={this.handleMouseMove} type={ScreenSpaceEventType.MOUSE_MOVE} />
        <ScreenSpaceEvent action={this.handleLeftClick} type={ScreenSpaceEventType.LEFT_CLICK} />
        <ScreenSpaceEvent action={this.handleLeftDown} type={ScreenSpaceEventType.LEFT_DOWN} />
        <ScreenSpaceEvent action={this.handleLeftUp} type={ScreenSpaceEventType.LEFT_UP} />
      </ScreenSpaceEventHandler>
    </React.Fragment>
  }
}
