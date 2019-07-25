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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { CatalogShapes } from '@regardsoss/shape'
import FilesComponent from '../../../components/user/files/FilesComponent'

/**
 * Files container: provides displayable files to FilesComponent
 * @author Raphaël Mechali
 */
export class FilesContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    fileType: PropTypes.oneOf(CommonDomain.DataTypes).isRequired, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    accessToken: PropTypes.string, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    projectName: PropTypes.string, // used only in onPropertiesUpdated
  }

  /** Default component state */
  static DEFAULT_STATE = {
    files: [],
    selectedFile: null,
  }

  /** Initial component state  */
  state = FilesContainer.DEFAULT_STATE

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
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, {
    entity, fileType, accessToken, projectName,
  }) => {
    // prepare URI origin parameter for locally stored files (not reference)
    const uriOriginParam = `&origin=${root.location.protocol}//${root.location.host}`

    // compute next state: convert all files with final URL and only useful information
    const files = get(entity, `content.files.${fileType}`, [])
      .reduce((acc, dataFile) => dataFile.online
        ? [...acc, {
          filename: dataFile.filename,
          mimeType: dataFile.mimeType,
          filesize: dataFile.filesize,
          // URI: append scope, project and origin when file is not a reference
          uri: `${DamDomain.DataFileController.getFileURI(dataFile, accessToken, projectName)}${dataFile.reference ? '' : uriOriginParam}`,
        }] : acc, // not online
      [])
    this.setState({
      files,
      selectedFile: files.length ? files[0] : null,
    })
  }

  /**
   * User callback: new file selected
   * @param {file} selectedFile file that was selected
   */
  onFileSelected = (selectedFile) => {
    if (this.state.selectedFile !== selectedFile) {
      this.setState({ selectedFile })
    }
  }

  render() {
    const { files, selectedFile } = this.state
    return (
      <FilesComponent
        files={files}
        selectedFile={selectedFile}
        onFileSelected={this.onFileSelected}
      />
    )
  }
}
export default FilesContainer
