/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'

/**
* Displays picture files
* @author Raphaël Mechali
*/
class ImageFileDisplayer extends React.Component {
  /**
   * Is supported content type for this component?
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isSupportedContentType(contentType) {
    return UIDomain.DisplayHelpers.isImageMimeType(contentType)
  }

  static propTypes = {
    source: PropTypes.string,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    style: {
      flexGrow: 1,
      flexShrink: 1,
    },
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { source, style } = this.props
    const { intl: { formatMessage }, moduleTheme: { fileContent: { image } } } = this.context
    // Do not display without source URL
    if (!source) {
      return null
    }

    return (
      // External dimension
      <div style={style}>
        {/* Inner layout: center pictures to small, cap pictures to big */}
        <div style={image.container}>
          <img
            src={source}
            alt={formatMessage({ id: 'image.file.not.displayed' })}
            style={image.img}
          />
        </div>
      </div>
    )
  }
}
export default ImageFileDisplayer
