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
import root from 'window-or-global'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { I18nProvider } from '@regardsoss/i18n'
import IFrameURLContentDisplayer from './IFrameURLContentDisplayer'
import CodeFileDisplayer from './CodeFileDisplayer'
import ImageFileDisplayer from './ImageFileDisplayer'
import messages from './i18n'
import styles from './styles'
import NoPreviewDisplayer from './NoPreviewDisplayer'

/**
 * Shows file content through the adequate content displayer, if any, or relies on a local URL iFrame renderer
 * to display the file. Provides i18n and theme to sub components
 * @author Raphaël Mechali
 */
class FileContentDisplayer extends React.Component {
  static buildLocalAccessURL(blob) {
    return root.URL.createObjectURL(blob)
  }

  static isSupportedMIMEType = file =>
    CodeFileDisplayer.isSupportedType(file.contentType) ||
    ImageFileDisplayer.isSupportedType(file.contentType) ||
    IFrameURLContentDisplayer.isSupportedType(file.contentType)

  static propTypes = {
    file: PropTypes.shape({
      // For tests: Blob is not necessary present when loading the class
      content: PropTypes.instanceOf(root.Blob || Object).isRequired,
      contentType: PropTypes.string.isRequired,
    }).isRequired,
    /** file access URL, allows access to the file as URL. Provide only when externally driven, use
     * FileContentDisplayer.buildLocalAccessURL to generate it in that case. It will free local URLs automatically */
    // eslint-disable-next-line react/no-unused-prop-types
    fileAccessURL: PropTypes.string, // Not URL as it may be a local browser URL (prefixed with blob:)
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }


  componentWillMount = () => this.onPropertiesChanged({}, this.props)
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)
  componentWillUnmount = () => this.onPropertiesChanged(this.props, {})


  /**
   * Handles properties changed: frees the object URL if required, build the new URL if required and stores the URL to use in state
   * @param oldProps old properties
   * @param newProps new properties
   */
  onPropertiesChanged = ({ file: oldFile, fileAccessURL: oldURL }, { file: newFile, fileAccessURL: newURL }) => {
    if (oldFile !== newFile) { // On file change
      // 1 - Revoke old URL if there was one
      if (this.state && this.state.localAccessURL) {
        root.URL.revokeObjectURL(oldURL)
      }
      // 2 - Use new URL if there is a new file
      if (newFile) {
        this.setState({ localAccessURL: newURL || FileContentDisplayer.buildLocalAccessURL(newFile.content) })
      }
    }
  }

  render() {
    const { file, style } = this.props
    const { localAccessURL } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          {
            (() => {
              // 1 - Render through a code view for corresponding MIME type
              if (CodeFileDisplayer.isSupportedType(file.contentType)) {
                return <CodeFileDisplayer file={file} />
              }
              // 2 - Render through image view for corresponding MIME types, using access URL
              if (ImageFileDisplayer.isSupportedType(file.contentType)) {
                return <ImageFileDisplayer imageURL={localAccessURL} />
              }
              // 3 - render through an iFrame, using access URL
              if (IFrameURLContentDisplayer.isSupportedType(file.contentType)) {
                return (
                  <IFrameURLContentDisplayer
                    style={style}
                    contentURL={localAccessURL}
                  />)
              }
              return (
                <NoPreviewDisplayer />
              )
            })()
          }
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default FileContentDisplayer
