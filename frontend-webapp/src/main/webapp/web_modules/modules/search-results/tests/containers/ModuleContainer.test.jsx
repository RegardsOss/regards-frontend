/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import ModuleComponent from '../../src/components/user/ModuleComponent'
import URLManagementContainer from '../../src/containers/user/URLManagementContainer'
import { ModuleContainer } from '../../src/containers/ModuleContainer'
import styles from '../../src/styles/styles'
import { DISPLAY_MODE_ENUM } from '../../src/definitions/DisplayModeEnum'

const context = buildTestContext(styles)

// mock router
const router = require('react-router')

describe('[Search Results] Testing ModuleContainer', () => {
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
    assert.isDefined(ModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      fetchAllModelsAttributes: () => { },
      attributeModels: {},
      moduleConf: {
        enableFacettes: true,
        enableDownload: true,
        displayMode: DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT,
        searchQuery: '',
        attributes: [],
        attributesRegroupements: [],
        breadcrumbInitialContextLabel: 'hello home',
      },
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ModuleComponent), 0, 'While loading, the view should be hidden')
    assert.lengthOf(enzymeWrapper.find(URLManagementContainer), 0, 'While loading, URL management container should not be installed')

    // When loading, no components / containers
    enzymeWrapper.instance().setState({ attributesFetching: false })
    enzymeWrapper.update() // wait for update

    assert.lengthOf(enzymeWrapper.find(ModuleComponent), 1, 'After loading, the view should be rendered')
    assert.lengthOf(enzymeWrapper.find(URLManagementContainer), 1, 'After loading, URL management container should be installed')
  })
})
