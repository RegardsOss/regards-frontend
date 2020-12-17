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
import { withModuleStyle } from '@regardsoss/theme'
import styles from './styles'
import { URLCommonPicture } from './URLCommonPicture' // import disconnected (connected to theme by this component)
import { URLSVGPicture } from './URLSVGPicture'// import disconnected (connected to theme by this component)
import { BrokenPicturePlaceholder } from './BrokenPicturePlaceholder'// import disconnected (connected to theme by this component)

/**
 * Dispays a picture based on its MIME type and URL
 * @author Raphaël Mechali
 */
export class URLPicture extends React.Component {
  /**
   * Possible pictures render
   */
  static PICTURES_RENDER = [
    URLCommonPicture,
    URLSVGPicture,
  ]

  /**
   * @param {class} PictureRender picture render to test (all render defined static property SUPPORTED_MIME_TYPES)
   * @param {string} mimeType MIME type (optional, returns false when not provided)
   * @return {boolean} true if MIME type is accepted by that Render
   */
  static accepts(PictureRender, mimeType) {
    return PictureRender.SUPPORTED_MIME_TYPES.includes(mimeType)
  }

  static propTypes = {
    // when not provided, placeholder will be displayed instead (for loading or non resolved).
    // when provided, that mime type should be listed in mimeTypesDefinitions from regardsoss/mime-types
    mimeType: PropTypes.string,
    url: PropTypes.string,
    // accepts any other properties that can apply to pictures
  }

  render() {
    const { mimeType, url, ...pictureProperties } = this.props
    if (url) {
      const URLPictureRender = URLPicture.PICTURES_RENDER.find((Render) => URLPicture.accepts(Render, mimeType))
      if (URLPictureRender) {
        // found a picture render matching that MIME type
        return <URLPictureRender url={url} {...pictureProperties} />
      }
    }
    // no render could be found: render placeholder
    return <BrokenPicturePlaceholder {...pictureProperties} />
  }
}

export default withModuleStyle(styles)(URLPicture)
