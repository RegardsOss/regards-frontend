/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Redux selector to retrieve DatasetDataAttributes (AttributeModel) entities
 *
 * @param storePath
 *
 * @author Sébastien Binda
 */
export default storePath => new BasicPageableSelectors(storePath)
