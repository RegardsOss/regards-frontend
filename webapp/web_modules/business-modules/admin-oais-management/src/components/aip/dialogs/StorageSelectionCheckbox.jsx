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
import { StorageShapes } from '@regardsoss/shape'
import Checkbox from 'material-ui/Checkbox'

/**
 * Check to select / unselect a storage space
 * @author Raphaël Mechali
 */
class StorageSelectionCheckbox extends React.Component {
static propTypes = {
  storage: StorageShapes.StorageLocationContent.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired, // stprage index in list
  onToggleStorage: PropTypes.func.isRequired, // toggle selection for a storage callback: (storageIndex: number) => ()
}

/**
 * Callback: user toggled this storage selection
 */
onToggle = () => {
  const { index, onToggleStorage } = this.props
  onToggleStorage(index)
}

render() {
  const { storage, selected } = this.props
  return (
    <Checkbox
      label={storage.name}
      checked={selected}
      onCheck={this.onToggle}
    />
  )
}
}
export default StorageSelectionCheckbox
