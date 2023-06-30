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
import { assert } from 'chai'
import ListItem from 'material-ui/List'
import Tabs from 'material-ui/Tabs'
import Tab from 'material-ui/Tabs/Tab'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { DumpProvider, buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProcessingDomain } from '@regardsoss/domain'
import { CardActionsComponent } from '@regardsoss/components'
import { DatasetEditPluginUIProcessingComponent, DATASET_LINK_TYPE } from '../../src/components/DatasetEditPluginUIProcessingComponent'

import style from '../../src/styles'

const context = buildTestContext(style)

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditPluginUIProcessingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditPluginUIProcessingComponent)
    assert.isDefined(ListItem)
    assert.isDefined(Tabs)
    assert.isDefined(Tab)
  })

  it('should render properly', () => {
    const props = {
      project: 'testProject',
      initialDatasetLinksByType: {
        [DATASET_LINK_TYPE.PLUGIN]: {
          pluginConfs: DumpProvider.get('CommonClient', 'PluginConfiguration'),
          metadatas: DumpProvider.get('CommonClient', 'PluginMetaData'),
          links: DumpProvider.getFirstEntity('CatalogClient', 'LinkPluginDataset'),
        },
        [DATASET_LINK_TYPE.UI_SERVICES]: {
          pluginConfs: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
          metadatas: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
          links: DumpProvider.getFirstEntity('AccessProjectClient', 'LinkUIPluginDataset'),
        },
        [DATASET_LINK_TYPE.PROCESSING]: {
          pluginConfs: DumpProvider.get('ProcessingClient', 'Processing'),
          metadatas: DumpProvider.get('CommonClient', 'PluginMetaData'),
          links: {
            content: {
              datasetId: 'URN:AIP:DATASET:project1:9f81f52c-c9ba-4fe8-af1b-602797789cb3:V1',
              services: [{
                businessId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                label: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              }],
            },
          },
        },
      },

      backUrl: '#',
      onSubmit: () => { },
      currentDatasetIpId: 'URN:AIP:DATASET:project1:9f81f52c-c9ba-4fe8-af1b-602797789cb3:V1',
      currentDatasetId: '102',
      processingDependencies: true,
    }

    const wrapper = shallow(<DatasetEditPluginUIProcessingComponent {...props} />, { context })

    // We need to modify Processing confs like container do
    const newProcessingConfigurationList = map(props.initialDatasetLinksByType[DATASET_LINK_TYPE.PROCESSING].pluginConfs, (processingConfiguration) => {
      const newProcessingConfiguration = {
        content: {
          ...processingConfiguration.content.pluginConfiguration,
          label: ProcessingDomain.ProcessingUtils.getProcessingName(processingConfiguration),
        },
      }
      return newProcessingConfiguration
    })
    wrapper.setProps({
      ...props,
      initialDatasetLinksByType: {
        ...props.initialDatasetLinksByType,
        [DATASET_LINK_TYPE.PROCESSING]: {
          ...props.initialDatasetLinksByType[DATASET_LINK_TYPE.PROCESSING],
          pluginConfs: newProcessingConfigurationList,
        },
      },
    })

    assert.equal(wrapper.find(Tabs).length, 1, 'There should have a Tabs')
    assert.equal(wrapper.find(Tab).length, 3, 'There should have 3 Tab')
    const listItems = wrapper.find(ListItem).findWhere((n) => !isEmpty(n.props().nestedItems))
    assert.equal(listItems.length, 6, 'There should have 6 ListItem (6 Metadatas are used by confs)')

    // Check for buttons
    const cardActionsWrapper = wrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should have a card action component')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonLabel: 'dataset.form.pluginsUIProcessing.action.next',
      secondaryButtonLabel: 'dataset.form.pluginsUIProcessing.action.cancel',
      secondaryButtonUrl: props.backUrl,
    })
  })
  it('should render properly without processing', () => {
    const props = {
      project: 'testProject',
      initialDatasetLinksByType: {
        [DATASET_LINK_TYPE.PLUGIN]: {
          pluginConfs: DumpProvider.get('CommonClient', 'PluginConfiguration'),
          metadatas: DumpProvider.get('CommonClient', 'PluginMetaData'),
          links: DumpProvider.getFirstEntity('CatalogClient', 'LinkPluginDataset'),
        },
        [DATASET_LINK_TYPE.UI_SERVICES]: {
          pluginConfs: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
          metadatas: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
          links: DumpProvider.getFirstEntity('AccessProjectClient', 'LinkUIPluginDataset'),
        },
      },

      backUrl: '#',
      onSubmit: () => { },
      currentDatasetIpId: 'URN:AIP:DATASET:project1:9f81f52c-c9ba-4fe8-af1b-602797789cb3:V1',
      currentDatasetId: '102',
      processingDependencies: false,
    }

    const wrapper = shallow(<DatasetEditPluginUIProcessingComponent {...props} />, { context })

    assert.equal(wrapper.find(Tabs).length, 1, 'There should have a Tabs')
    assert.equal(wrapper.find(Tab).length, 2, 'There should have 2 Tab')
    const listItems = wrapper.find(ListItem).findWhere((n) => !isEmpty(n.props().nestedItems))
    assert.equal(listItems.length, 4, 'There should have 4 ListItem (4 Metadatas are used by confs)')

    // Check for buttons
    const cardActionsWrapper = wrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should have a card action component')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonLabel: 'dataset.form.pluginsUIProcessing.action.next',
      secondaryButtonLabel: 'dataset.form.pluginsUIProcessing.action.cancel',
      secondaryButtonUrl: props.backUrl,
    })
  })
})
