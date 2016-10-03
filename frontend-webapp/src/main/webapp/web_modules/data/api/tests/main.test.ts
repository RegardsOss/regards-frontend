import { assert } from "chai"
import Schemas from "../src/main"

describe('[COMMON] Testing schemas', () => {

  it('should exist', () => {
    assert.isNotNull(Schemas.PROJECT_ARRAY)
    assert.isNotNull(Schemas.PROJECT)
    assert.isNotNull(Schemas.PROJECT_ADMIN)
    assert.isNotNull(Schemas.PROJECT_ADMIN_ARRAY)
    assert.isNotNull(Schemas.PROJECT_ACCOUNT)
    assert.isNotNull(Schemas.PROJECT_ACCOUNT_ARRAY)
  })

})
