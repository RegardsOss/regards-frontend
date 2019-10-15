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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { modulesHelper } from '@regardsoss/modules-api'
import { UIDomain } from '@regardsoss/domain'
import FormComponent from '../../../src/components/user/FormComponent'
import { FormContainer } from '../../../src/containers/user/FormContainer'
import PluginsConfigurationProvider from '../../../src/containers/user/PluginsConfigurationProvider'
import styles from '../../../src/styles'
import { conf1 } from '../../dump/configuration.dump'

const context = buildTestContext(styles)
// mock router
const router = require('react-router')

/**
 * Test FormContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH FORM] Testing FormContainer', () => {
  before(() => {
    testSuiteHelpers.before()
    // mock browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ pathname: 'any', query: { a: 'A' } }),
      replace: () => {},
    }
    // mock base 64 methods
    root.atob = text => text
    root.btoa = text => text
  })
  after(() => {
    testSuiteHelpers.after()
    delete router.browserHistory
    delete root.atob
    delete root.btoa
  })

  it('should exists', () => {
    assert.isDefined(FormContainer)
  })
  it('should render correctly, taking in account configuration restrictions', () => {
    let clearAllCalledCount = 0
    let publishAllCalledCount = 0
    const props = {
      id: 8,
      project: 'testProject',
      appName: 'testApp',
      type: 'any',
      description: 'Test',
      moduleConf: conf1,
      // incomplete results context, jsut to add some restrictions and check they
      // are correctly transferred to PluginsConfigurationProvider
      resultsContext: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            criteria: {
              // q parts should be retrieved from here
              configurationRestrictions: [{
                requestParameters: {
                  a: 'any.a.value', // should be ignored
                  q: 'datasetModelIds:URN:DATASET:MyDataset:V1',
                },
              }, {
                requestParameters: {
                  b: 'any.b.value', // should be ignored
                  q: 'tag:myTag',
                },
              }],
              // other criteria should be ignored
              contextTags: [{
                requestParameters: {
                  a: 'any.a.value', // should be ignored
                  q: 'tag:myTag2',
                },
              }],
            },
          },
        },
      },
      pluginsState: {
        p1: {
          state: {
            something: true,
          },
          query: 'something1',
        },
        p2: {
          state: {
            somethingElse: 'abcde',
            more: 6,
          },
          query: 'something2',
        },
      },
      onSearch: () => {},
      dispatchClearAll: () => {
        clearAllCalledCount += 1
      },
      publishAllStates: () => {
        publishAllCalledCount += 1
        return new Promise(resolve => resolve())
      },
    }
    const enzymeWrapper = shallow(<FormContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FormComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
    }, 'Component should define the expected properties')
    // Check built configuration query (q parts from configurationRestrictions criteria )
    const expectedQuery = 'datasetModelIds:URN:DATASET:MyDataset:V1 AND tag:myTag'
    assert.deepEqual(enzymeWrapper.state(), {
      configurationQuery: expectedQuery,
      pluginsProps: { initialQuery: expectedQuery },
    }, 'State should be correctly built for current results context')

    // Check parameters passed to PluginsConfiguration provider
    const pluginConfProvider = enzymeWrapper.find(PluginsConfigurationProvider)
    assert.lengthOf(pluginConfProvider, 1, 'There should be the plugin configuration provider')
    testSuiteHelpers.assertWrapperProperties(pluginConfProvider, {
      criteria: props.moduleConf.criterion,
      contextQuery: enzymeWrapper.state().configurationQuery,
      preview: props.moduleConf.preview,
    }, 'PluginsConfigurationProvider properties should be correctly provided ')

    // Check FormComponent is correctly rendered
    const formComponent = enzymeWrapper.find(FormComponent)
    assert.lengthOf(formComponent, 1, 'There should be the form component provider')
    testSuiteHelpers.assertWrapperProperties(formComponent, {
      pluginsProps: enzymeWrapper.state().pluginsProps,
      onSearch: enzymeWrapper.instance().onSearch,
      onClearAll: enzymeWrapper.instance().onClearAll,
      ...modulesHelper.getReportedUserModuleProps(props),
    })

    // Check mounting did publish states ()
    assert.equal(publishAllCalledCount, 1, 'publish plugins state should have been called for initialization')
    assert.equal(clearAllCalledCount, 0, 'clear plugins state should not have been called yet')

    // Check search will save in URL and local storage the current states
    enzymeWrapper.instance().onSearch()
    const savedData = root.localStorage.getItem('testApp/testProject/seach-form:8') // concat, from props
    assert.equal(savedData, JSON.stringify(props.pluginsState), 'Plugin state should be correctled serialized and stored')

    // Check clear will clear plugins state, update URL and state
    enzymeWrapper.instance().onClearAll()
    assert.equal(clearAllCalledCount, 1, 'clear plugins state should have been called')
    const clearedData = root.localStorage.getItem('testApp/testProject/seach-form:8')
    assert.isNotOk(clearedData, 'Plugin state should be have been cleared then stored')
  })
  it('should not manage plugins state, URL and local storage in preview mode', () => {
    let clearAllCalledCount = 0
    let publishAllCalledCount = 0
    const props = {
      id: 8,
      project: 'testProject',
      appName: 'testApp',
      type: 'any',
      description: 'Test',
      moduleConf: {
        ...conf1,
        preview: true,
      },
      resultsContext: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            criteria: {
              // q parts should be retrieved from here
              configurationRestrictions: [{
                requestParameters: {
                  a: 'any.a.value', // should be ignored
                  q: 'datasetModelIds:URN:DATASET:MyDataset:V1',
                },
              }, {
                requestParameters: {
                  b: 'any.b.value', // should be ignored
                  q: 'tag:myTag',
                },
              }],
              // other criteria should be ignored
              contextTags: [{
                requestParameters: {
                  a: 'any.a.value', // should be ignored
                  q: 'tag:myTag2',
                },
              }],
            },
          },
        },
      },
      pluginsState: {
        p1: {
          state: {
            something: true,
          },
          query: 'something1',
        },
        p2: {
          state: {
            somethingElse: 'abcde',
            more: 6,
          },
          query: 'something2',
        },
      },
      onSearch: () => {},
      dispatchClearAll: () => {
        clearAllCalledCount += 1
      },
      publishAllStates: () => {
        publishAllCalledCount += 1
        return new Promise(resolve => resolve())
      },
    }
    const enzymeWrapper = shallow(<FormContainer {...props} />, { context })
    // Check mounting did publish states ()
    assert.equal(publishAllCalledCount, 0, 'publish plugins state should not have been called for initialization')
    assert.equal(clearAllCalledCount, 0, 'clear plugins state should not have been called')

    // Check search will save in URL and local storage the current states
    enzymeWrapper.instance().onSearch()
    const savedData = root.localStorage.getItem('testApp/testProject/seach-form:8') // concat, from props
    assert.isNotOk(savedData, 'Plugin state should not be pushed to local storage')

    // Check clear will clear plugins state, update URL and state
    enzymeWrapper.instance().onClearAll()
    assert.equal(clearAllCalledCount, 0, 'clear plugins state should not be called')
  })
})
