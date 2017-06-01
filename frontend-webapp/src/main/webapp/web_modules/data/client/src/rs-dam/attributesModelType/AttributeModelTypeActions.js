import { BasicArrayActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Attribute model type entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class AttributeModelTypeActions extends BasicArrayActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/attributes/types`,
    })
  }
}
