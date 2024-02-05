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
import compose from 'lodash/fp/compose'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { DownloadFileActions } from '@regardsoss/store-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'
import { FileContentDisplayer } from './FileContentDisplayer'

/** Actions to download a file content */
const downloadFileActions = new DownloadFileActions({
  entityEndpoint: '{filePath}',
  namespace: 'url-content-displayer/download/file',
  bypassErrorMiddleware: true,
})

/**
 * URL content displayer. It displays content of a file (or no data / loading / unsupported MIME type) from its URL.
 * See FileContentDisplayer for more information about layout and properties
 * @author Raphaël Mechali
 */
export class URIContentDisplayer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      downloadFile: (filePath) => dispatch(downloadFileActions.download({ filePath })),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    uri: PropTypes.string.isRequired, // used only in onPropertiesUpdated
    // other props are reporetd to FileContentDisplayer (see it for more information)
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.objectOf(PropTypes.any),
    loadingComponent: PropTypes.node,
    errorComponent: PropTypes.node,
    noPreviewComponent: PropTypes.node,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    downloadFile: PropTypes.func.isRequired, // used only in onPropertiesUpdated
  }

  /** Reference on the file URI being downloaded (fom pomises management) */
  currentFileURI = null

  /** Initial state */
  state = {
    loading: false,
    error: false,
    resolvedFile: null,
    fileURI: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component will unmount. Used here to stop updated
   */
  componentWillUnmount() {
    this.wasUnmounted = true
  }

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
    const { uri: oldURI, mimeType: oldMimeType } = oldProps
    const { uri, mimeType, downloadFile } = newProps
    if (!isEqual(oldURI, uri) || !isEqual(oldMimeType, mimeType)) {
      this.onStartDownload(downloadFile, uri)
    }
  }

  /**
   * On start file downloading
   * @param {function} downloadFile download file function like (uri) => Promise
   * @param {string} uri URI of the file to download
   */
  onStartDownload = (downloadFile, uri) => {
    // 1 - store URI in instance (concurrency management)
    this.currentFileURI = uri
    // 2 - mark loading
    this.setState({
      loading: true, error: false, resolvedFile: null, fileURI: null,
    })
    // 3 - start loading
    downloadFile(uri).then((results) => {
      // 3.A : loading successful
      if (results.error) {
        // 3.A.1 - loading failed (but not through catch...)
        this.onDownloadError(uri)
      } else {
        // 3.A.2 - no other download was triggered, update state with loaded data
        this.onDownloadSuccess(uri, results.payload)
      }
    }).catch(() => this.onDownloadError(uri))
  }

  /**
   * Callback: download was succesfully performed
   * @param {string} downloadedURI URI of the downloaded file
   * @param {{content: *, contentType: string}} resolvedFile downloaded file content and type
   */
  onDownloadSuccess = (downloadedURI, resolvedFile) => {
    // prevent updating when component was unmounted OR another file download was triggered
    if (!this.wasUnmounted && this.currentFileURI === downloadedURI) {
      this.setState({
        loading: false, error: false, resolvedFile, fileURI: downloadedURI,
      })
      this.currentFileURI = null
    }
  }

  /**
   * Callback: download finished in error
   * @param {string} downloadedURI URI of the downloaded file
   */
  onDownloadError = (downloadedURI) => {
    // prevent updating when component was unmounted OR another file download was triggered
    if (!this.wasUnmounted && this.currentFileURI === downloadedURI) {
      this.setState({
        loading: false, error: true, resolvedFile: null, fileURI: null,
      })
      this.currentFileURI = null
    }
  }

  render() {
    const {
      style, loadingComponent, errorComponent, noPreviewComponent,
    } = this.props
    const {
      loading, error, resolvedFile, fileURI,
    } = this.state
    return (
      <FileContentDisplayer
        loading={loading}
        error={error}
        file={resolvedFile}
        fileURI={fileURI}
        style={style}
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
        noPreviewComponent={noPreviewComponent}
      />
    )
  }
}
export default compose(
  connect(null, URIContentDisplayer.mapDispatchToProps),
  withI18n(messages, true), withModuleStyle(styles, true))(URIContentDisplayer)
