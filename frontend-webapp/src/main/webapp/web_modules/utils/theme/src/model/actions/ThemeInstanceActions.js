/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class ThemeInstanceActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'common/theme',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access-instance/themes`,
      schemaTypes: {
        ENTITY: Schemas.THEME,
        ENTITY_ARRAY: Schemas.THEME_ARRAY,
      },
    })
  }
}
const instance = new ThemeInstanceActions()
export default instance
