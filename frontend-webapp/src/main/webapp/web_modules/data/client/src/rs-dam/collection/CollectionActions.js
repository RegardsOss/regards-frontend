/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Collection entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class CollectionActions extends BasicListActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/collections`,
      entityPathVariable: 'collection_id',
      schemaTypes: {
        ENTITY: Schemas.COLLECTION,
        ENTITY_ARRAY: Schemas.COLLECTION_ARRAY,
      },
    })
  }
}
