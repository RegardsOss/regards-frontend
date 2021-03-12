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

//  import shp from 'shpjs'
//  import JSZip from 'jszip'
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import get from 'lodash/get'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { DragAndDrop, UPLOADER_DISPLAY_MODES } from '@regardsoss/components'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { getExtension } from './FileHelpers'
import { uploadToponymActions } from './clients/UploadToponymClient'
import messages from './i18n'
import styles from './styles'

const SUPPORTED_FORMATS = {
  GEOJSON: 'geojson',
  JSON: 'json',
  ZIP: 'zip',
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

// Requirements : Conditionnellement afficher le composant d'upload si l'utilisateur a accès au endpoint d'upload.
// Mettre en place le endpoint pour sauver le shapefile.
// Sauvegarder dans le contexte le businessId du toponyme retouné par le back.
// Uploader un geojson natif.
// Validation : Controler les cas non nominaux & En cas de problème : informer l'utilisateur.
// -> Cas 1 X : Gérér un fichier qui n'est pas un zip ou un geojson ou json.
// -> Cas 2 X : Vérifier que chaque fichier de format attendu est présent dans l'archive.
// -> Afficher un message d'erreur (toast, comme endpoint inaccessible).
// -> Cas 4 X : Refuser un fichier geojson qui n'est explicitement pas dans la projection WGS84. (quel attribut définit la projection ? trouver des exemples)
// -> Cas 5 X : L'utilisateur doit glisser déposer un seul fichier. Message : Vous avez glisser deposer plus d'un fichier, on attend un zip composé d'un shp, d'un prj et d'un dbf (à retravailler). Format supporté : zip (contenant shp, prj...) ou geojson.
// -> Cas 6 X : Le geojson doit etre une FeatureCollection.
// -> Cas 7 X : Si il y a plusieurs features afficher un message d'erreur.
// Gérer la projection
// -> Comprendre la liste de projection que la librairie supporte.
// -> Faire un dictionnaire entre la projection au format prj et l'identifiant d'une projection.

// Apporter ces fonctionnalités sur le toponym criterion.
// Sur le criterion ajouter le message : ... ou glisser déposer un shapefile ou geojson.
// Créer un composant DragToponym (handleDrop présent dans le composant).

// Valider que le endpoint back correspond à l'implémentation.

// Faire IHM DRAG comme TerriaJS

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
        return this.processZip(files[0])
      default:
        return throwError(formatMessage({ id: 'toponym.uploader.drop.unsupported-file' }))
    }
  }

  handleGeoJSON = (geojson) => {
    const { formatMessage } = this.context.intl
    const {
      onToponymUploaded, throwError, uploadToponym,
    } = this.props
    const geoJsonType = get(geojson, 'type', '')
    if (isEmpty(geoJsonType) || geoJsonType !== 'FeatureCollection') {
      return throwError(formatMessage({ id: 'toponym.uploader.geojson.wrong-type' }))
    }
    const features = get(geojson, 'features', [])
    if (features.length !== 1) {
      return throwError(formatMessage({ id: 'toponym.uploader.geojson.invalid-nb-features' }))
    }
    const projection = get(geojson, 'crs.properties.name', '')
    if (!isEmpty(projection) && !projection.includes('CRS84')) {
      return throwError(formatMessage({ id: 'toponym.uploader.geojson.invalid-projection' }))
    }
    return uploadToponym(geojson).then((actionResult) => {
      if (!actionResult.error) {
        onToponymUploaded(actionResult.payload)
      }
    })
  }

  processJSON = (jsonFile) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const result = JSON.parse(e.target.result)
      this.handleGeoJSON(result)
    }
    reader.readAsText(jsonFile)
  }

  processZip = (zipFile) => {
    const { formatMessage } = this.context.intl
    const {
      throwError,
    } = this.props
    require.ensure([], (require) => {
      const shp = require('shpjs')
      const JSZip = require('jszip')

      zipFile.arrayBuffer().then((buffer) => {
        const zip = new JSZip(buffer)
        const zipFiles = zip.file(/.+/)
        let shpFile
        let prjStr
        let nbShpFile = 0
        let nbPrjFile = 0
        zipFiles.forEach((a) => {
          const extension = getExtension(a)
          if (extension === 'shp') {
            shpFile = a.asNodeBuffer()
            nbShpFile += 1
          } else if (extension === 'prj') {
            prjStr = a.asText()
            nbPrjFile += 1
          }
        })

        if (nbShpFile > 1 || nbPrjFile > 1) {
          return throwError(formatMessage({ id: 'toponym.uploader.zip.too-many-files' }))
        }
        if (nbShpFile === 0 || nbPrjFile === 0) {
          return throwError(formatMessage({ id: 'toponym.uploader.zip.missing-files' }))
        }

        const features = shp.parseShp(shpFile, prjStr)

        const featureCollection = {
          type: 'FeatureCollection',
          features,
        }

        return this.handleGeoJSON(featureCollection)
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
