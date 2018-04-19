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
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { DumpProvider, buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditUIServicesContainer } from '../../src/containers/DatasetEditUIServicesContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditUIServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditUIServicesContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const fetchUIPluginConfigurationListSpy = spy()
    const fetchUIPluginDefinitionListSpy = spy()
    const fetchLinkUIPluginDatasetSpy = spy()
    const updateLinkUIPluginDatasetSpy = spy()

    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: '23',
        datasetIpId: 'URN:AIP:DATASET:project1:08ff5cb0-1f02-4918-8a9e-66247e52777f:V1',
      },
      // from mapStateToProps
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      linkUIPluginDataset: DumpProvider.getFirstEntity('AccessProjectClient', 'LinkUIPluginDataset'),
      // from mapDispatchToProps
      fetchUIPluginConfigurationList: fetchUIPluginConfigurationListSpy,
      fetchUIPluginDefinitionList: fetchUIPluginDefinitionListSpy,
      fetchLinkUIPluginDataset: fetchLinkUIPluginDatasetSpy,
      updateLinkUIPluginDataset: updateLinkUIPluginDatasetSpy,
    }

    const enzymeWrapper = shallow(<DatasetEditUIServicesContainer {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
    assert.isTrue(fetchUIPluginConfigurationListSpy.calledOnce, 'Fetched on initial render')
    assert.isTrue(fetchUIPluginDefinitionListSpy.calledOnce, 'Fetched on initial render')
    assert.isTrue(fetchLinkUIPluginDatasetSpy.calledOnce, 'Fetched on initial render')
    assert.isTrue(updateLinkUIPluginDatasetSpy.notCalled, 'Not called yet')
  })
})