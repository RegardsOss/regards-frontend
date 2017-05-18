/*
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Attribute Model entities from backend server.
 * @author Léo Mieulet
 */
export default class AccessRightActions extends BasicPageableActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/accessrights`,
      schemaTypes: {
        ENTITY: Schemas.ACCESS_RIGHT,
        ENTITY_ARRAY: Schemas.ACCESS_RIGHT_ARRAY,
      },
    })
  }
}
