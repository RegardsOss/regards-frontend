import { assert } from 'chai'
import Schemas from '../src/main'

describe('[COMMON] Testing schemas', () => {
  it('should exist', () => {
    assert.isDefined(Schemas.PROJECT)
    assert.isDefined(Schemas.PROJECT_ARRAY)

    assert.isDefined(Schemas.USER)
    assert.isDefined(Schemas.USER_ARRAY)

    assert.isDefined(Schemas.ACCOUNT)
    assert.isDefined(Schemas.ACCOUNT_ARRAY)
  })
})

