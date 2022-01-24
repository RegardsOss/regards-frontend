/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { assert } from 'chai'
import {
  PROJECT, PROJECT_ARRAY, ProjectConfiguration, PROJECT_USER, PROJECT_USER_ARRAY,
  ProjectUserConfiguration, ACCOUNT, ACCOUNT_ARRAY, AccountConfiguration, ROLE,
  ROLE_ARRAY, RoleConfiguration, PROJECT_CONNECTION, PROJECT_CONNECTION_ARRAY,
  ProjectConnectionConfiguration, DATASOURCE, DATASOURCE_ARRAY, DatasourceConfiguration,
  ACCESS_RIGHT, ACCESS_RIGHT_ARRAY, AccessRightConfiguration, ACCESS_GROUP,
  ACCESS_GROUP_ARRAY, AccessGroupConfiguration,
} from '../src/main'

describe('[COMMON] Testing schemas', () => {
  it('should exist', () => {
    assert.isDefined(PROJECT)
    assert.isDefined(PROJECT_ARRAY)
    assert.isDefined(ProjectConfiguration)

    assert.isDefined(PROJECT_USER)
    assert.isDefined(PROJECT_USER_ARRAY)
    assert.isDefined(ProjectUserConfiguration)

    assert.isDefined(ACCOUNT)
    assert.isDefined(ACCOUNT_ARRAY)
    assert.isDefined(AccountConfiguration)

    assert.isDefined(ROLE)
    assert.isDefined(ROLE_ARRAY)
    assert.isDefined(RoleConfiguration)

    assert.isDefined(PROJECT_CONNECTION)
    assert.isDefined(PROJECT_CONNECTION_ARRAY)
    assert.isDefined(ProjectConnectionConfiguration)

    assert.isDefined(DATASOURCE)
    assert.isDefined(DATASOURCE_ARRAY)
    assert.isDefined(DatasourceConfiguration)

    assert.isDefined(ACCESS_RIGHT)
    assert.isDefined(ACCESS_RIGHT_ARRAY)
    assert.isDefined(AccessRightConfiguration)

    assert.isDefined(ACCESS_GROUP)
    assert.isDefined(ACCESS_GROUP_ARRAY)
    assert.isDefined(AccessGroupConfiguration)
  })
})
