/**
* LICENSE_PLACEHOLDER
**/
import { CatalogClient } from '@regardsoss/client'

const REDUX_ACTION_NAMESPACE = 'search-results/findDataset'

export const actions = new CatalogClient.FindDatasetActions(REDUX_ACTION_NAMESPACE)

/**
 * Client to find a dataset. Reducer and selectors are undefined as they are unused
 */
export default {
  actions,
}
