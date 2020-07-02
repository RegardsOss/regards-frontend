import { DataProviderClient } from '@regardsoss/client'

/**
 * Dataprovider product entities client.
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'products']
const REDUX_ACTION_NAMESPACE = 'admin-data-provider-management/search-products'

export const productActions = new DataProviderClient.ProductActions(REDUX_ACTION_NAMESPACE)
export const productSelectors = DataProviderClient.getProductSelectors(ENTITIES_STORE_PATH)
export const productReducer = DataProviderClient.getProductReducer(REDUX_ACTION_NAMESPACE)
