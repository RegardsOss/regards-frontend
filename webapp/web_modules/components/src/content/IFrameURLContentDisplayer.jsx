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
import { CommonShapes } from '@regardsoss/shape'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
 * Shows content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
* You can use all accepted dialog properties
*/
class IFrameURLContentDisplayer extends React.Component {
  /**
   * Maps MIME type to editor mode
   */
  static MIMETypes = [
    MIME_TYPES.HTML_MIME_TYPE,
    MIME_TYPES.PDF_MIME_TYPE,
    MIME_TYPES.XHTML_MIME_TYPE,
  ]

  static propTypes = {
    contentURL: CommonShapes.URL.isRequired,
    onContentLoaded: PropTypes.func, // callback, called when IFrame content was loaded
    onContentError: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  static LAYOUT_STYLE = { flexGrow: 1, flexShrink: 1 }

  /** Default IFrame styles: grab all space available and re-initialize background to white */
  static DEFAULT_STYLES = {
    height: '100%', width: '100%', background: 'white',
  }

  static getSupportedMIMETypes() {
    return IFrameURLContentDisplayer.MIMETypes
  }

  static isSupportedType(mimeType) {
    return IFrameURLContentDisplayer.MIMETypes.includes(mimeType)
  }

  render() {
    const { contentURL, onContentLoaded, onContentError } = this.props
    const styles = this.props.style ? this.props.style : IFrameURLContentDisplayer.DEFAULT_STYLES
    return (
      <div style={IFrameURLContentDisplayer.LAYOUT_STYLE} >
        <iframe
          title="content-displayer"
          style={styles}
          src={contentURL}
          onLoad={onContentLoaded}
          onError={onContentError}
        />
      </div>
    )
  }
}
export default IFrameURLContentDisplayer
