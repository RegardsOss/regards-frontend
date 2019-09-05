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
import { connect } from '@regardsoss/redux'
import { FileData } from '../../../../shapes/DescriptionState'
import { downloadEntityFileActions } from '../../../../clients/DownloadEntityFileActions'
import FilePageComponent from '../../../../components/user/content/file/FilePageComponent'

/**
 * File page container: it loads file to show and provides loading state, error or file content to its child component
 * @author Raphaël Mechali
 */
export class FilePageContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      downloadFile: filePath => dispatch(downloadEntityFileActions.downloadFile(filePath)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    file: FileData.isRequired, // Nota: file must be available when in this container
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    downloadFile: PropTypes.func.isRequired,
  }

  /** Reference to the file being currently downloaded (for promises callback concurrency management) */
  currentFile = null

  /** Initial state */
  state = {
    loading: false,
    error: false,
    resolvedFile: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Lifecycle method: component will unmount. Used here to stop updated
   */
  componentWillUnmount() {
    this.wasUnmounted = true
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, { downloadFile, file }) => {
    if (oldProps.file !== file) {
      this.onStartDownloadFile(downloadFile, file)
    }
  }

  /**
   * On start download
   * @param {function} downloadFile download file function like (uri) => Promise
   * @param {*} file file to display, matching DescriptionState.FileData
   */
  onStartDownloadFile = (downloadFile, file) => {
    // 1 - store entity in instance (concurrency management)
    this.currentFile = file
    // 2 - mark loading
    this.setState({ loading: true, error: false, resolvedFile: null })
    // 3 - start loading
    downloadFile(file.uri).then((results) => {
      // 3.A : loading successful
      if (results.error) {
        // 3.A.1 - loading failed (but not through catch...)
        this.onDownloadError(file)
      } else {
        // 3.A.2 - no other download was triggered, update state with loaded data
        this.onDownloadSuccess(file, results.payload)
      }
    }).catch(() => this.onDownloadError(file))
  }

  /**
   * Callback: download was succesfully performed
   * @param {*} downloadedFile file that was downloaded, matching DescriptionState.FileData
   * @param {{content: *, contentType: string}} resolvedFile downloaded file content and type
   */
  onDownloadSuccess = (downloadedFile, resolvedFile) => {
    // prevent updating when component was unmounted OR another file download was triggered
    if (!this.wasUnmounted && this.currentFile === downloadedFile) {
      this.setState({ loading: false, error: false, resolvedFile })
    }
  }

  /**
   * Callback: download finished in error
   * @param {*} downloadedFile file that failed downloading, matching DescriptionState.FileData
   */
  onDownloadError = (downloadedFile) => {
    // prevent updating when component was unmounted OR another file download was triggered
    if (!this.wasUnmounted && this.currentFile === downloadedFile) {
      this.setState({ loading: false, error: true, resolvedFile: null })
    }
  }

  render() {
    const { loading, error, resolvedFile } = this.state

    return (
      <FilePageComponent
        loading={loading}
        error={error}
        file={resolvedFile}
      />)
  }
}
export default connect(null, FilePageContainer.mapDispatchToProps)(FilePageContainer)
