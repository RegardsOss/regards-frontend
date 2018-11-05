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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
* Displays picture files
* @author Raphaël Mechali
*/
class ImageFileDisplayer extends React.Component {
  /**
   * Maps MIME type to editor mode
   */
  static MIMETypes = [
    MIME_TYPES.JPEG_MIME_TYPE,
    MIME_TYPES.GIF_MIME_TYPE,
    MIME_TYPES.PNG_MIME_TYPE,
    MIME_TYPES.TIF_MIME_TYPE,
  ]

  static getSupportedMIMETypes() {
    return ImageFileDisplayer.MIMETypes
  }

  static isSupportedType(mimeType) {
    return ImageFileDisplayer.MIMETypes.includes(mimeType)
  }

  static propTypes = {
    imageURL: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { imageURL } = this.props
    const { intl: { formatMessage }, moduleTheme: { image } } = this.context
    return (
      <div style={image.containerStyles}>
        <img
          src={imageURL}
          alt={formatMessage({ id: 'image.file.not.displayed' })}
          style={image.styles}
        />
      </div>
    )
  }
}
export default ImageFileDisplayer
