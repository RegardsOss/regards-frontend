/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableLayout } from '@regardsoss/components'
import OAISFeatureManagerFiltersComponent from '../../src/components/OAISFeatureManagerFiltersComponent'
import styles from '../../src/styles'

// mock router
const router = require('react-router')

const context = buildTestContext(styles)

/**
 * Test OAISFeatureManagerFiltersComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISFeatureManagerFiltersComponent', () => {
  before(() => {
    // mock browser history for container
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {}, pathname: '' }),
      router: () => {},
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })
  it('should exists', () => {
    assert.isDefined(OAISFeatureManagerFiltersComponent)
  })

  it('should render correctly', () => {
    const props = {
      featureManagerFilters: {
        state: '',
        from: '',
        to: '',
        tags: [],
        providerIds: [],
        sessionOwner: '',
        session: '',
        categories: [],
        storages: [],
      },
      changeSessionFilter: () => {},
      changeSourceFilter: () => {},
      changeProviderIdFilter: () => {},
      changeFrom: () => {},
      changeTo: () => {},
    }
    const enzymeWrapper = shallow(<OAISFeatureManagerFiltersComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(TableLayout)
    assert.lengthOf(cardWrapper, 1, 'There should be a TableLayout')
  })
})
