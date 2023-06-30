/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { spy, stub } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupFormContainer } from '../../src/containers/AccessGroupFormContainer'
import AccessGroupFormComponent from '../../src/components/AccessGroupFormComponent'

const context = buildTestContext()

/**
 * Tests for AccessGroupFormContainer
 *
 * @author Sébastien Binda
 */
describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly for creation', () => {
    const fetchAccessGroupSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessGroupName: undefined,
      },
      // from mapStateToProps
      currentAccessGroup: null,
      // from redux-form
      unregisterField: () => { },
      // from mapDispatchToProps
      fetchAccessGroup: fetchAccessGroupSpy,
      updateAccessGroup: () => { },
      createAccessGroup: () => { },
    }
    const enzymeWrapper = shallow(<AccessGroupFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isFalse(fetchAccessGroupSpy.calledOnce, 'No access group should be fetch for a creation mode')
  })

  it('Render properly a loading for edition', () => {
    const fetchAccessGroupSpy = stub().returns({})
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessGroupName: 'test',
      },
      // from mapStateToProps
      currentAccessGroup: undefined,
      // from redux-form
      unregisterField: () => { },
      // from mapDispatchToProps
      fetchAccessGroup: fetchAccessGroupSpy,
      updateAccessGroup: () => { },
      createAccessGroup: () => { },
    }
    const enzymeWrapper = shallow(<AccessGroupFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'A loading component should be displayed during access group retrieve')
    assert.isTrue(fetchAccessGroupSpy.calledOnce, 'The fetchAccessGroup method should be called for an edition mode')
  })

  it('Render properly for edition', () => {
    const fetchAccessGroupSpy = stub().returns({})
    const props = {
      // from router
      params: {
        project: 'lambda',
        mode: 'edit',
        accessGroupName: 'test',
      },
      // from mapStateToProps
      currentAccessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      // from redux-form
      unregisterField: () => { },
      // from mapDispatchToProps
      fetchAccessGroup: fetchAccessGroupSpy,
      updateAccessGroup: () => { },
      createAccessGroup: () => { },
    }
    const enzymeWrapper = shallow(<AccessGroupFormContainer {...props} />, { context })

    let loader = enzymeWrapper.find(LoadableContentDisplayDecorator)
    expect(loader).to.have.length(1)
    assert.isTrue(loader.props().isLoading, 'A loading component should not be displayed during access group retrieve')
    assert.isTrue(fetchAccessGroupSpy.calledOnce, 'The fetchAccessGroup method should not be called if group is already present')

    // Simulate loading finished
    enzymeWrapper.setState({
      isLoading: false,
    })

    // Check that the loader changed
    loader = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFalse(loader.props().isLoading, 'A loading component should not be displayed during access group retrieve')

    // Dive into the loader to check the children AccessGroupFormComponent rendered
    loader = loader.dive()
    const component = loader.find(AccessGroupFormComponent)
    assert.isTrue(component.length === 1, 'There should be a AccessGroupFormComponent rendered')
    assert.isFalse(component.prop('isDuplicating'), 'The component should not be rendered in duplication mode')
    assert.isFalse(component.prop('isCreating'), 'The component should not be rendered in creation mode')
    assert.isTrue(component.prop('isEditing'), 'The component should be rendered in editing mode')
  })
})
