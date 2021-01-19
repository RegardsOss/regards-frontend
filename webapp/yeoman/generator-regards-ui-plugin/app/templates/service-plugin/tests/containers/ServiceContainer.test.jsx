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
import { buildTestContext, testSuiteHelpers, uiPluginServiceTestHelpers } from '@regardsoss/tests-helpers'
import { ServiceContainer } from '../../src/containers/ServiceContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link ServiceContainer}
 *
 * @author <%= author %>
 */
describe('[<%= name %>] Testing ServiceContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ServiceContainer)
  })
  it('should render self and sub components', () => {
    const props = {
      pluginInstanceId: 'stub.id',
      // stub runtime configuration
      runtimeTarget: uiPluginServiceTestHelpers.buildOneElementTarget('test-data-entity-ip-id'),
      configuration: uiPluginServiceTestHelpers.buildConfiguration(),
      // user is optional, let's not provide it here
      // We also need to mock the methods provided by map dispatch to props, as we import component disconnected from redux
      getReducePromise: () => new Promise(() => { }),
      fetchSelectionThroughAction: () => new Promise(() => { }),
      //component props
    }
    shallow(<ServiceContainer {...props} />, { context })
    // TODO some tests here
  })
})
