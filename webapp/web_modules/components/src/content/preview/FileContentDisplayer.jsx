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
import root from 'window-or-global'
import compose from 'lodash/fp/compose'
import { withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { FileContentReader } from '@regardsoss/display-control'
import LocalURLProvider from '@regardsoss/display-control/src/blob/LocalURLProvider'
import IFrameURLContentDisplayer from './IFrameURLContentDisplayer'
import CodeFileDisplayer from './CodeFileDisplayer'
import ImageFileDisplayer from './ImageFileDisplayer'
import { MarkdownFileContentDisplayer } from './MarkdownFileContentDisplayer'
import { ContentLoadingComponent } from '../feedback/ContentLoadingComponent'
import DownloadErrorComponent from './state/DownloadErrorComponent'
import NoPreviewComponent from './state/NoPreviewComponent'
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
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
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
    },
    loadingComponent: <ContentLoadingComponent loadingMessageKey={ContentLoadingComponent.DEFAULT_MESSAGES_KEYS.LOADING_FILE} />,
    errorComponent: <DownloadErrorComponent />,
    noPreviewComponent: <NoPreviewComponent />,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      loading, error, file, style,
      loadingComponent, errorComponent, noPreviewComponent,
    } = this.props
    const {
      moduleTheme: {
        fileContent: {
          statusContainer, markdownPreviewContainer,
        },
      },
    } = this.context

    return (
      // Outer layout, provided by API user
      <div style={style}>
        { /** IIFE to render content according with state and MIME type */
            (() => {
              if (loading) {
                return <div style={statusContainer}>{loadingComponent || null}</div>
              }
              if (error) {
                return <div style={statusContainer}>{errorComponent || null}</div>
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
                return (// TODO: scrolling, centrage
                  <LocalURLProvider blob={content} targetPropertyName="source">
                    <ImageFileDisplayer />
                  </LocalURLProvider>)
              }
              /* TODO:
               Code (CSS, JS, JSON, XML) : OK
               Pictures: (GIF, JPEG, JPEG-BIG, PNG) : TODO
               Web (HTML, XHTML, PDF, TEXT): TODO
               Markdown: TODO
               Errors: OK
              */
              // 3 - render through an iFrame, using access URL
              if (IFrameURLContentDisplayer.isSupportedContentType(contentType)) {
                return (
                  <LocalURLProvider blob={content} targetPropertyName="source">
                    <IFrameURLContentDisplayer style={style} />
                  </LocalURLProvider>)
              }
              if (MarkdownFileContentDisplayer.isSupportedContentType(contentType)) {
                // TODO: report here the blob reading plinciples from description
                // TODO this is temporary
                return (
                  <div style={markdownPreviewContainer} targetPropertyName="source">
                    <FileContentReader blob={content}>
                      <MarkdownFileContentDisplayer heightToFit={500} />
                    </FileContentReader>
                  </div>)
              }
              return <div style={statusContainer}>{noPreviewComponent || null}</div>
            })()
        }
      </div>)
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(FileContentDisplayer)
