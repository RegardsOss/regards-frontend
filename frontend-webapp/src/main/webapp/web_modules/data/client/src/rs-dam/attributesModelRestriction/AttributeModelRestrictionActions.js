import { BasicArrayActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Attribute model restrictions entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class AttributeModelRestrictionsActions extends BasicArrayActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/attributes/restrictions`,
    })
  }
  getList(modelAttributeType) {
    this.entityEndpoint = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/attributes/restrictions?type=${modelAttributeType}`
    return super.fetchEntityList()
  }
}
