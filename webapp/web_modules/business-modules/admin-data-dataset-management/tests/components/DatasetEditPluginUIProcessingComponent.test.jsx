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
import { assert, expect } from 'chai'
import { spy } from 'sinon'
import { ListItem } from 'material-ui/List'
import { DumpProvider, buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DatasetEditPluginUIProcessingComponent } from '../../src/components/DatasetEditPluginUIProcessingComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditPluginUIProcessingComponent', () => {
    before(testSuiteHelpers.before)
    after(testSuiteHelpers.after)

    if('should exists', () => {
        assert.isDefined(DatasetEditPluginUIProcessingComponent)
        assert.isDefined(ListItem)
    })

    it('Render properly', () => {
        const handleSubmitSpy = spy ()
        const props = {
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

            backUrl: '#',
            handleSubmit: handleSubmitSpy,
            currentDatasetIpId: 'URN:AIP:DATASET:project1:9f81f52c-c9ba-4fe8-af1b-602797789cb3:V1',
            currentDatasetId: '102',

        }

        const enzymeWrapper = shallow(<DatasetEditPluginUIProcessingComponent {...props} />, { context })
        expect(enzymeWrapper.find(ListItem)).to.have.length(5)
        assert.isTrue(handleSubmitSpy.notCalled, 'Not called yet')
    })
})