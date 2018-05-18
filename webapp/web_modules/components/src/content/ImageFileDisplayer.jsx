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
import keys from 'lodash/keys'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Displays picture files
* @author Raphaël Mechali
*/
class ImageFileDisplayer extends React.Component {
  /**
   * Maps MIME type to editor mode
   */
  static MIMETypes = {
    'image/png': 'image/png',
    'image/gif': 'image/gif',
    'image/jpeg': 'image/jpeg',
  }

  static getSupportedMIMETypes() {
    return keys(ImageFileDisplayer.MIMETypes)
  }

  static isSupportedType(mimeType) {
    return !!ImageFileDisplayer.MIMETypes[mimeType]
  }

  static propTypes = {
    imageURL: CommonShapes.URL.isRequired,
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
