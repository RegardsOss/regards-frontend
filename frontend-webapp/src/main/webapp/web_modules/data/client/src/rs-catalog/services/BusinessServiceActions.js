/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Fetches bussiness service.
 * Note that those actions should be instantiated once for each serviceScope to fetch (because backend cannot return ALL)
 */
export default class BusinessServiceActions extends BasicListActions {

  /**
   * Possible service scopes
   */
  static ServiceScopes = {
    ONE_DATAOBJECT: 'ONE',
    MANY_DATAOBJECTS: 'MANY',
    ONE_DATASET: 'QUERY',
  }

  constructor(namespace, serviceScope) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/services/{dataset_id}`,
      schemaTypes: {
        ENTITY: Schemas.BUSINESS_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.BUSINESS_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
    if (!serviceScope) {
      throw new Error('Service scope must be defined at constructor!')
    }
    this.serviceScope = serviceScope
  }

  fetchServices(datasetId) {
    if (datasetId) {
      return this.fetchEntityList({ dataset_id: datasetId }, { service_scope: this.serviceScope })
    }
    return null
  }

}
