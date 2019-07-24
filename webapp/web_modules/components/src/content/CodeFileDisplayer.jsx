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
import keys from 'lodash/keys'
import root from 'window-or-global'
import { AceEditorAdapter } from '@regardsoss/adapters'
import { themeContextType } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
* Displays code files.
* Note: it should only be used with compatible MIME types (see map MIMETypeToMode and method isSupportedType)
* @author Raphaël Mechali
*/
class CodeFileDisplayer extends React.Component {
  /**
   * Maps MIME type to editor mode
   */
  static MIMETypeToMode = {
    [MIME_TYPES.CSS_MIME_TYPE]: 'css',
    [MIME_TYPES.JAVASCRIPT_MIME_TYPE]: 'javascript',
    [MIME_TYPES.JSON_MIME_TYPE]: 'json',
    [MIME_TYPES.XML_MIME_TYPE]: 'xml',
  }

  static getSupportedMIMETypes() {
    return keys(CodeFileDisplayer.MIMETypeToMode)
  }

  static isSupportedType(mimeType) {
    return !!CodeFileDisplayer.MIMETypeToMode[mimeType]
  }

  static EDITOR_PROPS = {
    showLineNumbers: true,
    readOnly: true,
  }

  static propTypes = {
    file: PropTypes.shape({
      // For tests: Blob is not necessary present when loading the class
      content: PropTypes.instanceOf(root.Blob || Object).isRequired,
      contentType: PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Default component state */
  static DEFAULT_STATE = {
    fileContent: '',
  }

  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = ({ file: oldFile }, { file: newFile }) => {
    if (oldFile !== newFile) {
      // re-initialize state
      this.setState(CodeFileDisplayer.DEFAULT_STATE)
      // extract file content from blob
      const reader = new FileReader()
      // callback: on done
      reader.addEventListener('loadend', () => {
        const fileContent = reader.result
        this.setState({ fileContent })
      })
      // start reading blob
      reader.readAsText(newFile.content)
    }
  }

  render() {
    const { file } = this.props
    const { fileContent } = this.state
    const { code } = this.context.moduleTheme
    return (
      <AceEditorAdapter
        mode={CodeFileDisplayer.MIMETypeToMode[file.contentType]}
        value={fileContent}
        setOptions={CodeFileDisplayer.EDITOR_PROPS}
        style={code.styles}
        showPrintMargin={false}
        showGutter
      />)
  }
}
export default CodeFileDisplayer
