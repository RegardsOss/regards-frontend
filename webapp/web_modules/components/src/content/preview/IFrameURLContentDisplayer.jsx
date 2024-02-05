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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { UIDomain } from '@regardsoss/domain'
import isEqual from 'lodash/isEqual'
import styles from '../styles'

/**
 * Shows content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
 * You can use all accepted dialog properties
 */
export class IFrameURLContentDisplayer extends React.Component {
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
    return UIDomain.DisplayHelpers.isIFrameMimeType(contentType)
  }

  /**
   * Does content type as parameter allow relative links (in such case, source should be server URL, and not local content)
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isContentTypeWithRelativeLinks(contentType) {
    const lowerContentType = contentType.toLowerCase()
    return IFrameURLContentDisplayer.RELATIVE_LINKS_MIME_TYPES.some((mimeType) => lowerContentType.includes(mimeType))
  }

  static propTypes = {
    source: PropTypes.string,
    onContentLoaded: PropTypes.func, // callback, called when IFrame content was loaded
    onContentError: PropTypes.func,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    // eslint-disable-next-line react/no-unused-prop-types, react/forbid-prop-types
    style: PropTypes.objectOf(PropTypes.any),
    // iFrame style: optional iFrame style, when globalTheme.fileContent.background should not be used
    // eslint-disable-next-line react/no-unused-prop-types, react/forbid-prop-types
    iFrameStyle: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    style: {
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      minHeight: 0,
    },
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    wrapperStyle: {},
    iframeStyle: {},
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { style, iFrameStyle, fileContentStyle } = newProps
    if (!isEqual(style, oldProps.style) || !isEqual(iFrameStyle, oldProps.iFrameStyle) || !isEqual(fileContentStyle, oldProps.fileContentStyle)) {
      this.setState({
        wrapperStyle: {
          ...style,
          position: 'relative',
          backgroundColor: 'white',
          // user or common style
          ...(iFrameStyle || fileContentStyle),
        },
        iframeStyle: {
          height: '100%',
          width: '100%',
          position: 'absolute',
        },
      })
    }
  }

  render() {
    const {
      source, onContentLoaded, onContentError,
    } = this.props
    const {
      wrapperStyle, iframeStyle,
    } = this.state
    return (
      <div style={wrapperStyle}>
        <iframe
          title="content-displayer"
          src={source}
          onLoad={onContentLoaded}
          onError={onContentError}
          style={iframeStyle}
        />
      </div>
    )
  }
}

// Export for external consumers with style context and static methods
const WithContext = withModuleStyle(styles)(IFrameURLContentDisplayer)
WithContext.getSupportedMIMETypes = IFrameURLContentDisplayer.getSupportedMIMETypes
WithContext.isSupportedContentType = IFrameURLContentDisplayer.isSupportedContentType
WithContext.isContentTypeWithRelativeLinks = IFrameURLContentDisplayer.isContentTypeWithRelativeLinks

export default WithContext
