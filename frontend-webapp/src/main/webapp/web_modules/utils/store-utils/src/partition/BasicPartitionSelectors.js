/**
* LICENSE_PLACEHOLDER
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
