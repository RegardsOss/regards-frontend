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
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { DropDownButton } from '@regardsoss/components'
import { RuntimeDataFile } from '../../../shapes/DataFileRuntime'

/**
 * Displays the file selector.
 * Pre: at least one file
 * @author Raphaël Mechali
 */
class FileSelectorComponent extends React.Component {
  static propTypes = {
    files: PropTypes.arrayOf(RuntimeDataFile).isRequired,
    selectedFile: RuntimeDataFile,
    onFileSelected: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Builds label for current file value
   * @param {RuntimeDataFile} file selected file value
   * @return
   */
  getLabel = ({ filename, filesize }) => {
    const { intl: { formatMessage, formatNumber } } = this.context
    let sizeMessage = null
    if (filesize) {
      const size = new storage.StorageCapacity(filesize, storage.StorageUnits.BYTE).scaleAndConvert(storage.StorageUnitScale.bytesScale)
      sizeMessage = storage.formatStorageCapacity(formatMessage, formatNumber, size)
    } else {
      sizeMessage = formatMessage({ id: 'module.description.file.selector.file.unkown.size' })
    }

    return formatMessage({ id: 'module.description.file.selector.file.label' }, { filename, sizeMessage })
  }

  render() {
    const { files, selectedFile, onFileSelected } = this.props
    return (
      <DropDownButton
        getLabel={this.getLabel}
        value={selectedFile}
        onChange={onFileSelected}
      >
        { /* Build available files menu item */
          files.map(file => (
            <MenuItem
              key={file.uri}
              primaryText={this.getLabel(file)}
              value={file}
            />
          ))
        }
      </DropDownButton>
    )
  }
}
export default FileSelectorComponent
