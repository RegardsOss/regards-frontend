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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
* Displays picture files
* @author Raphaël Mechali
*/
class ImageFileDisplayer extends React.Component {
  /** Supported MIME types */
  static SUPPORTED_MIME_TYPES = [
    MIME_TYPES.JPEG_MIME_TYPE,
    MIME_TYPES.GIF_MIME_TYPE,
    MIME_TYPES.PNG_MIME_TYPE,
    MIME_TYPES.TIF_MIME_TYPE,
  ]

  /**
   * Is supported content type for this component?
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isSupportedContentType(contentType) {
    const lowerContentType = contentType.toLowerCase()
    return ImageFileDisplayer.SUPPORTED_MIME_TYPES.some(mimeType => lowerContentType.includes(mimeType))
  }


  static propTypes = {
    source: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { source } = this.props
    const { intl: { formatMessage }, moduleTheme: { image } } = this.context
    // Do not display without source URL
    if (!source) {
      return null
    }


    return (
      <div style={image.containerStyles}>
        <img
          src={source}
          alt={formatMessage({ id: 'image.file.not.displayed' })}
          style={image.styles}
        />
      </div>
    )
  }
}
export default ImageFileDisplayer
