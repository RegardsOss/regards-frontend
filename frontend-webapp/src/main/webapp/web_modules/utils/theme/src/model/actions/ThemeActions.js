/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class ThemeActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'common/theme',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/theme`,
      schemaTypes: {
        ENTITY: Schemas.THEME,
        ENTITY_ARRAY: Schemas.THEME_ARRAY,
      },
    })
  }
}
const instance = new ThemeActions()
export default instance
