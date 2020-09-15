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
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditPluginUIProcessingContainer } from '../../src/containers/DatasetEditPluginUIProcessingContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Test DatasetEditPluginUIProcessingContainer', () => {
    before(testSuiteHelpers.before)
    after(testSuiteHelpers.after)

    if('should exists', () => {
        assert.isDefined(DatasetEditPluginUIProcessingContainer)
        assert.isDefined(LoadableContentDisplayDecorator)
    })
    it('Render properly', () => {
        const fetchPluginConfigurationListSpy = spy()
        const fetchPluginMetaDataListSpy = spy()
        const fetchLinkPluginDatasetSpy = spy()
        const updateLinkPluginDatasetSpy = spy()

        const fetchUIPluginConfigurationListSpy = spy()
        const fetchUIPluginDefinitionListSpy = spy()
        const fetchLinkUIPluginDatasetSpy = spy()
        const updateLinkUIPluginDatasetSpy = spy()

        const fetchProcessingConfigurationListSpy = spy()
        const fetchProcessingMetadataListSpy = spy()
        const fetchLinkProcessingDatasetSpy = spy()
        const updateLinkProcessingDatasetSpy = spy()

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
            processingMetadataList: DumpProvider.get('CommonClient', 'ProcessingMetaData'),
            
            // from mapDispatchToProps
            // Plugins
            fetchPluginConfigurationList: fetchPluginConfigurationListSpy,
            fetchPluginMetaDataList: fetchPluginMetaDataListSpy,
            fetchLinkPluginDataset: fetchLinkPluginDatasetSpy,
            updateLinkPluginDataset: updateLinkPluginDatasetSpy,

            // Services UI
            fetchUIPluginConfigurationList: fetchUIPluginConfigurationListSpy,
            fetchUIPluginDefinitionList: fetchUIPluginDefinitionListSpy,
            fetchLinkUIPluginDataset: fetchLinkUIPluginDatasetSpy,
            updateLinkUIPluginDataset: updateLinkUIPluginDatasetSpy,
            
            // Processing
            fetchProcessingConfigurationList: fetchProcessingConfigurationListSpy,
            fetchProcessingMetadataList: fetchProcessingMetadataListSpy,
            fetchLinkProcessingDataset: fetchLinkProcessingDatasetSpy,
            updateLinkProcessingDataset: updateLinkProcessingDatasetSpy
        }
        const enzymeWrapper = shallow(<DatasetEditPluginUIProcessingContainer {...props} />, { context })
        expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
        assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')

        // Plugins
        assert.isTrue(fetchPluginConfigurationListSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(fetchPluginMetaDataListSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(fetchLinkPluginDatasetSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(updateLinkPluginDatasetSpy.notCalled, 'Not called yet')

        // Services UI
        assert.isTrue(fetchUIPluginConfigurationListSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(fetchUIPluginDefinitionListSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(fetchLinkUIPluginDatasetSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(updateLinkUIPluginDatasetSpy.notCalled, 'Not called yet')
    
        // Processing
        assert.isTrue(fetchProcessingConfigurationListSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(fetchProcessingMetadataListSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(fetchLinkProcessingDatasetSpy.calledOnce, 'Fetched on initial render')
        assert.isTrue(updateLinkProcessingDatasetSpy.notCalled, 'Not called yet')
    })
})