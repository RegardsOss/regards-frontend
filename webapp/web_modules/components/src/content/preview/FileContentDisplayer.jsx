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
import root from 'window-or-global'
import compose from 'lodash/fp/compose'
import DownloadErrorIcon from 'mdi-material-ui/EmoticonSadOutline'
import NoPreviewIcon from 'mdi-material-ui/MonitorOff'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { FileContentReader, LocalURLProvider } from '@regardsoss/display-control'
import { NoContentComponent } from '../feedback/NoContentComponent'
import { IFrameURLContentDisplayer } from './IFrameURLContentDisplayer'
import CodeFileDisplayer from './CodeFileDisplayer'
import ImageFileDisplayer from './ImageFileDisplayer'
import { MarkdownFileContentDisplayer } from './MarkdownFileContentDisplayer'
import { ContentLoadingComponent } from '../feedback/ContentLoadingComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Shows file content through the adequate content displayer, if any. Shows messages or loading views
 * according with its properties (loading / error / file MIME type unsupported)
 * In order to adapt its parent size, style is defined as, flexGrow/flexShrink: 1. That can be
 * overriden using style property
 * @author Raphaël Mechali
 */
export class FileContentDisplayer extends React.Component {
  /**
   * Is supported content type?
   * @param {string} contentType to test
   * @return {boolean} true when content type is supported
   */
  static isSupportedContentType(contentType) {
    return CodeFileDisplayer.isSupportedContentType(contentType)
    || ImageFileDisplayer.isSupportedContentType(contentType)
    || IFrameURLContentDisplayer.isSupportedContentType(contentType)
    || MarkdownFileContentDisplayer.isSupportedContentType(contentType)
  }

  /**
   * Is supported file type?
   * @param {content: *, contentType: string} file to test
   * @return {boolean} true when file type is supported by this displayer
   */
  static isSupportedFileType(file) {
    return FileContentDisplayer.isSupportedContentType(file.contentType)
  }

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    // file, required when loading and error are false
    file: PropTypes.shape({
      // For tests: Blob is not necessary present when loading the class
      content: PropTypes.instanceOf(root.Blob || Object).isRequired,
      contentType: PropTypes.string.isRequired,
    }),
    fileURI: PropTypes.string, // corresponding URI for MIME types that require initial URI context (like HTML)
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    style: PropTypes.objectOf(PropTypes.any),
    // Component to display when loading
    loadingComponent: PropTypes.node,
    // Component to display when file download failed
    errorComponent: PropTypes.node,
    // Component to display when preview is not available
    noPreviewComponent: PropTypes.node,
  }

  static defaultProps = {
    loading: true,
    error: false,
    style: {
      flexGrow: 1,
      flexShrink: 1,
      minHeight: 0,
      minWidth: 0,
      display: 'flex',
    },
    loadingComponent: <ContentLoadingComponent loadingMessageKey={ContentLoadingComponent.DEFAULT_MESSAGES_KEYS.LOADING_FILE} />,
    errorComponent: <NoContentComponent
      titleKey="default.file.download.error.title"
      messageKey="default.file.download.error.message"
      Icon={DownloadErrorIcon}
    />,
    noPreviewComponent: <NoContentComponent
      titleKey="default.unsuported.file.media.type.title"
      messageKey="default.unsuported.file.media.type.message"
      Icon={NoPreviewIcon}
    />,
  }

  render() {
    const {
      loading, error, file, style, fileURI,
      loadingComponent, errorComponent, noPreviewComponent,
    } = this.props

    return (
      // Outer layout, provided by API user
      <div style={style}>
        { /** IIFE to render content according with state and MIME type */
            (() => {
              if (loading) {
                return loadingComponent || null
              }
              if (error) {
                return errorComponent || null
              }
              const { content, contentType } = file
              if (CodeFileDisplayer.isSupportedContentType(contentType)) {
                return (
                  <FileContentReader blob={content}>
                    <CodeFileDisplayer contentType={contentType} />
                  </FileContentReader>)
              }
              // 2 - Render through image view for corresponding MIME types, using access URL
              if (ImageFileDisplayer.isSupportedContentType(contentType)) {
                return (
                  <LocalURLProvider blob={content} targetPropertyName="source">
                    <ImageFileDisplayer />
                  </LocalURLProvider>)
              }
              // 3 - render through an iFrame, using access URL
              if (IFrameURLContentDisplayer.isSupportedContentType(contentType)) {
                // 3.1 - HTML content, that must support relative links, is rendered by
                // downloading again from server (using browser cache normally)
                if (IFrameURLContentDisplayer.isContentTypeWithRelativeLinks(contentType)) {
                  return <IFrameURLContentDisplayer source={fileURI} />
                }
                // 3.2 - Other content types are rendered using local browser resource
                return (
                  <LocalURLProvider blob={content} targetPropertyName="source">
                    <IFrameURLContentDisplayer />
                  </LocalURLProvider>)
              }
              if (MarkdownFileContentDisplayer.isSupportedContentType(contentType)) {
                return (
                  <FileContentReader blob={content} targetPropertyName="source">
                    <MarkdownFileContentDisplayer />
                  </FileContentReader>)
              }
              return noPreviewComponent || null
            })()
        }
      </div>)
  }
}

// report static methods to avoid import mess
const WithContext = compose(withI18n(messages, true), withModuleStyle(styles, true))(FileContentDisplayer)
WithContext.isSupportedFileType = FileContentDisplayer.isSupportedFileType
WithContext.isSupportedContentType = FileContentDisplayer.isSupportedContentType
export default WithContext
