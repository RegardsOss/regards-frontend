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
// import MarkdownFileContainer from '../../../containers/user/files/MarkdownFileContainer'
import LoadingComponent from '../feedback/LoadingComponent'
import { MarkdownFileContainer } from '../../../../containers/user/content/file/MarkdownFileContainer'
import NoDataMessageComponent from '../feedback/NoDataMessageComponent'


/**
 * File content display component. Note that file content type **must be supported!**
 * @author Raphaël Mechali
 */
export class FilePageComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    // a disaplayable file with content and MIME type
    file: PropTypes.shape({
      content: PropTypes.instanceOf(root.Blob || Object).isRequired, // For tests: Blob is not necessary present when loading the class
      contentType: PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Is file MIME type supported?
   * @param {content: *, contentType: string} file file
   * @return {boolean} true when MIME type is supported
   */
  static isSupportedMIMEType(file) {
    // TODO: report lower case correction from 4.1??
    return FileContentDisplayer.isSupportedMIMEType(file) || MarkdownFileContainer.isSupportedType(file)
  }

  /** Initial state */
  state = {
    displayAreaStyle: { width: 0, height: 0 },
  }

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
    const { file, loading, error } = this.props
    const { displayAreaStyle } = this.state
    const { moduleTheme } = this.context
    const { fileMeaureDiv, contentBackground } = moduleTheme.user.card.media.tabs.tab.filesTab

    // 1 - Return feedback components when file is not ready to display
    if (loading) {
      return <LoadingComponent type={LoadingComponent.LOADING_TYPES_ENUM.FILE} />
    }
    if (error) {
      return <NoDataMessageComponent type={NoDataMessageComponent.NO_DATA_TYPE_ENUM.FILE_DOWNLOAD_ERROR} />
    }
    if (!FilePageComponent.isSupportedMIMEType(file)) {
      return <NoDataMessageComponent type={NoDataMessageComponent.NO_DATA_TYPE_ENUM.NO_PREVIEW_FOR_FILE} />
    }

    // measure self
    return (
      <Measure bounds onMeasure={this.onSizeChanged}>
        {
          ({ bind }) => (
            <div style={fileMeaureDiv} {...bind('measureDiv')}>
              { // content producing method
                (() => {
                  if (FileContentDisplayer.isSupportedMIMEType(file)) {
                    return (
                      <div style={contentBackground}>
                        <FileContentDisplayer file={file} style={displayAreaStyle} />
                      </div>)
                  }
                  return null
                  // if (MarkdownFileContainer.isSupportedType(file)) {
                  //   // TODO next in dev: we may correlate here both Markdown and FileContentDisplayer: requires some work
                  //   // on other calling places
                  //   return (
                  //     <div style={contentBackground}>
                  //       <MarkdownFileContainer height={displayAreaStyle.height} file={file} />
                  //     </div>)
                  // }
                  // Unsupported media type
                  // return (
                  //   <FileMessageComponent
                  //     noContent
                  //     titleKey="module.description.file.media.unsuported.title"
                  //     messageKey="module.description.file.media.unsuported.message"
                  //   />)
                })()
              }
            </div>)
        }
      </Measure>)
  }
}

export default FilePageComponent
