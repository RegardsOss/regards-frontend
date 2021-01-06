/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/

// Load mizar in dev mode
// Each line adds the specifed file to the public folder /mizar/
// e.g. /mizar/external/fits.js
import 'mizar/external/fits'
import 'mizar/external/wcs'
import 'mizar/external/gzip.min'
import 'mizar/external/samp'

import 'path/path'
import 'underscore/underscore-min'
import 'jquery/dist/jquery.min'
import 'jquery-ui-dist/jquery-ui.min'
import 'string/dist/string'
import 'file-saver/FileSaver.min'
import 'jszip/dist/jszip.min'
import 'xmltojson/lib/xmlToJSON.min'
import 'requirejs/require'
import 'wms-capabilities/dist/wms-capabilities'
import 'moment/min/moment-with-locales.min'

import 'mizar/src/Registry/WMSServer'
import 'mizar/src/Registry/WMTSServer'
import 'mizar/src/Registry/WCSServer'
import 'mizar/src/Registry/WMTSMetadata'
import 'mizar/src/Registry/WMTSServerRegistryHandler'
import 'mizar/src/Registry/WMSServerRegistryHandler'
import 'mizar/src/Registry/WCSServerRegistryHandler'
import 'mizar/src/Registry/AbstractRegistryHandler'
import 'mizar/src/Registry/PendingLayersRegistryHandler'
import 'mizar/src/Registry/LayerRegistryHandler'

import 'mizar/src/Error/NetworkError'

import 'mizar/src/Time/Time'
import 'mizar/src/Time/TimeTravelParams'
import 'mizar/src/Time/TimeEnumerated'
import 'mizar/src/Time/TimeSample'

import 'mizar/src/Layer/AbstractLayer'
import 'mizar/src/Layer/AbstractRasterLayer'
import 'mizar/src/Layer/WCSElevationLayer'
import 'mizar/src/Layer/InterfaceLayer'
import 'mizar/src/Layer/TileWireframeLayer'
import 'mizar/src/Layer/AtmosphereLayer'
import 'mizar/src/Layer/VectorLayer'
import 'mizar/src/Layer/WMSLayer'
import 'mizar/src/Layer/InterfaceVectorLayer'
import 'mizar/src/Layer/WMSElevationLayer'
import 'mizar/src/Layer/HipsMetadata'
import 'mizar/src/Layer/AbstractHipsLayer'
import 'mizar/src/Layer/HipsGraphicLayer'
import 'mizar/src/Layer/LayerFactory'
import 'mizar/src/Layer/FitsLoader'
import 'mizar/src/Layer/BingLayer'
import 'mizar/src/Layer/JsCSV/csv'
import 'mizar/src/Layer/HipsCatLayer'
import 'mizar/src/Layer/GeoJsonLayer'
import 'mizar/src/Layer/FitsRequest'
import 'mizar/src/Layer/HipsFitsLayer'
import 'mizar/src/Layer/CoordinateGridLayer'
import 'mizar/src/Layer/InterfaceRasterLayer'
import 'mizar/src/Layer/OpenSearch/OpenSearchCache'
import 'mizar/src/Layer/OpenSearch/OpenSearchForm'
import 'mizar/src/Layer/OpenSearch/OpenSearchResult'
import 'mizar/src/Layer/OpenSearch/OpenSearchRequestPool'
import 'mizar/src/Layer/OpenSearch/OpenSearchParam'
import 'mizar/src/Layer/OpenSearch/OpenSearchUtils'
import 'mizar/src/Layer/GroundOverlayLayer'
import 'mizar/src/Layer/OSMLayer'
import 'mizar/src/Layer/MocLayer'
import 'mizar/src/Layer/WMTSLayer'
import 'mizar/src/Layer/OpenSearchLayer'
import 'mizar/src/Layer/AbstractVectorLayer'
import 'mizar/src/Layer/JsVotable/votable'
import 'mizar/src/Layer/JsVotable/abstractNode'
import 'mizar/src/Layer/JsVotable/utils'
import 'mizar/src/Layer/JsVotable/JsVotable'
import 'mizar/src/Layer/JsVotable/min'
import 'mizar/src/Layer/JsVotable/coosys'
import 'mizar/src/Layer/JsVotable/max'
import 'mizar/src/Layer/JsVotable/tabledata'
import 'mizar/src/Layer/JsVotable/values'
import 'mizar/src/Layer/JsVotable/table'
import 'mizar/src/Layer/JsVotable/link'
import 'mizar/src/Layer/JsVotable/fits'
import 'mizar/src/Layer/JsVotable/resource'
import 'mizar/src/Layer/JsVotable/field'
import 'mizar/src/Layer/JsVotable/description'
import 'mizar/src/Layer/JsVotable/cache'
import 'mizar/src/Layer/JsVotable/abstractData'
import 'mizar/src/Layer/JsVotable/fieldref'
import 'mizar/src/Layer/JsVotable/td'
import 'mizar/src/Layer/JsVotable/definitions'
import 'mizar/src/Layer/JsVotable/binary2'
import 'mizar/src/Layer/JsVotable/param'
import 'mizar/src/Layer/JsVotable/stream'
import 'mizar/src/Layer/JsVotable/option'
import 'mizar/src/Layer/JsVotable/group'
import 'mizar/src/Layer/JsVotable/binary'
import 'mizar/src/Layer/JsVotable/converter/base64'
import 'mizar/src/Layer/JsVotable/converter/geojson'
import 'mizar/src/Layer/JsVotable/data'
import 'mizar/src/Layer/JsVotable/info'
import 'mizar/src/Layer/JsVotable/tr'
import 'mizar/src/Layer/JsVotable/paramref'
import 'mizar/src/Renderer/PolygonRenderer'
import 'mizar/src/Renderer/ConvexPolygonRenderer'
import 'mizar/src/Renderer/DynamicImage'
import 'mizar/src/Renderer/pnltri.min'
import 'mizar/src/Renderer/GroundOverlayRenderer'
import 'mizar/src/Renderer/StencilPolygonRenderer'
import 'mizar/src/Renderer/RenderContext'
import 'mizar/src/Renderer/GeoBound'
import 'mizar/src/Renderer/glMatrix'
import 'mizar/src/Renderer/Ray'
import 'mizar/src/Renderer/PolygonRenderable'
import 'mizar/src/Renderer/RendererTileData'
import 'mizar/src/Renderer/ColorMap'
import 'mizar/src/Renderer/pnltri'
import 'mizar/src/Renderer/LineStringRenderable'
import 'mizar/src/Renderer/LineRenderer'
import 'mizar/src/Renderer/RasterOverlayRenderer'
import 'mizar/src/Renderer/PointSpriteRenderer'
import 'mizar/src/Renderer/Frustum'
import 'mizar/src/Renderer/FeatureOverlayManager'
import 'mizar/src/Renderer/PlanetPolygonRenderable'
import 'mizar/src/Renderer/PointRenderer'
import 'mizar/src/Renderer/BoundingBox'
import 'mizar/src/Renderer/PolygonCutter'
import 'mizar/src/Renderer/Program'
import 'mizar/src/Renderer/BatchRenderable'
import 'mizar/src/Renderer/VectorRenderer'
import 'mizar/src/Renderer/FeatureStyle'
import 'mizar/src/Parser/ParserFactory'
import 'mizar/src/Parser/JsonProcessor'
import 'mizar/src/Parser/KMLParser'
import 'mizar/src/Mizar'
import 'mizar/src/NameResolver/DictionaryNameResolver'
import 'mizar/src/NameResolver/InterfaceNameResolver'
import 'mizar/src/NameResolver/DefaultNameResolver'
import 'mizar/src/NameResolver/AbstractNameResolver'
import 'mizar/src/NameResolver/NameResolver'
import 'mizar/src/NameResolver/CDSNameResolver'
import 'mizar/src/NameResolver/IMCCENameResolver'
import 'mizar/src/Globe/InterfaceGlobe'
import 'mizar/src/Globe/AbstractGlobe'
import 'mizar/src/Globe/Sky'
import 'mizar/src/Globe/Planet'
import 'mizar/src/Globe/GlobeFactory'
import 'mizar/src/Tiling/MercatorTiling'
import 'mizar/src/Tiling/TiledVectorRenderer'
import 'mizar/src/Tiling/HEALPixTiling'
import 'mizar/src/Tiling/TiledVectorRenderable'
import 'mizar/src/Tiling/Tile'
import 'mizar/src/Tiling/TileRequest'
import 'mizar/src/Tiling/HEALPixTables'
import 'mizar/src/Tiling/GeoTiling'
import 'mizar/src/Tiling/TileIndexBuffer'
import 'mizar/src/Tiling/HEALPixBase'
import 'mizar/src/Tiling/TilePool'
import 'mizar/src/Tiling/Mesh'
import 'mizar/src/Tiling/TileManager'
import 'mizar/src/Tiling/Triangulator'
import 'mizar/src/Navigation/AbstractNavigation'
import 'mizar/src/Navigation/PlanetNavigation'
import 'mizar/src/Navigation/AstroNavigation'
import 'mizar/src/Navigation/MouseNavigationHandler'
import 'mizar/src/Navigation/NavigationFactory'
import 'mizar/src/Navigation/TouchNavigationHandler'
import 'mizar/src/Navigation/NavigationHandlerFactory'
import 'mizar/src/Navigation/GoogleMouseNavigationHandler'
import 'mizar/src/Navigation/GroundNavigation'
import 'mizar/src/Navigation/KeyboardNavigationHandler'
import 'mizar/src/Navigation/InterfaceNavigation'
import 'mizar/src/Navigation/FlatNavigation'
import 'mizar/src/Utils/UtilsIntersection'
import 'mizar/src/Utils/Stats'
import 'mizar/src/Utils/Cache'
import 'mizar/src/Utils/Long'
import 'mizar/src/Utils/Utils'
import 'mizar/src/Utils/CircleFinder'
import 'mizar/src/Utils/Event'
import 'mizar/src/Utils/UtilityFactory'
import 'mizar/src/Utils/AttributionHandler'
import 'mizar/src/Utils/ImageRequest'
import 'mizar/src/Utils/Tuning'
import 'mizar/src/Utils/UtilsFits'
import 'mizar/src/Utils/Numeric'
import 'mizar/src/Utils/Constants'
import 'mizar/src/Gui/TimeTravel'
import 'mizar/src/Gui/dialog/ErrorDialog'
import 'mizar/src/Gui/dialog/AboutDialog'
import 'mizar/src/Gui/dialog/CrsDialog'
import 'mizar/src/Gui/Compass'
import 'mizar/src/Gui/Tracker/AbstractTracker'
import 'mizar/src/Gui/Tracker/PositionTracker'
import 'mizar/src/Gui/Tracker/InterfaceTracker'
import 'mizar/src/Gui/Tracker/ElevationTracker'
import 'mizar/src/Animation/AnimationFactory'
import 'mizar/src/Animation/InterfaceAnimation'
import 'mizar/src/Animation/InertiaAnimation'
import 'mizar/src/Animation/InterpolatedAnimation'
import 'mizar/src/Animation/PathAnimation'
import 'mizar/src/Animation/SegmentedAnimation'
import 'mizar/src/Animation/AbstractAnimation'
import 'mizar/src/Provider/ProviderFactory'
import 'mizar/src/Provider/StarProvider'
import 'mizar/src/Provider/CraterProvider'
import 'mizar/src/Provider/ConstellationProvider'
import 'mizar/src/Provider/AbstractProvider'
import 'mizar/src/Provider/PlanetProvider'
import 'mizar/src/Provider/InterfaceProvider'
import 'mizar/src/Provider/TrajectoryProvider'
import 'mizar/src/Services/ServiceFactory'
import 'mizar/src/Services/TimeTravelCore'
import 'mizar/src/Services/CompassCore'
import 'mizar/src/Services/PickingManagerCore'
import 'mizar/src/Services/Triangle'
import 'mizar/src/Services/MeasureToolPlanetCore'
import 'mizar/src/Services/SelectionToolCore'
import 'mizar/src/Services/SampCore'
import 'mizar/src/Services/MocBase'
import 'mizar/src/Services/FitsVisu'
import 'mizar/src/Services/FitsHips'
import 'mizar/src/Services/ImageProcessingCore'
import 'mizar/src/Services/HistogramCore'
import 'mizar/src/Services/ExportToolCore'
import 'mizar/src/Services/MeasureToolSkyCore'
import 'mizar/src/Services/MollweideViewerCore'
import 'mizar/src/Projection/InterfaceProjection'
import 'mizar/src/Projection/AitoffProjection'
import 'mizar/src/Projection/MercatorProjection'
import 'mizar/src/Projection/MollweideProjection'
import 'mizar/src/Projection/AugustProjection'
import 'mizar/src/Projection/ProjectionFactory'
import 'mizar/src/Projection/AzimuthProjection'
import 'mizar/src/Projection/AbstractProjection'
import 'mizar/src/Projection/PlateProjection'
import 'mizar/src/ReverseNameResolver/AbstractReverseNameResolver'
import 'mizar/src/ReverseNameResolver/InterfaceReverseNameResolver'
import 'mizar/src/ReverseNameResolver/CDSReverseNameResolver'
import 'mizar/src/ReverseNameResolver/DefaultReverseNameResolver'
import 'mizar/src/ReverseNameResolver/ReverseNameResolver'
import 'mizar/src/Crs/EquatorialCrs'
import 'mizar/src/Crs/Mars2000Crs'
import 'mizar/src/Crs/HorizontalLocalCrs'
import 'mizar/src/Crs/WGS84Crs'
import 'mizar/src/Crs/CoordinateSystemFactory'
import 'mizar/src/Crs/SunCrs'
import 'mizar/src/Crs/AbstractCrs'
import 'mizar/src/Crs/InterfaceCrs'
import 'mizar/src/Crs/Geoide'
import 'mizar/src/Crs/Moon2000Crs'
import 'mizar/src/Crs/AstroCoordTransform'
import 'mizar/src/Crs/GalacticCrs'
import 'mizar/src/Crs/ProjectedCrs'
import 'mizar/src/Context/ContextFactory'
import 'mizar/src/Context/SkyContext'
import 'mizar/src/Context/AbstractContext'
import 'mizar/src/Context/PlanetContext'
import 'mizar/src/Context/GroundContext'
import 'mizar/src/Context/InterfaceContext'
import 'mizar/src/SceneGraph/SceneGraph'
import 'mizar/src/SceneGraph/Navigation'
import 'mizar/src/SceneGraph/ColladaParser'
import 'mizar/src/SceneGraph/Ray'
import 'mizar/src/SceneGraph/Renderer'
import 'mizar/src/SceneGraph/LODTreeRenderer'
import 'mizar/src/SceneGraph/LODTreeLoader'
import 'mizar/src/SceneGraph/LODNode'
import 'mizar/src/Utils/Proxy'
import 'mizar/src/Renderer/RendererManager'
import 'mizar/src/Renderer/PolyLineRenderer'
import 'mizar/src/Registry/OpenSearchRegistryHandler'
import 'mizar/src/Registry/OpenSearchServer'

import 'mizar/shaders/GroundFrag.glsl'
import 'mizar/shaders/GroundFromAtmosphereVert.glsl'
import 'mizar/shaders/GroundFromSpaceVert.glsl'
import 'mizar/shaders/SkyFrag.glsl'
import 'mizar/shaders/SkyFromAtmosphereVert.glsl'
import 'mizar/shaders/SkyFromSpaceVert.glsl'
