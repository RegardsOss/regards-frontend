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
import { spy } from 'sinon'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ServiceConfigurationListContainer } from '../../src/containers/ServiceConfigurationListContainer'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceConfigurationListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const fetchUIPluginConfigurationListSpy = spy()
    const fetchUIPluginDefinitionSpy = spy()
    const updateUIPluginConfigurationSpy = spy()
    const deleteUIPluginConfigurationSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        uiPluginId: DumpProvider.getFirstEntityKey('AccessProjectClient', 'UIPluginDefinition'),
      },
      // from mapStateToProps
      uiPluginDefinition: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginDefinition'),
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      // from mapDispatchToProps
      fetchUIPluginConfigurationList: fetchUIPluginConfigurationListSpy,
      fetchUIPluginDefinition: fetchUIPluginDefinitionSpy,
      updateUIPluginConfiguration: updateUIPluginConfigurationSpy,
      deleteUIPluginConfiguration: deleteUIPluginConfigurationSpy,
    }

    const enzymeWrapper = shallow(<ServiceConfigurationListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
    assert.isTrue(fetchUIPluginConfigurationListSpy.calledOnce, 'Component should fetch entity on his initial componentDidMount')
    assert.isTrue(fetchUIPluginDefinitionSpy.calledOnce, 'Component should fetch entity on his initial componentDidMount')
    assert.isTrue(updateUIPluginConfigurationSpy.notCalled, 'Not called yet')
    assert.isTrue(deleteUIPluginConfigurationSpy.notCalled, 'Not called yet')
  })
})
