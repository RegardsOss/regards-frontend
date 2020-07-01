/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccessDomain } from '@regardsoss/domain'
import { PluginsMetadataProvider } from '../../../../src/containers/admin/plugins/PluginsMetadataProvider'
import styles from '../../../../src/styles'
import { attributes } from '../../../dumps/attributes.dump'
import { pluginMeta35, pluginMeta2 } from '../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test PluginsMetadataProvider
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing PluginsMetadataProvider', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginsMetadataProvider)
  })
  it('should render correctly in initial state, then update children while fetching and provide them results', () => {
    const spyFetchPlugins = { count: 0 }
    const spyClearMeta = { count: 0 }
    const spyMarkAllMetaLoading = { count: 0, pluginIds: [] }
    // mock load plugin

    const props = {
      dataAttributeModels: attributes,
      children: <div test />,
      pluginsFetching: true,
      pluginsDefinition: {},
      pluginMetaPartitions: {},
      fetchPluginsDefinition: () => {
        spyFetchPlugins.count += 1
        return new Promise((resolve) => resolve({}))
      },
      clearMetadata: () => {
        spyClearMeta.count += 1
      },
      markAllMetaLoading: (pluginIds) => {
        spyMarkAllMetaLoading.count += 1
        spyMarkAllMetaLoading.pluginIds = pluginIds
      },
      markMetaLoaded: () => {},
      markMetaInError: () => {},
    }
    // 1 - Initialization
    const enzymeWrapper = shallow(<PluginsMetadataProvider {...props} />, { context })
    let componentWrapper = enzymeWrapper.find('div')
    assert.lengthOf(componentWrapper, 1, '1 - there should be child at init')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      test: true,
      fetchingMetadata: true,
      pluginsMetadata: [],
    }, '1 - child properties should be completed with plugins state')
    assert.equal(spyClearMeta.count, 1, '1 - clear metadata should have been invoked to clear any previous state')
    assert.equal(spyFetchPlugins.count, 1, '1 - fetch plugins list should have been called')
    // 2 - Mimic asynchronous server answer: list of plugins
    const props2 = {
      ...props,
      pluginsFetching: false,
      pluginsDefinition: {
        1: { // mimics error for that plugin
          content: {
            id: 1,
            name: 'my-plugin-1',
            type: AccessDomain.UI_PLUGIN_INFO_TYPES_ENUM.CRITERIA,
            sourcePath: 'somewhere/plugin1.js',
          },
        },
        2: { // corresponds with meta runtime (has not all attributes)
          content: {
            id: 2,
            name: 'my-plugin-2',
            type: AccessDomain.UI_PLUGIN_INFO_TYPES_ENUM.CRITERIA,
            sourcePath: 'somewhere/plugin2.js',
          },
        },
        35: {
          content: {
            id: 35,
            name: 'my-plugin-35',
            type: AccessDomain.UI_PLUGIN_INFO_TYPES_ENUM.CRITERIA,
            sourcePath: 'somewhere/plugin35.js',
          },
        },
      },
    }
    enzymeWrapper.setProps(props2)
    componentWrapper = enzymeWrapper.find('div')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      test: true,
      fetchingMetadata: true,
      pluginsMetadata: [],
    }, '2 - child should still be marked loading')
    assert.deepEqual(spyMarkAllMetaLoading, { count: 1, pluginIds: ['1', '2', '35'] }, '2 - Each plugin partition should have been initialized')
    // 3 - Mimic redux partitions state binding
    const props3 = {
      ...props2,
      pluginMetaPartitions: {
        1: {
          loading: true,
          hasError: false,
          data: null,
        },
        2: {
          loading: true,
          hasError: false,
          data: null,
        },
        35: {
          loading: true,
          hasError: false,
          data: null,
        },
      },
    }
    enzymeWrapper.setProps(props3)
    componentWrapper = enzymeWrapper.find('div')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      test: true,
      fetchingMetadata: true,
      pluginsMetadata: [],
    }, '3 - child should still be marked loading')
    // 4 - Mimic resolve plugin 35 (skipping here inner loading promise as it cannot be accessed in tests)
    const props4 = {
      ...props3,
      pluginMetaPartitions: {
        ...props3.pluginMetaPartitions,
        35: {
          loading: false,
          hasError: false,
          data: pluginMeta35,
        },
      },
    }
    enzymeWrapper.setProps(props4)
    // check child is still marked loading (until all plugins loading finished)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      test: true,
      fetchingMetadata: true,
      pluginsMetadata: [],
    }, '4 - child should still be marked loading')
    // 5 - skip one by one resolution to simulate a complete resolution of plugin1 (in error) and plugin2
    const props5 = {
      ...props4,
      pluginMetaPartitions: {
        1: { loading: false, hasError: true },
        2: { loading: false, hasError: false, data: pluginMeta2 },
        35: { loading: false, hasError: false, data: pluginMeta35 },
      },
    }
    enzymeWrapper.setProps(props5)
    // check child is no longer marked loading and plugins are correctly resolved / filtered
    componentWrapper = enzymeWrapper.find('div')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      test: true,
      fetchingMetadata: false,
      pluginsMetadata: [pluginMeta35],
    }, '5 - child should receive resolved plugins ')
  })
})
