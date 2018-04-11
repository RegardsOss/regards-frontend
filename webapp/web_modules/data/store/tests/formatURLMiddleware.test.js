/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import formatURLMiddleware from '../src/formatURLMiddleware'

const { CALL_API } = require('redux-api-middleware')

describe('[STORE DATA MANAGEMENT] Testing formatURLMiddleware', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(formatURLMiddleware)
    assert.isFunction(formatURLMiddleware)
  })

  it('keep valid URL unchanged', () => {
    const validURL = 'http://localhost:3333/user/cdpp/modules/12?t=dataobjects&u=pouet'
    const callResult = { updatedURL: undefined }
    const asserter = ((action) => {
      callResult.updatedURL = action[CALL_API].endpoint
    })
    formatURLMiddleware()(asserter)({
      [CALL_API]: {
        endpoint: validURL,
      },
    })
    assert.equal(callResult.updatedURL, validURL, 'The action endpoint should remain unchanged')
  })

  it('should update invalid URLs', () => {
    const invalidURL = 'http://localhost:3333/user /cdpp /modules/12?t=dataobjects&u=po uet'
    const validURL = 'http://localhost:3333/user%20/cdpp%20/modules/12?t=dataobjects&u=po%20uet'
    const callResult = { updatedURL: undefined }
    const asserter = ((action) => {
      callResult.updatedURL = action[CALL_API].endpoint
    })
    formatURLMiddleware()(asserter)({
      [CALL_API]: {
        endpoint: invalidURL,
      },
    })
    assert.equal(callResult.updatedURL, validURL, 'The action endpoint should remain unchanged')
  })
})
