/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicFacetsPageableReducers } from '@regardsoss/store-utils'
import { EntityConfiguration } from '@regardsoss/api'
import CatalogDataobjectEntityActions from './CatalogDataobjectEntityActions'

/**
 * Redux store reducer for Module entities
 * @author Sébastien binda
 */
class CatalogEntityReducer extends BasicFacetsPageableReducers {
  constructor() {
    super(EntityConfiguration, CatalogDataobjectEntityActions)
  }

}

const instance = new CatalogEntityReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getCatalogEntityReducer = (state, action) => instance.reduce(state, action)

export default getCatalogEntityReducer
