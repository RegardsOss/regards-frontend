/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import map from 'lodash/map'
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import get from 'lodash/get'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import togeojson from '@mapbox/togeojson'
import DragAndDrop from './DragAndDrop'
import { getExtension } from './FileHelpers'
import { UPLOADER_DISPLAY_MODES } from './UploaderDisplayModes'
import { uploadToponymActions } from './clients/UploadToponymClient'
import messages from './i18n'
import styles from './styles'

const SUPPORTED_FORMATS = {
  GEOJSON: 'geojson',
  JSON: 'json',
  ZIP: 'zip',
  KML: 'kml',
  KMZ: 'kmz',
}

/**
 * Toponym Uploader
 * @author Théo Lasserre
 */
class ToponymUploader extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
      uploadToponym: (toponym) => dispatch(uploadToponymActions.uploadToponym(toponym)),
    }
  }

  static propTypes = {
    onToponymUploaded: PropTypes.func.isRequired,
    displayMode: PropTypes.oneOf(values(UPLOADER_DISPLAY_MODES)).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // from dispatchToProps
    throwError: PropTypes.func.isRequired,
    uploadToponym: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  handleDrop = (files) => {
    const {
      throwError,
    } = this.props
    const { formatMessage } = this.context.intl
    if (files.length > 1) {
      return throwError(formatMessage({ id: 'toponym.uploader.drop.too-many-file' }))
    }
    const fileExtension = getExtension(files[0])
    switch (fileExtension) {
      case SUPPORTED_FORMATS.GEOJSON:
      case SUPPORTED_FORMATS.JSON:
        return this.processJSON(files[0])
      case SUPPORTED_FORMATS.ZIP:
        return this.processShapefile(files[0])
      case SUPPORTED_FORMATS.KML:
        return this.processKml(files[0])
      case SUPPORTED_FORMATS.KMZ:
        return this.processKmz(files[0])
      default:
        return throwError(formatMessage({ id: 'toponym.uploader.drop.unsupported-file' }))
    }
  }

  cleanGeometry = (featureCollection) => {
    // Ensure the geometry has no Z position on each point
    const coordinates = map(get(featureCollection.features[0], 'geometry.coordinates[0]', []), (coord) => [coord[0], coord[1]])
    return {
      ...featureCollection.features[0],
      geometry: {
        ...featureCollection.features[0].geometry,
        coordinates: [
          coordinates,
        ],
      },
    }
  }

  handleGeoJSON = (featureCollection) => {
    const { formatMessage } = this.context.intl
    const {
      onToponymUploaded, throwError, uploadToponym,
    } = this.props
    const geoJsonType = get(featureCollection, 'type', '')
    if (isEmpty(geoJsonType) || geoJsonType !== 'FeatureCollection') {
      return throwError(formatMessage({ id: 'toponym.uploader.geojson.wrong-type' }))
    }
    const features = get(featureCollection, 'features', [])
    if (features.length !== 1) {
      return throwError(formatMessage({ id: 'toponym.uploader.geojson.invalid-nb-features' }))
    }
    const projection = get(featureCollection, 'crs.properties.name', '')
    if (!isEmpty(projection) && !projection.includes('CRS84')) {
      return throwError(formatMessage({ id: 'toponym.uploader.geojson.invalid-projection' }))
    }
    const feature = this.cleanGeometry(featureCollection)
    return uploadToponym(feature).then((actionResult) => {
      if (!actionResult.error) {
        const businessId = get(actionResult, 'payload.content.businessId', '')
        onToponymUploaded(businessId)
      }
    })
  }

  handleKML = (kmlContentFile) => {
    const xmldom = (new DOMParser()).parseFromString(kmlContentFile, 'text/xml')
    const geojson = togeojson.kml(xmldom)
    return this.handleGeoJSON(geojson)
  }

  processJSON = (jsonFile) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const result = JSON.parse(e.target.result)
      this.handleGeoJSON(result)
    }
    reader.readAsText(jsonFile)
  }

  processKml = (kmlFile) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      this.handleKML(e.target.result)
    }
    reader.readAsText(kmlFile)
  }

  processKmz = (zipFile) => {
    const { formatMessage } = this.context.intl
    const {
      throwError,
    } = this.props
    require.ensure([], (require) => {
      const JSZip = require('jszip')
      JSZip.loadAsync(zipFile).then((zip) => {
        const zipFiles = zip.file(/.+/)
        let kmlFile
        let nbFile = 0
        // New with JSZip 3 - read all files concurrently
        const readers = []

        zipFiles.forEach((a) => {
          const extension = getExtension(a)
          if (extension === 'kml') {
            const reader = a.async('string').then((content) => {
              kmlFile = content
            })
            readers.push(reader)
            nbFile += 1
          }
        })

        Promise.all(readers).then(() => {
          if (nbFile > 1) {
            return throwError(formatMessage({ id: 'toponym.uploader.kmz.too-many-files' }))
          }
          if (nbFile === 0) {
            return throwError(formatMessage({ id: 'toponym.uploader.kmz.missing-files' }))
          }

          return this.handleKML(kmlFile)
        })
      }).catch((reason) => throwError(formatMessage({ id: 'toponym.uploader.zip.parse.error' }, { reason })))
    })
  }

  processShapefile = (zipFile) => {
    const { formatMessage } = this.context.intl
    const {
      throwError,
    } = this.props
    require.ensure([], (require) => {
      const shp = require('shpjs')
      const JSZip = require('jszip')
      JSZip.loadAsync(zipFile).then((zip) => {
        const zipFiles = zip.file(/.+/)
        let shpFile
        let prjStr
        let nbShpFile = 0
        let nbPrjFile = 0
        // New with JSZip 3 - read all files concurrently
        const readers = []

        zipFiles.forEach((a) => {
          const extension = getExtension(a)
          if (extension === 'shp') {
            const reader = a.async('nodebuffer').then((content) => {
              shpFile = content
            })
            readers.push(reader)
            nbShpFile += 1
          } else if (extension === 'prj') {
            const reader = a.async('string').then((content) => {
              prjStr = content
            })
            readers.push(reader)
            nbPrjFile += 1
          }
        })

        Promise.all(readers).then(() => {
          if (nbShpFile > 1 || nbPrjFile > 1) {
            return throwError(formatMessage({ id: 'toponym.uploader.zip.too-many-files' }))
          }
          if (nbShpFile === 0 || nbPrjFile === 0) {
            return throwError(formatMessage({ id: 'toponym.uploader.zip.missing-files' }))
          }

          const features = shp.parseShp(shpFile, prjStr)

          const featureCollection = {
            type: 'FeatureCollection',
            features: map(features, (feature) => ({
              type: 'Feature',
              geometry: feature,
            })),
          }

          return this.handleGeoJSON(featureCollection)
        })
      }).catch((reason) => throwError(formatMessage({ id: 'toponym.uploader.zip.parse.error' }, { reason })))
    })
  }

  render() {
    const {
      displayMode, children,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { dragAndDropMapStyle, dragAndDropCriterionStyle } } = this.context
    const title = formatMessage({ id: 'dragndrop.title' })
    const subtitle = formatMessage({ id: 'dragndrop.subtitle.toponym' })
    return (
      <DragAndDrop
        handleDrop={this.handleDrop}
        resourceDependencies={uploadToponymActions.getDependency(RequestVerbEnum.POST)}
        onHideDisplayComponent={children}
        title={title}
        subtitle={subtitle}
        style={displayMode === UPLOADER_DISPLAY_MODES.LARGE ? dragAndDropMapStyle : dragAndDropCriterionStyle}
      >
        {children}
      </DragAndDrop>
    )
  }
}

export default compose(connect(
  null,
  ToponymUploader.mapDispatchToProps), withModuleStyle(styles, true), withI18n(messages, true))(ToponymUploader)
