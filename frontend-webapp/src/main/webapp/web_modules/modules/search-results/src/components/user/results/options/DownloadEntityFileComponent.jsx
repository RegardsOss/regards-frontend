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
import { CatalogDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'


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
    isAuthenticated: PropTypes.bool,
    scope: PropTypes.string,
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

  /**
   * FIXME This label is bullshit and should be computed in the parent scope, not in the component itself
   */
  static getLabel = () => { }


  /**
   * Retrieve the first link available on the current entity
   */
  getFirstDownloadeableLink = () => {
    const { entity } = this.props
    return get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA}[0].uri`) ||
      get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.DOCUMENT}[0].uri`)
  }

  /**
   * Retrieve the first link available on the current entity
   */
  getAllDownloadeableFiles = () => {
    const { entity } = this.props
    return concat(
      get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA}`, []),
      get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.DOCUMENT}`, []),
    )
  }

  getURIAuth = (uri) => {
    const { scope, accessToken, isAuthenticated } = this.props
    let result
    if (uri.includes('?')) {
      result = `${uri}&`
    } else {
      result = `${uri}?`
    }
    if (isAuthenticated) {
      return `${result}token=${accessToken}`
    }
    return `${result}scope=${scope}`
  }

  /**
   * Return the number of downloadeable files attached to the current entity
   */
  nbDownloadeableFiles = () => {
    const { entity } = this.props
    return get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA}`, []).length +
      get(entity, `content.files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.DOCUMENT}`, []).length
  }

  render() {
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage } } = this.context
    const { style } = this.props
    const nbDownloadeableFiles = this.nbDownloadeableFiles()
    if (nbDownloadeableFiles === 0) {
      return null
    } else if (nbDownloadeableFiles === 1) {
      const fileURI = this.getFirstDownloadeableLink()
      return (
        <a
          download
          href={this.getURIAuth(fileURI)}
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
              href={this.getURIAuth(file.uri)}
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