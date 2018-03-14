/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
import get from 'lodash/get'
import concat from 'lodash/concat'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import { URLAuthInjector } from '@regardsoss/domain/common'


/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = props => (
  <IconButton
    {...props}
  >
    <DownloadIcon />
  </IconButton >)

/**
 * Option to show description in results table
 * @author Léo Mieulet
 */
class DownloadEntityFileComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // Current user session info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static defaultProps = {
    style: {
      padding: '15px 12px 12px',
    },
  }

  static resetLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  }

  static getLabel = () => { }


  /**
   * Retrieve the first link available in the current entity
   */
  getFirstDownloadeableLink = () => {
    const { entity } = this.props
    const firstDocument = get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}[0].uri`)
    if (this.areRawDataDownloadable()) {
      return firstDocument || get(entity, `content.files.${CommonDomain.DataTypesEnum.RAWDATA}[0].uri`)
    }
    return firstDocument
  }

  /**
   * Retrieve the list of object attached files
   */
  getAllDownloadeableFiles = () => {
    const { entity } = this.props
    const documentFiles = get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}`, [])
    if (this.areRawDataDownloadable()) {
      return concat(
        get(entity, `content.files.${CommonDomain.DataTypesEnum.RAWDATA}`, []),
        documentFiles,
      )
    }
    return documentFiles
  }

  /**
   * The entity store a boolean to tell us if RAW_DATA are downloadeable
   */
  areRawDataDownloadable = () => {
    const { entity } = this.props
    return entity.content.downloadable
  }

  /**
   * Return the number of downloadeable files attached to the current entity
   */
  nbDownloadeableFiles = () => {
    const { entity } = this.props
    const nbDocumentFiles = get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}`, []).length
    if (this.areRawDataDownloadable()) {
      return nbDocumentFiles + get(entity, `content.files.${CommonDomain.DataTypesEnum.RAWDATA}`, []).length
    }
    return nbDocumentFiles
  }

  isDataset = () => {
    const { entity } = this.props
    return entity.content.entityType === DamDomain.ENTITY_TYPES_ENUM.DATASET
  }

  render() {
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage } } = this.context
    const {
      style, accessToken, projectName,
    } = this.props
    const nbDownloadeableFiles = this.nbDownloadeableFiles()
    if (this.isDataset()) {
      return null
    } else if (nbDownloadeableFiles === 0) {
      return (
        <IconButton
          title={formatMessage({ id: 'download.tooltip' })}
          style={style}
          disabled
        >
          <DownloadIcon />
        </IconButton>
      )
    } else if (nbDownloadeableFiles === 1) {
      const fileURI = this.getFirstDownloadeableLink()
      return (
        <a
          download
          href={URLAuthInjector(fileURI, accessToken, projectName)}
          style={style}
          title={formatMessage({ id: 'download.tooltip' })}
        >
          <DownloadIcon />
        </a>
      )
    }
    return (
      <DropDownButton
        ButtonConstructor={IconButtonConstructorWrapper}
        getLabel={(DownloadEntityFileComponent.getLabel)}
        style={style}
        title={formatMessage({ id: 'download.tooltip' })}
      >
        { /* Map all files  */
          this.getAllDownloadeableFiles().map((file, key) => (
            <a
              download
              key={file.checksum}
              href={URLAuthInjector(file.uri, accessToken, projectName)}
              style={DownloadEntityFileComponent.resetLinkStyle}
            >
              <MenuItem
                primaryText={file.name}
              />
            </a>
          ))
        }
      </DropDownButton>
    )
  }
}
export default DownloadEntityFileComponent
