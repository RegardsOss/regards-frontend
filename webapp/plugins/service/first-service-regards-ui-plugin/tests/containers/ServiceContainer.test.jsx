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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AccessDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ServiceContainer } from '../../src/containers/ServiceContainer'
import styles from '../../src/styles/styles'
import ServiceComponent from '../../src/components/ServiceComponent'

const context = buildTestContext(styles)

/**
 * Test case for {@link ServiceContainer}
 *
 * @author Its me
 */
describe('[first-service] Testing ServiceContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ServiceContainer)
  })
  it('should render self and sub components with one entity target', () => {
    const props = {
      pluginInstanceId: 'any',
      configuration: {
        // From plugin-info.json configuration
        static: {
          headerMessage: 'Test header',
        },
        dynamic: {
          separator: ';',
          endWithDot: false,
          fieldPath: 'label',
        },
      },
      runtimeTarget: {
        type: AccessDomain.RuntimeTargetTypes.ONE,
        entity: 'URN:DATA:FAKE',
        entitiesCount: 1,
        getFetchAction: () => {}, // stubs
        getReducePromise: () => {}, // stubs
      },
      getReducePromise: () => new Promise((resolve, reject) => resolve({ })),
    }
    const wrapper = shallow(<ServiceContainer {...props} />, { context })
    let component = wrapper.find(ServiceComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.equal(component.props().headerMessage, 'Test header', 'Component header message should correctly reported from configuration')
    assert.isTrue(component.props().loading, 'Component should currently be loading')
    // simulate loading done
    wrapper.setState({ loading: false, builtObjectsMessage: 'TestMessage#123' })
    wrapper.update() // must update state
    component = wrapper.find(ServiceComponent) // must update component wrapper instance
    assert.equal(component.props().headerMessage, 'Test header', 'Component header message should correctly reported from configuration')
    assert.isFalse(component.props().loading, 'Component should no longer be loading')
    assert.equal(component.props().builtObjectsMessage, 'TestMessage#123', 'Component message should be correctly reported from state')
  })
})
