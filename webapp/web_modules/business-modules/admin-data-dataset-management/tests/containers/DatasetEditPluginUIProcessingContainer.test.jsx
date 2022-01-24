/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sinon from 'sinon'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditPluginUIProcessingContainer } from '../../src/containers/DatasetEditPluginUIProcessingContainer'
import { DatasetEditPluginUIProcessingComponent } from '../../src/components/DatasetEditPluginUIProcessingComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Test DatasetEditPluginUIProcessingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditPluginUIProcessingContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
    assert.isDefined(DatasetEditPluginUIProcessingComponent)
  })

  it('should render properly', (done) => {
    const promiseFetchPluginConfigurationList = Promise.resolve({ error: false })
    const promiseFetchPluginMetaDataList = Promise.resolve({ error: false })
    const promiseFetchLinkPluginDataset = Promise.resolve({ error: false })
    const promiseFetchUIPluginConfigurationList = Promise.resolve({ error: false })
    const promiseFetchUIPluginDefinitionList = Promise.resolve({ error: false })
    const promiseFetchLinkUIPluginDataset = Promise.resolve({ error: false })
    const promiseFetchProcessingConfigurationList = Promise.resolve({ error: false })
    const promiseFetchProcessingMetadataList = Promise.resolve({ error: false })
    const promiseFetchLinkProcessingDataset = Promise.resolve({ error: false })

    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: '70',
        datasetIpId: 'URN:AIP:DATASET:project1:08ff5cb0-1f02-4918-8a9e-66247e52777f:V1',
      },
      // from mapStateToProps
      // Plugins
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      linkPluginDataset: DumpProvider.getFirstEntity('CatalogClient', 'LinkPluginDataset'),

      // Services UI
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      linkUIPluginDataset: DumpProvider.getFirstEntity('AccessProjectClient', 'LinkUIPluginDataset'),

      // Processing
      processingConfigurationList: DumpProvider.get('ProcessingClient', 'Processing'),
      processingMetadataList: DumpProvider.get('CommonClient', 'PluginMetaData'),

      // from mapDispatchToProps
      // Plugins
      fetchPluginConfigurationList: sinon.stub().callsFake(() => promiseFetchPluginConfigurationList),
      fetchPluginMetaDataList: sinon.stub().callsFake(() => promiseFetchPluginMetaDataList),
      fetchLinkPluginDataset: sinon.stub().callsFake(() => promiseFetchLinkPluginDataset),
      updateLinkPluginDataset: () => { },

      // Services UI
      fetchUIPluginConfigurationList: sinon.stub().callsFake(() => promiseFetchUIPluginConfigurationList),
      fetchUIPluginDefinitionList: sinon.stub().callsFake(() => promiseFetchUIPluginDefinitionList),
      fetchLinkUIPluginDataset: sinon.stub().callsFake(() => promiseFetchLinkUIPluginDataset),
      updateLinkUIPluginDataset: () => { },

      // Processing
      fetchProcessingConfigurationList: sinon.stub().callsFake(() => promiseFetchProcessingConfigurationList),
      fetchProcessingMetadataList: sinon.stub().callsFake(() => promiseFetchProcessingMetadataList),
      fetchLinkProcessingDataset: sinon.stub().callsFake(() => promiseFetchLinkProcessingDataset),
      updateLinkProcessingDataset: () => { },

      availableDependencies: [],
    }
    const wrapper = shallow(<DatasetEditPluginUIProcessingContainer
      {...props}
    />,
    { context },
    )

    const tasks = [
      promiseFetchPluginConfigurationList,
      promiseFetchPluginMetaDataList,
      promiseFetchLinkPluginDataset,
      promiseFetchUIPluginConfigurationList,
      promiseFetchUIPluginDefinitionList,
      promiseFetchLinkUIPluginDataset,
      promiseFetchProcessingConfigurationList,
      promiseFetchProcessingMetadataList,
      promiseFetchLinkProcessingDataset,
    ]

    Promise.all(tasks).then(() => {
      // Check loading component
      const loading = wrapper.find(LoadableContentDisplayDecorator)
      assert.equal(loading.length, 1, 'There should have a loading component rendered')
      assert.equal(loading.props().isLoading, false, 'Loading should be false')
      // Check child component
      const component = wrapper.find(DatasetEditPluginUIProcessingComponent)
      assert.equal(component.length, 1, 'There should have a DatasetEditPluginUIProcessingComponent rendered')
      assert.equal(component.props().currentDatasetIpId, props.params.datasetIpId, 'DatasetIpId should correctly be passed')
      assert.equal(component.props().currentDatasetId, props.params.datasetId, 'Function getCreateUrl should be correctly passed')
      assert.isNotEmpty(component.props().initialDatasetLinksByType, 'initialDatasetLinksByType should not be empty')
      done()
    })
  })
})
