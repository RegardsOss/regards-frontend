/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AuthenticationMenuContainer } from '../../../src/containers/user/AuthenticationMenuContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const router = require('react-router')

describe('[Menu] Testing AuthenticationMenuContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {} }),
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(AuthenticationMenuContainer)
  })
  it('should render properly', () => {
    shallow(<AuthenticationMenuContainer
      project="any"
      appName="any"
      isAuthenticated={false}
      toggleAuthenticationDialogOpen={() => { }}
    />, { context })
    shallow(<AuthenticationMenuContainer
      project="any"
      appName="any"
      isAuthenticated
      toggleAuthenticationDialogOpen={() => { }}
    />, { context })
  })
})
