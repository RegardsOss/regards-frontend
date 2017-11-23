/**
* LICENSE_PLACEHOLDER
**/
import { descriptionLevelModel } from '@regardsoss/entities-common'

/** The description level model works exactly the same than a client but it has no web connection */

export const REDUCER_PATH = 'descriptionLevel'

/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-graph', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'search-graph/description-level'

export const descriptionLevelActions = new descriptionLevelModel.DescriptionLevelActions(REDUX_ACTION_NAMESPACE)
export const descriptionLevelReducer = descriptionLevelModel.getDescriptionLevelReducer(REDUX_ACTION_NAMESPACE)
export const descriptionLevelSelectors = descriptionLevelModel.getDescriptionLevelSelectors(ENTITIES_STORE_PATH)

module.exports = {
  descriptionLevelActions,
  descriptionLevelReducer,
  descriptionLevelSelectors,
}
