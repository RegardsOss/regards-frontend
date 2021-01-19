/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicSelector from '../BasicSelector'

const DEFAULT_PARTITION_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: null,
}

/**
 * Selectors for partitioned actions, exposes store data by partition key
 */
class BasicPartitionSelector extends BasicSelector {
  getPartition(state, partitionKey) {
    const allPartitions = this.uncombineStore(state)
    const partition = allPartitions ? allPartitions[partitionKey] : null
    return partition || DEFAULT_PARTITION_STATE
  }

  isLoading(state, partitionKey) {
    return this.getPartition(state, partitionKey).loading
  }

  hasError(state, partitionKey) {
    return this.getPartition(state, partitionKey).hasError
  }

  getError(state, partitionKey) {
    return this.getPartition(state, partitionKey).error
  }

  getData(state, partitionKey) {
    return this.getPartition(state, partitionKey).data
  }
}

export default BasicPartitionSelector
