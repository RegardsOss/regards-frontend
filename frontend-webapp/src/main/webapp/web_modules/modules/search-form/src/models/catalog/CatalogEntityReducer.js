/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { EntityConfiguration } from '@regardsoss/api'
import CatalogEntityActions from './CatalogEntityActions'

/**
 * Redux store reducer for Module entities
 * @author Sébastien binda
 */
class CatalogEntityReducer extends BasicPageableReducers {
  constructor() {
    super(EntityConfiguration, CatalogEntityActions)
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
