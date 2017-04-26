/**
* LICENSE_PLACEHOLDER
**/
import { DownloadDescriptionClient } from '@regardsoss/entities-common'

const clientInstance = new DownloadDescriptionClient('search-graph', ['modules.search-graph'])
export default clientInstance

export const DATASET_REDUCER_PATH = DownloadDescriptionClient.LAST_DATASET_REDUCER_PATH_ELT
export const COLLECTION_REDUCER_PATH = DownloadDescriptionClient.LAST_COLLECTION_REDUCER_PATH_ELT
