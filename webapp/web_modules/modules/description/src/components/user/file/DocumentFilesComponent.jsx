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
import get from 'lodash/get'
import map from 'lodash/map'
import root from 'window-or-global'
import { CatalogShapes } from '@regardsoss/shape'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import File from 'material-ui/svg-icons/editor/insert-drive-file'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { storage } from '@regardsoss/units'
import DescriptionFileComponent from '../../../components/user/file/DescriptionFileComponent'
/**
 * Document files container: display document files
 * @author Raphaël Mechali
 */
export class DocumentFilesComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static resetLinkStyle = {
    textDecoration: 'none',
  }
  /**
   * Retrieve the first link available on the current entity
   */
  getFirstDownloadeableLink = () => {
    const { entity, accessToken, projectName } = this.props
    const downloadFile = get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}[0]`)
    return this.addOriginToURI(DamDomain.DataFileController.getFileURI(downloadFile, accessToken, projectName))
  }

  /**
   * Retrieve the first link available on the current entity
   */
  getAllDownloadeableFiles = () => {
    const { entity } = this.props
    return get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}`, [])
  }

  /**
   * Return the number of downloadeable files attached to the current entity
   */
  nbDownloadeableFiles = () => {
    const { entity } = this.props
    return get(entity, `content.files.${CommonDomain.DataTypesEnum.DOCUMENT}`, []).length
  }

  /**
   * Append to a download link a way to pass the security
   * add request origin for X-Frame-Options bypass.
   * WARN: bad security workaround
   */
  addOriginToURI = (downloadLink) => {
    const requestOrigin = `${root.location.protocol}//${root.location.host}`
    return `${downloadLink}&origin=${requestOrigin}`
  }

  /**
   * Transform a size
   */
  transformBytesIntoReadeableSize = (size) => {
    const parsed = new storage.StorageCapacity(size, storage.StorageUnits.BYTE)
    const scale = parsed.scaleAndConvert(storage.StorageUnitScale.bytesScale)

    return (<storage.FormattedStorageCapacity
      capacity={scale}
    />)
  }

  render() {
    const { accessToken, projectName } = this.props
    const { intl: { formatMessage } } = this.context
    if (this.nbDownloadeableFiles() > 1) {
      return (
        <List>
          <Subheader>{formatMessage({ id: 'module.description.file.subheader' })}</Subheader>
          {map(this.getAllDownloadeableFiles(), file => (
            <a
              download
              href={this.addOriginToURI(DamDomain.DataFileController.getFileURI(file, accessToken, projectName))}
              key={file.uri}
              style={DocumentFilesComponent.resetLinkStyle}
            >
              <ListItem
                primaryText={(
                  <div>
                    {`${file.filename}, `}
                    {this.transformBytesIntoReadeableSize(file.filesize)}
                  </div>)}
                leftIcon={<File />}
              />
            </a>
          ))}
        </List>
      )
    }
    return (
      <DescriptionFileComponent
        loading={false}
        descriptionFileURL={this.getFirstDownloadeableLink()}
        noContentMessage={formatMessage({ id: 'module.description.document.files.no.value.message' })}
        noContentTitle={formatMessage({ id: 'module.description.document.files.no.value.title' })}
      />)
  }
}
export default DocumentFilesComponent
