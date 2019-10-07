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
import { StringComparison } from '@regardsoss/form-utils'
import { StringArrayValueRender } from '@regardsoss/components'

/**
 * Render for storages list in AIP
 * @author Raphaël Mechali
 */
class AIPListStoragesRenderComponent extends React.Component {
  static propTypes = {
    entity: StorageShapes.AIPWithStorages.isRequired, // from table cell API
    dataStorages: PropTypes.arrayOf(StorageShapes.PrioritizedDataStorageContent).isRequired,
  }

  static defaultProps = {}

  render() {
    const { entity: { content: { dataStorageIds } }, dataStorages } = this.props
    return (
      <StringArrayValueRender value={
        // retrieve storages by Id and sort them by label
        dataStorageIds
          .map(id => dataStorages.find(str => str.id === id).name)
          .sort(StringComparison.compare)
        }
      />
    )
  }
}
export default AIPListStoragesRenderComponent
