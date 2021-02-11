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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupAccessRightsContainer } from '../../src/containers/AccessGroupAccessRightsContainer'
import AccessRightListContainer from '../../src/containers/AccessRightListContainer'

const context = buildTestContext()

/**
 * Tests
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing AccessGroupAccessRightsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupAccessRightsContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly a loading component', () => {
    const fetchAccessGroupSpy = stub().returns({})
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),

      // from mapDispatchToProps
      fetchAccessGroup: fetchAccessGroupSpy,
    }
    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)

    assert.isTrue(fetchAccessGroupSpy.calledOnce, 'The fetch AccessGroup method should be fetch once.')

    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })

  it('Render properly', () => {
    const fetchAccessGroupSpy = stub().returns({})
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),

      // from mapDispatchToProps
      fetchAccessGroup: fetchAccessGroupSpy,
    }

    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, { context })

    // Simulate loading end
    enzymeWrapper.setState({
      loading: false,
    })
    let loader = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFalse(loader.props().isLoading, 'Loading should be false')
    assert.isFalse(loader.props().isContentError, 'Content error should be false')

    loader = loader.dive()
    const component = loader.find(AccessRightListContainer)
    assert.isTrue(component.length === 1, 'There should be a AccessRightListContainer rendered')
    assert.equal(component.props().accessGroup, props.accessGroup, 'The accessGroup passed to AccessRightListContainer should the same as AccessGroupAccessRightsContainer')
  })
})
