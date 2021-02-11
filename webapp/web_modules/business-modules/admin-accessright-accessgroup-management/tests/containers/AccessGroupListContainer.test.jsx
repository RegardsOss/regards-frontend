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
import { spy } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupListContainer } from '../../src/containers/AccessGroupListContainer'

const context = buildTestContext()

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly loading component during fetching informations', () => {
    const fetchListSpy = spy()
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      accessGroupList: {},
      isFetching: true,
      // from mapDispatchToProps
      fetchAccessGroupList: fetchListSpy,
      deleteAccessGroup: () => {},

    }
    const enzymeWrapper = shallow(<AccessGroupListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isTrue(fetchListSpy.calledOnce)
  })

  it('Render properly', () => {
    const fetchListSpy = spy()
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      accessGroupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetching: false,
      // from mapDispatchToProps
      fetchAccessGroupList: fetchListSpy,
      deleteAccessGroup: () => {},

    }
    const enzymeWrapper = shallow(<AccessGroupListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isEmpty, 'Empty message should be displayed')
    assert.isTrue(fetchListSpy.calledOnce)
  })
})
