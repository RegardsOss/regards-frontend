/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ServiceConfigurationFormContainer } from '../../src/containers/ServiceConfigurationFormContainer'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceConfigurationFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const fetchUIPluginConfigurationSpy = spy()
    const updateUIPluginConfigurationSpy = spy()
    const createUIPluginConfigurationSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        uiPluginId: DumpProvider.getFirstEntityKey('AccessProjectClient', 'UIPluginDefinition'),
        uiPluginConfId: DumpProvider.getFirstEntityKey('AccessProjectClient', 'UIPluginConfiguration'),
        mode: 'duplicate',
      },
      // from mapStateToProps
      uiPluginConfiguration: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginConfiguration'),
      // from mapDispatchToProps
      fetchUIPluginConfiguration: fetchUIPluginConfigurationSpy,
      updateUIPluginConfiguration: updateUIPluginConfigurationSpy,
      createUIPluginConfiguration: createUIPluginConfigurationSpy,
    }

    const enzymeWrapper = shallow(<ServiceConfigurationFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
    assert.isTrue(fetchUIPluginConfigurationSpy.calledOnce, 'Component should fetch entity on his initial componentDidMount')
    assert.isTrue(updateUIPluginConfigurationSpy.notCalled, 'Not called yet')
    assert.isTrue(createUIPluginConfigurationSpy.notCalled, 'Not called yet')
  })
})
