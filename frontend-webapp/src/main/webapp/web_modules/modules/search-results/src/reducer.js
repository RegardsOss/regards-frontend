/**
 * LICENSE_PLACEHOLDER
 **/
import CatalogEntityReducer from './models/catalog/CatalogEntityReducer'
import getAttributesReducer from './models/attributes/AttributeModelReducer'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const searchResultsReducers = {
  attributes: getAttributesReducer,
  results: CatalogEntityReducer,
}

export default searchResultsReducers
