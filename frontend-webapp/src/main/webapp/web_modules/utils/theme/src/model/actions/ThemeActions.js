/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class ThemeActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'common/theme',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-access/themes`,
      schemaTypes: {
        ENTITY: Schemas.THEME,
        ENTITY_ARRAY: Schemas.THEME_ARRAY,
      },
    })
  }
}
const instance = new ThemeActions()
export default instance
