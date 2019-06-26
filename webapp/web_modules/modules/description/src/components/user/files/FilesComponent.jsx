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
import IconButton from 'material-ui/IconButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DownloadButton } from '@regardsoss/components'
import { RuntimeDataFile } from '../../../shapes/DataFileRuntime'
import FileSelectorComponent from './FileSelectorComponent'
import FileContainer from '../../../containers/user/files/FileContainer'

/**
 * Files component: shows file content and file selector
 * @author Raphaël Mechali
 */
export class FilesComponent extends React.Component {
  static propTypes = {
    files: PropTypes.arrayOf(RuntimeDataFile).isRequired,
    // selected file when there is one
    selectedFile: RuntimeDataFile,
    onFileSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { files, selectedFile, onFileSelected } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context

    const {
      rootStyle, fileOptions, fileContent,
    } = moduleTheme.user.card.media.tabs.tab.filesTab

    if (files.length === 0 || !selectedFile) {
      // No file: should never happen (see DescriptionTabsEnum)
      return null
    }
    return (
      <div style={rootStyle}>
        <div style={fileOptions}>
          <FileSelectorComponent
            files={files}
            selectedFile={selectedFile}
            onFileSelected={onFileSelected}
          />
          <DownloadButton
            ButtonConstructor={IconButton}
            downloadURL={selectedFile.uri}
            label={formatMessage({ id: 'module.description.files.download.button' })}
          >
            <DownloadIcon />
          </DownloadButton>
        </div>
        <div style={fileContent}>
          <FileContainer file={selectedFile} />
        </div>
      </div>
    )
  }
}
export default FilesComponent
