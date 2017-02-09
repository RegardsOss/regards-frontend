import { assert } from 'chai'
import Schemas from '../src/main'

describe('[COMMON] Testing schemas', () => {
  it('should exist', () => {
    assert.isDefined(Schemas.PROJECT)
    assert.isDefined(Schemas.PROJECT_ARRAY)
    assert.isDefined(Schemas.ProjectConfiguration)

    assert.isDefined(Schemas.PROJECT_USER)
    assert.isDefined(Schemas.PROJECT_USER_ARRAY)
    assert.isDefined(Schemas.ProjectUserConfiguration)

    assert.isDefined(Schemas.ACCOUNT)
    assert.isDefined(Schemas.ACCOUNT_ARRAY)
    assert.isDefined(Schemas.AccountConfiguration)

    assert.isDefined(Schemas.ROLE)
    assert.isDefined(Schemas.ROLE_ARRAY)
    assert.isDefined(Schemas.RoleConfiguration)

    assert.isDefined(Schemas.PROJECT_CONNECTION)
    assert.isDefined(Schemas.PROJECT_CONNECTION_ARRAY)
    assert.isDefined(Schemas.ProjectConnectionConfiguration)

    assert.isDefined(Schemas.DATASOURCE)
    assert.isDefined(Schemas.DATASOURCE_ARRAY)
    assert.isDefined(Schemas.DatasourceConfiguration)

    assert.isDefined(Schemas.ACCESS_RIGHT)
    assert.isDefined(Schemas.ACCESS_RIGHT_ARRAY)
    assert.isDefined(Schemas.AccessRightConfiguration)

    assert.isDefined(Schemas.ACCESS_GROUP)
    assert.isDefined(Schemas.ACCESS_GROUP_ARRAY)
    assert.isDefined(Schemas.AccessGroupConfiguration)
  })
})
