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
import UserContainer from '../../../src/containers/user/UserContainer'
import styles from '../../../src/styles/styles'

const router = require('react-router')

const context = buildTestContext(styles)

describe('[Menu] Testing UserContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {}, pathname: 'hello/world' }),
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(UserContainer)
  })
  it('should render correctly with complete conf', () => {
    const props = {
      project: 'any',
      appName: 'any',
      type: 'any',
      moduleConf: {
        title: 'any',
        contacts: 'any@any.fr',
        displayAuthentication: true,
        displayCartSelector: true,
        displayNotificationsSelector: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
        projectAboutPage: 'www.any.com',
      },
    }
    shallow(<UserContainer {...props} />, { context })
  })
  it('should render correctly with no conf', () => {
    const props = {
      project: 'any',
      appName: 'any',
      type: 'any',
    }
    shallow(<UserContainer {...props} />, { context })
  })
})
