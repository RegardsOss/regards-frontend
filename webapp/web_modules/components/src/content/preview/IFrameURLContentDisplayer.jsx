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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'
import styles from '../styles'
import { MeasureResultProvider } from '../../../../utils/display-control/src/main'

/**
 * Shows content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
 * You can use all accepted dialog properties
 */
export class IFrameURLContentDisplayer extends React.Component {
  /**
   * Supported MIME types
   */
  static SUPPORTED_MIME_TYPES = [
    MIME_TYPES.TEXT,
    MIME_TYPES.HTML_MIME_TYPE,
    MIME_TYPES.PDF_MIME_TYPE,
    MIME_TYPES.XHTML_MIME_TYPE,
  ]

  /**
   * MIME types that support relative links
   */
  static RELATIVE_LINKS_MIME_TYPES = [
    MIME_TYPES.HTML_MIME_TYPE,
    MIME_TYPES.XHTML_MIME_TYPE,
  ]

  static getSupportedMIMETypes() {
    return IFrameURLContentDisplayer.MIMETypes
  }

  /**
   * Is supported content type for this component?
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isSupportedContentType(contentType) {
    const lowerContentType = contentType.toLowerCase()
    return IFrameURLContentDisplayer.SUPPORTED_MIME_TYPES.some(mimeType => lowerContentType.includes(mimeType))
  }

  /**
   * Does content type as parameter allow relative links (in such case, source should be server URL, and not local content)
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isContentTypeWithRelativeLinks(contentType) {
    const lowerContentType = contentType.toLowerCase()
    return IFrameURLContentDisplayer.RELATIVE_LINKS_MIME_TYPES.some(mimeType => lowerContentType.includes(mimeType))
  }

  static propTypes = {
    source: PropTypes.string,
    onContentLoaded: PropTypes.func, // callback, called when IFrame content was loaded
    onContentError: PropTypes.func,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    style: PropTypes.objectOf(PropTypes.any),
    // iFrame style: optional iFrame style, when globalTheme.fileContent.background should not be used
    iFrameStyle: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    style: {
      flexGrow: 1,
      flexShrink: 1,
    },
  }


  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Converts measured with and height into iFrame style
   * @param {number} width measured available width
   * @param {number} height measure available height
   * @return {*}
   */
  toIFrameStyle = (width, height) => {
    const { moduleTheme: { fileContent: { iFrame: fileContentStyle } } } = this.context
    const { iFrameStyle } = this.props
    return {
      width,
      height,
      // user or common style
      ...(iFrameStyle || fileContentStyle),
    }
  }

  render() {
    const {
      source, onContentLoaded, onContentError, style,
    } = this.props
    /*
     * Measure the available space using root style (user provided), as iFrames are not able using
     * flexShrink, flexGrow, height / width: 100%
     */
    return (
      <MeasureResultProvider style={style} targetPropertyName="style" toMeasureResult={this.toIFrameStyle}>
        {/* Display iFrame with computed style */}
        <iframe
          title="content-displayer"
          src={source}
          onLoad={onContentLoaded}
          onError={onContentError}
        />
      </MeasureResultProvider>
    )
  }
}

// Export for external consumers with style context and static methods
const WithContext = withModuleStyle(styles)(IFrameURLContentDisplayer)
WithContext.SUPPORTED_MIME_TYPES = IFrameURLContentDisplayer.SUPPORTED_MIME_TYPES
WithContext.getSupportedMIMETypes = IFrameURLContentDisplayer.getSupportedMIMETypes
WithContext.isSupportedContentType = IFrameURLContentDisplayer.isSupportedContentType
WithContext.isContentTypeWithRelativeLinks = IFrameURLContentDisplayer.isContentTypeWithRelativeLinks

export default WithContext
