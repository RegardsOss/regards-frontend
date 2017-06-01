/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'

/**
 * Function to get redux store selectors for search entities actions results
*/
export default storePath => new BasicFacetsPageableSelectors(storePath)
