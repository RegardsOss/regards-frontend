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
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import RaisedButton from 'material-ui/RaisedButton'
import EditLocation from 'material-ui/svg-icons/maps/edit-location'
import Delete from 'material-ui/svg-icons/action/delete'
import Lock from 'material-ui/svg-icons/action/lock'
import Search from 'material-ui/svg-icons/action/search'
import SplitPane from 'react-split-pane'
import { connect } from '@regardsoss/redux'
import { Measure } from '@regardsoss/adapters'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { InfiniteGalleryContainer } from '@regardsoss/components'
import { CatalogShapes } from '@regardsoss/shape'
import styles from './styles'
import messages from './i18n'
import MizarAdapter from './adapters/MizarAdapter'
import './resizer.css'
import ItemComponent from './ItemComponent'

/**
 * Container for geo view. Containing Mizar and Quiclooks.
 * @author Sebastien Binda
 */
export class GeoViewContainer extends React.Component {
  static mapStateToProps(state, { pageSelectors }) {
    return {
      // results entities
      entities: pageSelectors.getOrderedList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { pageActions, tableActions }) {
    return {
      flushEntities: () => dispatch(pageActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage, pathParam, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, pathParam, requestParams)),
    }
  }

  static propTypes = {
    backgroundLayerUrl: PropTypes.string.isRequired, // URL Layer to dislay Mizar background
    backgroundLayerType: PropTypes.string.isRequired, // Layer type for Mizar
    queryPageSize: PropTypes.number,
    accessToken: PropTypes.string, // Needed to access quicklooks
    projectName: PropTypes.string, // Needed to access quicklooks if no auth token
    // eslint-disable-next-line react/no-unused-prop-types,react/forbid-prop-types
    requestParams: PropTypes.any,
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store

    // from map state to props
    entities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    // from map dispatch to props
    flushEntities: PropTypes.func.isRequired,
    fetchEntities: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Builds GeoJson features collections from regards catalog entities as parameter.
   * Removes entities with null geometry
   * @param {*} entities
   */
  static buildGeoJSONFeatureCollection(entities = []) {
    return {
      // REGARDS entities are features withing content field. Filter entities without geometry
      features: map(entities, entity => entity.content).filter(e => !isNil(e.geometry)),
      type: 'FeatureCollection',
    }
  }

  static MIZAR_MIN_WIDTH=400

  static MIZAR_DEFAULT_SIZE_PROPORTION=0.7

  static QUICKLOOK_MIN_WIDTH = 175


  /** Initial state */
  state = {
    features: [],
    position: null,
    width: null,
    height: null,
    featureDrawn: null,
    drawMode: false,
  }

  componentWillReceiveProps = (newProps) => {
    if (!isEqual(this.props.entities, newProps.entities)) {
      this.setState({
        features: this.state.features.concat(newProps.entities),
      })
    }
  }

  /**
   * Fetches an entity page (prevents fetching multiple times the same entity)
   * @param {fetchEntities:{func}, requestParams:{}} props component props to use
   * @param {number} pageNumber number of page to fetch (optional, defaults to 0)
   */
  fetchEntityPage = ({
    pathParams, requestParams, queryPageSize,
  }, pageNumber = 0) => this.props.fetchEntities(pageNumber, queryPageSize, pathParams, requestParams)

  flushEntities = () => {
    this.props.flushEntities()
    this.setState({ features: [] })
  }

  onApplyGeoParameter = () => {
    const { featureDrawn } = this.state
    if (featureDrawn) {
      // 1. Flush existing entities from store
      // this.flushEntities()
      // 2. Create geometry search criterion
      // const coord = featureDrawn.geometry.coordinates
      // const wkt = `POLYGON((${coord[0][0][0]} ${coord[0][0][1]},${coord[0][1][0]} ${coord[0][1][1]},${coord[0][2][0]} ${coord[0][2][1]},${coord[0][0][0]} ${coord[0][0][1]}))`
      // 3. Add the geometry criterion to the common search context
      // TODO
    }
  }

  onComponentResized = ({ measureDiv: { width, height } }) => {
    const previousWidth = this.state.width
    const coeff = previousWidth ? width / previousWidth : 1
    let newPosition = this.state.position ? this.state.position * coeff : width * GeoViewContainer.MIZAR_DEFAULT_SIZE_PROPORTION

    if (width - newPosition < GeoViewContainer.QUICKLOOK_MIN_WIDTH) {
      newPosition = width - GeoViewContainer.QUICKLOOK_MIN_WIDTH
    }

    this.setState({
      width,
      height,
      position: newPosition,
      features: [],
    })
  }

  onFeatureDrawn = featureDrawn => this.setState({ featureDrawn })

  onFeatureClear = () => this.setState({ featureDrawn: null })

  onFeaturesSelected = (features) => {
    // TODO
  }

  resize = (position) => {
    // Handle case of minimum width for right part of the layout (quicklooks)
    let newPosition = position
    if (this.state.width - newPosition < GeoViewContainer.QUICKLOOK_MIN_WIDTH) {
      newPosition = this.state.width - GeoViewContainer.QUICKLOOK_MIN_WIDTH
      // Force new render by changing the position value in state. If not, the SplitPane is not redraw and the split zone is not updated
      if (newPosition === this.state.position) {
        newPosition -= 1
      }
    }

    this.setState({
      position: newPosition,
      features: [],
    })
  }

  toggleDrawMode = () => {
    this.setState({ drawMode: !this.state.drawMode })
  }

  render() {
    const {
      position, features, drawMode, featureDrawn, height, width,
    } = this.state
    const {
      backgroundLayerUrl, backgroundLayerType, accessToken,
      projectName, queryPageSize, pageActions, pageSelectors, requestParams,
    } = this.props
    const { moduleTheme, muiTheme } = this.context
    const { intl: { formatMessage } } = this.context
    const defaultSize = position || (width ? width * GeoViewContainer.MIZAR_DEFAULT_SIZE_PROPORTION : GeoViewContainer.MIZAR_MIN_WIDTH)

    const itemProps = {
      height: 150,
      accessToken,
      projectName,
    }

    return (
      <Measure bounds onMeasure={this.onComponentResized}>
        {({ bind }) => (
          <div style={moduleTheme.geoLayout} {...bind('measureDiv')}>
            <SplitPane
              key={`resizer-${defaultSize}`}
              split="vertical"
              minSize={GeoViewContainer.MIZAR_MIN_WIDTH}
              onDragFinished={this.resize}
              defaultSize={defaultSize}
              resizerStyle={moduleTheme.resizer}
            >
              <div id="left" style={moduleTheme.mizarWrapper} width={position || defaultSize} height={height}>
                {drawMode ? <Lock style={moduleTheme.lockIcon} /> : null}
                <MizarAdapter
                  key="mizarAdapter"
                  backgroundLayerUrl={backgroundLayerUrl}
                  backgroundLayerType={backgroundLayerType}
                  featuresCollection={GeoViewContainer.buildGeoJSONFeatureCollection(features)}
                  onFeatureDrawn={this.onFeatureDrawn}
                  onFeatureClear={this.onFeatureClear}
                  featureDrawn={!!featureDrawn}
                  drawMode={drawMode}
                  onFeaturesSelected={this.onFeaturesSelected}
                  featuresColor={muiTheme.palette.accent1Color}
                  drawColor={muiTheme.palette.accent2Color}
                />
                {featureDrawn ? [
                  <RaisedButton
                    key="delete"
                    label={formatMessage({ id: 'clear.button.label' })}
                    labelPosition="before"
                    icon={<Delete />}
                    style={moduleTheme.clearButton}
                    onClick={this.onFeatureClear}
                  />,
                  <RaisedButton
                    key="apply"
                    label={formatMessage({ id: 'apply.geo.filter.button.label' })}
                    labelPosition="before"
                    icon={<Search />}
                    primary
                    style={moduleTheme.applyGeoButton}
                    onClick={this.onApplyGeoParameter}
                  />] : null}
              </div>
              <div id="right" style={moduleTheme.quicklookViewLayout}>
                <div style={moduleTheme.quiclooks}>
                  <InfiniteGalleryContainer
                    key="map-quicklooks"
                    itemComponent={ItemComponent}
                    pageActions={pageActions}
                    pageSelectors={pageSelectors}
                    columnWidth={150}
                    columnGutter={10}
                    requestParams={requestParams}
                    queryPageSize={queryPageSize}
                    itemProps={itemProps}
                  />
                </div>
                <div style={moduleTheme.drawButtonZone}>
                  <RaisedButton
                    label={formatMessage({ id: 'draw.mode.button.label' })}
                    labelPosition="before"
                    fullWidth
                    primary={this.state.drawMode}
                    icon={<EditLocation />}
                    style={moduleTheme.drawButton}
                    onClick={this.toggleDrawMode}
                  />
                </div>
              </div>
            </SplitPane>
          </div>
        )}
      </Measure>
    )
  }
}

export default connect(
  GeoViewContainer.mapStateToProps,
  GeoViewContainer.mapDispatchToProps,
)(withModuleStyle(styles, true)(withI18n(messages, true)(GeoViewContainer)))
