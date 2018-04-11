/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
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
   * @return {[*]} download files for entity, in current state and with current user rights
   */
  getAllDownloadeableFiles = () => {
    const { entity } = this.props
    return [
      // raw files when user can access download endpoint and file is online
      ...this.isAllowingDownload() ? get(entity, `content.files.${CommonDomain.DataTypesEnum.RAWDATA}`, []).filter(f => f.online) : [],
      // documents (always allowed)
      ...get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}`, []),
    ]
  }

  /** @return {string} no download reason tooltip */
  getNoDownloadTooltip = () => {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    const dataFilesCount = get(entity, `content.files.${CommonDomain.DataTypesEnum.RAWDATA}.length`, 0)
    const documentFilesCount = get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}.length`, 0)
    let reasonMessageId
    if (dataFilesCount + documentFilesCount === 0) { // 1 - the is no file for that object
      reasonMessageId = 'no.download.tooltip'
    } else if (!entity.content.downloadable) { // 2 - user has not rights to download files
      reasonMessageId = 'download.unsufficient.user.rights.tooltip'
    } else { // 3 - there are files and user has rights: those files are not online
      reasonMessageId = 'download.no.online.file.tooltip'
    }

    return formatMessage({ id: reasonMessageId })
  }

  isDataset = () => {
    const { entity } = this.props
    return entity.content.entityType === DamDomain.ENTITY_TYPES_ENUM.DATASET
  }

  /**
   * The entity store a boolean to tell us if RAW_DATA are downloadeable
   */
  isAllowingDownload = () => {
    const { entity } = this.props
    return entity.content.downloadable
  }


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
            download
            href={URLAuthInjector(downloadableFiles[0].uri, accessToken, projectName)}
            style={style}
            title={formatMessage({ id: 'download.tooltip' })}
          >
            <DownloadIcon />
          </a>
        )
      default:
        // show drop down menu to download files links
        return (
          <DropDownButton
            ButtonConstructor={IconButtonConstructorWrapper}
            getLabel={(DownloadEntityFileComponent.getLabel)}
            style={style}
            title={formatMessage({ id: 'download.tooltip' })}
          >
            { /* Map all files  */
              downloadableFiles.map((file, key) => (
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
}
export default DownloadEntityFileComponent
