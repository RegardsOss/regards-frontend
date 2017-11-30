/**
* LICENSE_PLACEHOLDER
**/
import { descriptionLevelModel } from '@regardsoss/entities-common'

/**
 * Server AttributeModel entities client.
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'descriptionLevel']
const REDUX_ACTION_NAMESPACE = 'search-results/description-level'

const descriptionLevelActions = new descriptionLevelModel.DescriptionLevelActions(REDUX_ACTION_NAMESPACE)
const descriptionLevelReducer = descriptionLevelModel.getDescriptionLevelReducer(REDUX_ACTION_NAMESPACE)
const descriptionLevelSelectors = descriptionLevelModel.getDescriptionLevelSelectors(ENTITIES_STORE_PATH)

module.exports = {
  descriptionLevelActions,
  descriptionLevelReducer,
  descriptionLevelSelectors,
}
