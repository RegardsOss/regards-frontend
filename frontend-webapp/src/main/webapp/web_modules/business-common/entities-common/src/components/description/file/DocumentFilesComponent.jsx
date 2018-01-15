/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
import map from 'lodash/map'
import root from 'window-or-global'
import { CatalogShapes } from '@regardsoss/shape'
import { CatalogDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import File from 'material-ui/svg-icons/editor/insert-drive-file'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { storage } from '@regardsoss/units'
import DescriptionFileComponent from '../../../components/description/file/DescriptionFileComponent'
/**
* Files container: display document files
*/
export class DocumentFilesComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
    accessToken: PropTypes.string,
    scope: PropTypes.string,
    isAuthenticated: PropTypes.bool,
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
    const { entity } = this.props
    if (this.nbDownloadeableFiles() === 0) {
      return null
    }
    const downloadLink = get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.DOCUMENT}[0].uri`)
    return this.addAuthToURI(downloadLink)
  }

  /**
   * Retrieve the first link available on the current entity
   */
  getAllDownloadeableFiles = () => {
    const { entity } = this.props
    return get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.DOCUMENT}`, [])
  }

  /**
   * Return the number of downloadeable files attached to the current entity
   */
  nbDownloadeableFiles = () => {
    const { entity } = this.props
    return get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.DOCUMENT}`, []).length
  }

  /**
   * Append to a download link a way to be authenticated
   */
  addAuthToURI = (downloadLink) => {
    const { isAuthenticated, scope, accessToken } = this.props
    // add request origin for X-Frame-Options bypass. WARN: bad security workaround
    const requestOrigin = `${root.location.protocol}//${root.location.host}`
    if (isAuthenticated) {
      return `${downloadLink}?origin=${requestOrigin}&token=${accessToken}`
    }
    return `${downloadLink}?origin=${requestOrigin}&scope=${scope}`
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
    const { intl: { formatMessage } } = this.context
    if (this.nbDownloadeableFiles() > 1) {
      return (
        <List>
          <Subheader>{formatMessage({ id: 'entities.common.file.subheader' })}</Subheader>
          {map(this.getAllDownloadeableFiles(), file => (
            <a
              download
              href={this.addAuthToURI(file.uri)}
              key={file.checksum}
              style={DocumentFilesComponent.resetLinkStyle}
            >
              <ListItem
                primaryText={(
                  <div>
                    {`${file.name}, `}
                    {this.transformBytesIntoReadeableSize(file.size)}
                  </div>)}
                leftIcon={<File />}
              />
            </a>
          ))}
        </List>
      )
    }
    return (<DescriptionFileComponent
      loading={false}
      descriptionFileURL={this.getFirstDownloadeableLink()}
      noContentMessage={formatMessage({ id: 'entities.common.document.files.no.value.message' })}
      noContentTitle={formatMessage({ id: 'entities.common.document.files.no.value.title' })}
    />)
  }
}
export default DocumentFilesComponent
