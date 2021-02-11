/* eslint-disable react-perf/jsx-no-new-object-as-prop */
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
 **/
import get from 'lodash/get'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { PluginConfiguration } from '@regardsoss/api'
import PluginLoader from '../../src/containers/PluginLoader'
import { PluginProvider } from '../../src/containers/PluginProvider'

const context = buildTestContext()

/**
 * Tests for PluginProvider
 * @author Sébastien Binda
 */
describe('[PLUGINS] Testing PluginProvider', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const testCases = [{
    label: 'Should load plugin definition then display result in nominal case',
    initialPartition: {
      loading: false,
      hasError: false,
      data: null,
    },
    fetchResult: {
      payload: {
        entities: {
          [PluginConfiguration.normalizrKey]: {
            25: {
              content: {
                id: 25,
                name: 'plugin-test',
                type: 'CRITERIA',
                sourcePath: '/test/plugin.js',
              },
            },
          },
        },
      },
    },
    expectsFetch: true,
    expectsInitially: {
      loading: true,
      error: false,
    },
    expectAfterFetch: {
      loading: false,
      error: false,
    },
  }, {
    label: 'Should load plugin definition then display error when fetching failed',
    initialPartition: {
      loading: false,
      hasError: false,
      data: null,
    },
    fetchResult: { payload: { error: true } },
    expectsFetch: true,
    expectsInitially: {
      loading: true,
      error: false,
    },
    expectAfterFetch: {
      loading: false,
      error: true,
    },
  }, {
    label: 'Should render correctly when another instance is fetching same ID',
    initialPartition: {
      loading: true,
      hasError: false,
      data: null,
    },
    expectsInitially: {
      loading: true,
      error: false,
    },
  }, {
    label: 'Should render correctly when another instance has fetched same ID',
    initialPartition: {
      loading: false,
      hasError: false,
      data: {
        content: {
          id: 25,
          name: 'plugin-test',
          type: 'CRITERIA',
          sourcePath: '/test/plugin.js',
        },
      },
    },
    expectsInitially: {
      loading: false,
      error: false,
    },
  }, {
    label: 'Should render correctly when another instance has failed fetching same ID',
    initialPartition: {
      loading: false,
      hasError: true,
      data: null,
    },
    expectsInitially: {
      loading: false,
      error: true,
    },
  },
  ]

  testCases.forEach(({
    label, initialPartition, fetchResult,
    expectsInitially, expectsFetch, expectAfterFetch,
  }) => it(label, (done) => {
    const fetchPluginSpy = { count: 0 }
    const markLoadingSpy = { count: 0 }
    const markLoadedSpy = { count: 0 }
    const markFailedSpy = { count: 0 }
    const fetchPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchResult)
      }, 5)
    })
    const props = {
      pluginInstanceId: 'any-instance-id',
      pluginId: 25,
      pluginConf: {},
      pluginProps: {},
      displayPlugin: true,
      loadingComponent: <div id="loading.div" />,
      errorComponent: <div id="error.div" />,
      pluginPartition: initialPartition,
      fetchPlugin: (pluginId) => {
        fetchPluginSpy.pluginId = pluginId
        fetchPluginSpy.count += 1
        return fetchPromise
      },
      onPluginLoadingStarted: (partitionKey) => {
        markLoadingSpy.count += 1
        markLoadingSpy.partitionKey = partitionKey
      },
      onPluginLoadingDone: (partitionKey, data) => {
        markLoadedSpy.count += 1
        markLoadedSpy.partitionKey = partitionKey
        markLoadedSpy.data = data
      },
      onPluginLoadingFailed: (partitionKey) => {
        markFailedSpy.count += 1
        markFailedSpy.partitionKey = partitionKey
      },
    }
    const enzymeWrapper = shallow(<PluginProvider {...props} />, { context })

    function expectDisplaying({ error, loading }, cycleMessage, pluginDefinition) {
      const loadingWrapper = enzymeWrapper.findWhere((n) => n.props().id === 'loading.div')
      const errorWrapper = enzymeWrapper.findWhere((n) => n.props().id === 'error.div')
      const childWrapper = enzymeWrapper.find(PluginLoader)
      if (error) {
        assert.lengthOf(loadingWrapper, 0, `Loading should be hidden ${cycleMessage}`)
        assert.lengthOf(errorWrapper, 1, `Error should be displayed ${cycleMessage}`)
        assert.lengthOf(childWrapper, 0, `Child plugin loader should be hidden ${cycleMessage}`)
      } else if (loading) {
        assert.lengthOf(loadingWrapper, 1, `Loading should be displayed ${cycleMessage}`)
        assert.lengthOf(errorWrapper, 0, `Error should be hidden ${cycleMessage}`)
        assert.lengthOf(childWrapper, 0, `Child plugin loader should be hidden ${cycleMessage}`)
      } else {
        assert.lengthOf(loadingWrapper, 0, `Loading should be hidden ${cycleMessage}`)
        assert.lengthOf(errorWrapper, 0, `Error should be hidden ${cycleMessage}`)
        assert.lengthOf(childWrapper, 1, `Child plugin loader should be displayed ${cycleMessage}`)
        testSuiteHelpers.assertWrapperProperties(childWrapper, {
          pluginInstanceId: props.pluginInstanceId,
          pluginName: pluginDefinition.content.name,
          pluginPath: pluginDefinition.content.sourcePath,
          displayPlugin: props.displayPlugin,
          pluginConf: props.pluginConf,
          pluginProps: props.pluginProps,
          onErrorCallback: props.onErrorCallback,
          loadingComponent: props.loadingComponent,
          errorComponent: props.errorComponent,
        })
      }
    }

    // 1 - Do initial expectations
    expectDisplaying(expectsInitially, 'at initialization', props.pluginPartition.data)
    // 2 - When the component should fetch, register to the resolution
    // promise to step 3 (and check fetch was called). Otherwise exit
    if (expectsFetch) {
      assert.deepEqual(fetchPluginSpy, {
        pluginId: props.pluginId,
        count: 1,
      }, 'Fetch should have been called once with the right parameters')
      assert.deepEqual(markLoadingSpy, {
        partitionKey: props.pluginId,
        count: 1,
      }, 'Mark loading should have been called once with the right parameters')
      assert.equal(markLoadedSpy.count, 0, 'Mark loaded should not have been called')
      assert.equal(markFailedSpy.count, 0, 'Mark failed should not have been called')
      const afterFetch = () => {
        // 3 - according with test post state, check what was called
        const nextProps = {
          ...props,
        }
        if (expectAfterFetch.error) {
          assert.equal(fetchPluginSpy.count, 1, 'Fetch should not have been called another time')
          assert.equal(markLoadingSpy.count, 1, 'Mark loading should not have been called another time')
          assert.equal(markLoadedSpy.count, 0, 'Mark loaded should not have been called')
          assert.deepEqual(markFailedSpy, {
            partitionKey: props.pluginId,
            count: 1,
          }, 'Mark failed should have been called with the right parameters')
          // update props accordingly
          nextProps.pluginPartition = {
            loading: false,
            hasError: true,
            data: null,
          }
        } else {
          assert.equal(fetchPluginSpy.count, 1, 'Fetch should not have been called another time')
          assert.equal(markLoadingSpy.count, 1, 'Mark loading should not have been called another time')
          const expectedDef = get(fetchResult, `payload.entities.${PluginConfiguration.normalizrKey}[${props.pluginId}]`)
          assert.deepEqual(markLoadedSpy, {
            count: 1,
            partitionKey: props.pluginId,
            data: expectedDef,
          }, 'Mark loaded should not have been called')
          assert.equal(markFailedSpy.count, 0, 'Mark failed should not have been called')
          nextProps.pluginPartition = {
            loading: false,
            hasError: false,
            data: expectedDef,
          }
        }
        // finally, check post assertions on graphical component, by simulating redux loopback
        enzymeWrapper.setProps(nextProps)
        expectDisplaying(expectAfterFetch, 'after fetching', nextProps.pluginPartition.data)
        done()
      }
      fetchPromise.then(afterFetch).catch(afterFetch)
    } else {
      // 2.b - Check fetch and partition systems was left unchanged and exit
      assert.equal(fetchPluginSpy.count, 0, 'Fetch should not have been performed')
      assert.equal(markLoadingSpy.count, 0, 'Mark loading should not have been performed')
      assert.equal(markLoadedSpy.count, 0, 'Mark loaded should not have been called')
      assert.equal(markFailedSpy.count, 0, 'Mark failed should not have been called')
      done()
    }
  }))
})
