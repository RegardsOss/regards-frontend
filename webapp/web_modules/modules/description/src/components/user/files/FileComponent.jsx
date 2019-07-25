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
import get from 'lodash/get'
import root from 'window-or-global'
import { Measure } from '@regardsoss/adapters'
import { themeContextType } from '@regardsoss/theme'
import { FileContentDisplayer } from '@regardsoss/components'

import FileLoadingComponent from './FileLoadingComponent'
import FileMessageComponent from './FileMessageComponent'
import MarkdownFileContainer from '../../../containers/user/files/MarkdownFileContainer'


/**
 * Description file component
 * @author Raphaël Mechali
 */
export class FileComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    // a disaplayable file with content and MIME type
    file: PropTypes.shape({
      content: PropTypes.instanceOf(root.Blob || Object).isRequired, // For tests: Blob is not necessary present when loading the class
      contentType: PropTypes.string.isRequired,
    }),
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * React lifecycle method: component will mount. Used here to initialize display information
   */
  componentWillMount = () => this.updateDisplayAreaStyle(0, 0)

  /**
   * Resized event reveived
   * @param {*} sizes size by component name
   */
  onSizeChanged = ({ measureDiv: { width, height } }) => this.updateDisplayAreaStyle(Math.round(width), Math.round(height))

  /**
   * Updates display area style
   */
  updateDisplayAreaStyle = (width, height) => {
    if (width !== get(this.state, 'displayAreaStyle.width')
      || height !== get(this.state, 'displayAreaStyle.height')) {
      this.setState({ displayAreaStyle: { width, height } })
    }
  }


  render() {
    const { loading, error, file } = this.props
    const { displayAreaStyle } = this.state
    const { moduleTheme } = this.context
    const { fileMeaureDiv, contentBackground } = moduleTheme.user.card.media.tabs.tab.filesTab

    // measure self
    return (
      <Measure bounds onMeasure={this.onSizeChanged}>
        {
          ({ bind }) => (
            <div style={fileMeaureDiv} {...bind('measureDiv')}>
              { // content producing method
                (() => {
                  if (loading) { // loading file content
                    return <FileLoadingComponent />
                  }
                  if (error) {
                    // file could not be loaded
                    return (
                      <FileMessageComponent
                        noContent
                        titleKey="module.description.files.error.title"
                        messageKey="module.description.files.error.message"
                      />)
                  }
                  // Supported media types: select the right display for current type
                  if (FileContentDisplayer.isSupportedMIMEType(file)) {
                    return (
                      <div style={contentBackground}>
                        <FileContentDisplayer file={file} style={displayAreaStyle} />
                      </div>)
                  }
                  if (MarkdownFileContainer.isSupportedType(file)) {
                    return (
                      <div style={contentBackground}>
                        <MarkdownFileContainer height={displayAreaStyle.height} file={file} />
                      </div>)
                  }
                  // Unsupported media type
                  return (
                    <FileMessageComponent
                      noContent
                      titleKey="module.description.file.media.unsuported.title"
                      messageKey="module.description.file.media.unsuported.message"
                    />)
                })()
              }
            </div>)
        }
      </Measure>)
  }
}

export default FileComponent
