/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicFacetsPageableReducers } from '@regardsoss/store-utils'
import { EntityConfiguration } from '@regardsoss/api'
import SearchEntitiesActions from './SearchEntitiesActions'

/**
 * Redux store reducer for ALL entities actions (can be single instantiated for all or one for each actions)
 * @author Sébastien binda
 */
class CatalogEntityReducer extends BasicFacetsPageableReducers {
  constructor(namespace) {
    super(EntityConfiguration, new SearchEntitiesActions(namespace))
  }

}

export default (namespace) => {
  const instance = new CatalogEntityReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
