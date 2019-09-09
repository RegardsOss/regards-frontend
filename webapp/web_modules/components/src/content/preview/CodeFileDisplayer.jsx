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
import { AceEditorAdapter } from '@regardsoss/adapters'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
* Displays code files.
* Note: it should only be used with compatible MIME types (see map SUPPORTED_MIME_TYPES and method isSupportedContentType)
* @author Raphaël Mechali
*/
class CodeFileDisplayer extends React.Component {
  /** Supported MIME types */
  static SUPPORTED_MIME_TYPES = [
    MIME_TYPES.CSS_MIME_TYPE,
    MIME_TYPES.JAVASCRIPT_MIME_TYPE,
    MIME_TYPES.JSON_MIME_TYPE,
    MIME_TYPES.XML_MIME_TYPE,
  ]

  /**
   * Maps MIME type to editor mode
   */
  static MIMETypeToMode = {
    [MIME_TYPES.CSS_MIME_TYPE]: 'css',
    [MIME_TYPES.JAVASCRIPT_MIME_TYPE]: 'javascript',
    [MIME_TYPES.JSON_MIME_TYPE]: 'json',
    [MIME_TYPES.XML_MIME_TYPE]: 'xml',
  }

  /**
   * Is supported content type for this component?
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isSupportedContentType(contentType) {
    const lowerContentType = contentType.toLowerCase()
    return CodeFileDisplayer.SUPPORTED_MIME_TYPES.some(mimeType => lowerContentType.includes(mimeType))
  }

  static EDITOR_PROPS = {
    showLineNumbers: true,
    readOnly: true,
  }

  static propTypes = {
    content: PropTypes.string,
    contentType: PropTypes.string.isRequired,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  static defaultProps = {
    content: '',
    style: {
      width: '100%',
      height: '100%',
    },
  }

  render() {
    const { style, content, contentType } = this.props
    return (
      <AceEditorAdapter
        mode={CodeFileDisplayer.MIMETypeToMode[contentType]}
        value={content}
        setOptions={CodeFileDisplayer.EDITOR_PROPS}
        style={style}
        showPrintMargin={false}
        showGutter
      />)
  }
}
export default CodeFileDisplayer
