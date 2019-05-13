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
import isNumber from 'lodash/isNumber'
import SplitPane from 'react-split-pane'
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { Measure } from '@regardsoss/adapters'
import MapContainer from '../../../../containers/user/results/map/MapContainer'
import QuicklooksViewContainer from '../../../../containers/user/results/quickooks/QuicklooksViewContainer'

// provide split pane styles
import '../../../../styles/split-pane-resizer.css'


/**
 * Map view display component. It shows map on left and quicklooks on right
 *
 * @author Raphaël Mechali
 */
class MapViewComponent extends React.Component {
  static propTypes = {
    // results context
    moduleId: PropTypes.number.isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    // Description management
    descriptionAvailable: PropTypes.bool.isRequired,
    onShowDescription: PropTypes.func,
    // Download option and quicklooks display management
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Basket management
    onAddElementToCart: PropTypes.func, // used in onPropertiesUpdated
    // split management
    onSplitDropped: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Features page size for map */
  static MAP_PAGE_SIZE = 100

  /** Initial state */
  state = {
    width: null,
    height: undefined, // leave undefined to use a default value
  }


  /**
   * Split pane was dragged: store new position
   * @param {number} split position
   */
  onSplitDroped = (splitPosition) => {
    const { onSplitDropped } = this.props
    onSplitDropped(splitPosition)
  }

  /**
   * Component was resized: store new position
   * @param {*} measuredElements measure elements with bounds
   */
  onComponentResized = ({ measureDiv: { width, height } }) => {
    this.setState({
      width: Math.ceil(width),
      height: Math.ceil(height),
    })
  }

  /**
   * Computes the left pane size to use according with split position set by the user,
   * current width and minimal quicklook and map widths
   * @return {number} width to use for left pane
   */
  getLeftPaneWidth = () => {
    const { resultsContext } = this.props
    const { width } = this.state
    const { quicklooks, mizar } = this.context.muiTheme.module.searchResults.map
    // recover split position
    const { currentModeState: { splitPosition } } = UIDomain.ResultsContextConstants.getViewData(resultsContext)

    if (isNumber(width)) {
      if (isNumber(splitPosition)) {
        // A - when both width and split position are known, use last split position but make sure min width are respected
        // check Mizar min width and quicklook min width are both respected
        if (splitPosition < mizar.minWidth) {
          // A.1 - left overflow, cap to min mizar width
          return mizar.minWidth
        }
        if (width - splitPosition < quicklooks.minWidth) {
          // A.2 - rigth overflow, cap to min quicklooks width
          return width - quicklooks.minWidth
        }
        // A.3 - Normal case: return the split position user set
        return splitPosition
      }
      // B - Only width is known: place at default proportion
      return Math.ceil(width * mizar.initialRelativeWidth) // Not initialized
    }
    // C - no bound data, set at MIN quicklook size
    return mizar.minWidth
  }

  render() {
    const {
      moduleId, resultsContext, requestParameters, searchActions,
      descriptionAvailable, onShowDescription,
      accessToken, projectName, onAddElementToCart,
    } = this.props
    const { width, height = 0 } = this.state
    const { moduleTheme: { user: { mapViewStyles } }, muiTheme } = this.context
    // inject theme context to force quicklooks container recomputing cells properties
    const { quicklooks, mizar } = muiTheme.module.searchResults.map
    const leftPaneWidth = this.getLeftPaneWidth()

    /*
     * XXX-Workaround-Force-Redraw: the split pane "forgets repainting" the property "size" changes.
     * Therefore, we force children repainting, using a key built on size
     */
    return (
      <Measure bounds onMeasure={this.onComponentResized}>
        {({ bind }) => (
          <div style={mapViewStyles.geoLayout} {...bind('measureDiv')}>
            <SplitPane
              split="vertical"
              minSize={mizar.minWidth}
              maxSize={width - quicklooks.minWidth}
              onDragFinished={this.onSplitDroped}
              size={leftPaneWidth}
              resizerStyle={mapViewStyles.resizer}
            >
              {/* Left: Map */}
              <div
                style={mapViewStyles.mizarWrapper}
                width={leftPaneWidth}
                height={height}
                // see force redraw workaround comment above
                key={`map-view:width-${leftPaneWidth}`}
              >
                <MapContainer
                  moduleId={moduleId}
                  resultsContext={resultsContext}
                />
              </div>
              { /* Right: qiuicklooks container */ }
              <div
                style={mapViewStyles.quicklookViewLayout}
                // see force redraw workaround comment above
                key={`quicklook-view:width-${leftPaneWidth}`}
              >
                <QuicklooksViewContainer
                  resultsContext={resultsContext}
                  requestParameters={requestParameters}
                  searchActions={searchActions}

                  descriptionAvailable={descriptionAvailable}
                  onShowDescription={onShowDescription}

                  accessToken={accessToken}
                  projectName={projectName}

                  onAddElementToCart={onAddElementToCart}

                  mapThumbnailHeight={quicklooks.thumbnailHeight}
                  embedInMap
                />
              </div>
            </SplitPane>
          </div>
        )}
      </Measure>)
  }
}
export default MapViewComponent
