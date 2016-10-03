import { defaultFluxStandardError } from "./FluxStandardError"
import Schemas from "./schemas/index"

export default {
  PROJECT_ACCOUNT: Schemas.PROJECT_ACCOUNT,
  PROJECT_ACCOUNT_ARRAY: Schemas.PROJECT_ACCOUNT_ARRAY,
  ACCOUNT: Schemas.ACCOUNT,
  ACCOUNT_ARRAY: Schemas.ACCOUNT_ARRAY,

  PROJECT: Schemas.PROJECT,
  PROJECT_ARRAY: Schemas.PROJECT_ARRAY,

  // TODO remove
  PROJECT_ADMIN: Schemas.PROJECT_ADMIN,
  PROJECT_ADMIN_ARRAY: Schemas.PROJECT_ADMIN_ARRAY,

  // Used to simulate an API response error
  defaultFluxStandardError
}
