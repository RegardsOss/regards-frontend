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
import get from 'lodash/get'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import DownloadIcon from 'mdi-material-ui/Download'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { DropDownButton } from '@regardsoss/components'

/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = props => (
  <IconButton
    {...props}
  >
    <DownloadIcon />
  </IconButton>)

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

  /** File types available through download option */
  static DOWNLOADABLE_FILES_TYPES = [
    CommonDomain.DATA_TYPES_ENUM.RAWDATA,
    CommonDomain.DATA_TYPES_ENUM.DOCUMENT,
  ]

  /** @return {[*]} download files for entity, in current state and with current user rights */
  getAllDownloadeableFiles = () => {
    const { entity: { content: { files } } } = this.props
    // retrieve each downloadable file, ie for each downloadable file type, find online files (documents and
    // external files are always online)
    return DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, fileType) => [...acc, ...get(files, fileType, []).filter(f => f.online || f.reference)], [])
  }

  /**
   * Called when no download is available. Computes and returns no download reason
   * @return {string} no download reason tooltip
   */
  getNoDownloadTooltip = () => {
    const { entity: { content: { files } } } = this.props
    const { intl: { formatMessage } } = this.context
    // compute total filesa count
    const filesCount = DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((count, fileType) => count + get(files, `${fileType}.length`, 0), 0)

    return formatMessage({
      id: !filesCount
        ? 'no.download.tooltip' // no file found: there is none user has not enough rights
        : 'download.no.online.file.tooltip',
    }) // there are file that cannot be downloaded: offline files
  }

  /** @return {boolean} true if current entity is a dataset */
  isDataset = () => get(this.props.entity, 'content.entityType') === DamDomain.ENTITY_TYPES_ENUM.DATASET

  render() {
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage } } = this.context
    const {
      style, accessToken, projectName,
    } = this.props
    const downloadableFiles = this.getAllDownloadeableFiles()
    if (this.isDataset()) {
      return null
    }
    switch (downloadableFiles.length) {
      case 0:
        // show disabled download button
        return (
          <IconButton
            title={this.getNoDownloadTooltip()}
            style={style}
            disabled
          >
            <DownloadIcon />
          </IconButton>
        )
      case 1:
        // show direct file link
        return (
          <a
            href={DamDomain.DataFileController.getFileURI(downloadableFiles[0], accessToken, projectName)}
            style={style}
            title={formatMessage({ id: 'download.tooltip' })}
            target="_blank"
            download
          >
            <DownloadIcon />
          </a>
        )
      default:
        // show drop down menu to download files links
        return (
          <DropDownButton
            ButtonConstructor={IconButtonConstructorWrapper}
            style={style}
            title={formatMessage({ id: 'download.tooltip' })}
          >
            { /* Map all files  */
              downloadableFiles.map((file, key) => (
                <a
                  key={file.uri}
                  href={DamDomain.DataFileController.getFileURI(file, accessToken, projectName)}
                  style={DownloadEntityFileComponent.resetLinkStyle}
                  target="_blank"
                  download
                >
                  <MenuItem
                    primaryText={file.filename}
                  />
                </a>
              ))
            }
          </DropDownButton>
        )
    }
  }
}
export default DownloadEntityFileComponent
