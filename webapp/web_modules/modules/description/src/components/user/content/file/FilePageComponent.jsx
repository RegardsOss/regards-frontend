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
import { URIContentDisplayer } from '@regardsoss/components'
import { FileData } from '../../../../shapes/DescriptionState'


/**
 * File content display component. Note that file content type **must be supported!**
 * @author Raphaël Mechali
 */
export class FilePageComponent extends React.Component {
  static propTypes = {
    file: FileData.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
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
    const { file } = this.props
    const { displayAreaStyle } = this.state
    const { moduleTheme } = this.context
    const { fileMeaureDiv, contentBackground } = moduleTheme.user.card.media.tabs.tab.filesTab

    return (
      <URIContentDisplayer
        uri={file.uri}
        // style={{ flexGrow: 1, flexShrink: 1 }} // TODO update me!
      />)
    // TODO: old code => recover or delete style={displayAreaStyle}
    // measure self
    // (
    //   <Measure bounds onMeasure={this.onSizeChanged}>
    //     {
    //       ({ bind }) => (
    //         <div style={fileMeaureDiv} {...bind('measureDiv')}>
    //           { // content producing method
    //             (() => {
    //               if (FileContentDisplayer.isSupportedContentType(file)) {
    //                 return (
    //                   <div style={contentBackground}>
    //                     <FileContentDisplayer file={file} style={displayAreaStyle} />
    //                   </div>)
    //               }
    //               return null
    //               // if (MarkdownFileContainer.isSupportedType(file)) {
    //               //   // TODO next in dev: we may correlate here both Markdown and FileContentDisplayer: requires some work
    //               //   // on other calling places
    //               //   return (
    //               //     <div style={contentBackground}>
    //               //       <MarkdownFileContainer height={displayAreaStyle.height} file={file} />
    //               //     </div>)
    //               // }
    //               // Unsupported media type
    //               // return (
    //               //   <FileMessageComponent
    //               //     noContent
    //               //     titleKey="module.description.file.media.unsuported.title"
    //               //     messageKey="module.description.file.media.unsuported.message"
    //               //   />)
    //             })()
    //           }
    //         </div>)
    //     }
    //   </Measure>)
  }
}

export default FilePageComponent
