/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { withAuthInfo } from '@regardsoss/authentication-utils'
import { DamDomain } from '@regardsoss/domain'
import messages from '../i18n'
import styles from '../styles'
import ThumbnailFullSizePictureDialog from './ThumbnailFullSizePictureDialog'
/**
 * Component to render thumbnail attributes group
 * note: Thumbnail render expects to receive the first thumbnail value
 *
 * @author Sébastien Binda
 */
export class ThumbnailAttributeRender extends React.Component {
  static propTypes = {
    value: DataManagementShapes.DataFile,
    // thumbnail dimansions (defaults to table one when not provided)
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    projectName: PropTypes.string,
    accessToken: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    showFullSizeDialog: false,
  }

  /**
   * Callback: user clicked on cell, requesting full size picture dialog
   */
  onShowFullSizeDialog = () => {
    this.setState({ showFullSizeDialog: true })
  }

  /**
   * Callback: user closed full size picture dialog
   */
  onCloseFullSizeDialog = () => {
    this.setState({ showFullSizeDialog: false })
  }


  render() {
    const {
      value, dimensions,
      accessToken, projectName,
    } = this.props
    const { showFullSizeDialog } = this.state
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage }, moduleTheme: { defaultThumbnailDimensions, thumbnailPicture, noThumbnailIcon } } = this.context
    const thumbnailURI = value
      ? DamDomain.DataFileController.getFileURI(value, accessToken, projectName) : null
    return (
      <div
        style={dimensions || defaultThumbnailDimensions}
        title={thumbnailURI ? null : formatMessage({ id: 'attribute.thumbnail.alt' })}
      >
        {
          thumbnailURI ? (
            <img
              src={thumbnailURI}
              style={thumbnailPicture}
              alt={formatMessage({ id: 'attribute.thumbnail.alt' })}
              onClick={this.onShowFullSizeDialog}
            />) : (
              <NoDataIcon
                style={noThumbnailIcon}
              />)
        }
        <ThumbnailFullSizePictureDialog
          thumbnailURI={thumbnailURI}
          open={showFullSizeDialog}
          onClose={this.onCloseFullSizeDialog}
        />
      </div>
    )
  }
}

export default compose(withAuthInfo, withModuleStyle(styles, true), withI18n(messages, true))(ThumbnailAttributeRender)
