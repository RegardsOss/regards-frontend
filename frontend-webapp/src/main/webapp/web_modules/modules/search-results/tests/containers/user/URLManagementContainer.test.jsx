/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from '../../../src/models/navigation/NavigationLevel'
import DisplayModeEnum from '../../../src/models/navigation/DisplayModeEnum'
import { URLManagementContainer } from '../../../src/containers/user/URLManagementContainer'

const context = buildTestContext()

// mock router
const router = require('react-router')

// dispatch fetch dataset method as promise builder
const dispatchFetchDataset = datasetIpId => new Promise((resolve, reject) => {
  resolve({ content: { ipId: datasetIpId, label: 'helloworld' } })
})

describe('[Search Results] Testing URLManagementContainer', () => {
  before(testSuiteHelpers.before)
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(URLManagementContainer)
  })

  it('Should initialize redux state from URL', () => {
    // mocking router browser history to spy pushed data
    const spiedHistoryPush = { called: false }
    const spiedInit = { called: false }
    router.browserHistory = {
      push: ({ pathname, query }) => {
        spiedHistoryPush.called = true
      },
    }

    const props = {
      initialViewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: { ds: 'ip1', tag: 'find:cookies', t: SearchResultsTargetsEnum.DATASET_RESULTS },
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      displayDatasets: true,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, displayMode, searchTag, dataset) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.displayMode = displayMode
        spiedInit.searchTag = searchTag
        spiedInit.dataset = dataset
      },
      dispatchFetchDataset,
    }

    shallow(<URLManagementContainer {...props} />, { context })
    // URL should not be updated
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated at initialization')
    // state should be initialized from URL parts (and some propeties)
    assert.isTrue(spiedInit.called, 'The module state must be computed from URL at initialization')
    assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATASET_RESULTS, 'View object type must be retrieved from URL')
    assert.equal(spiedInit.searchTag, 'find:cookies', 'Search tag must be retrieved from URL')
    // dataset retrieval cannot be tested here (asynchronous promise)
  })

  it('Should block target type dataset from URL when modules is not displaying datasets', () => {
    // mocking router browser history to spy pushed data
    const spiedHistoryPush = { called: false }
    const spiedInit = { called: false }
    router.browserHistory = {
      push: ({ pathname, query }) => {
        spiedHistoryPush.called = true
      },
    }

    const props = {
      initialViewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: { ds: 'ip1', tag: 'find:cookies', t: SearchResultsTargetsEnum.DATASET_RESULTS },
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      displayDatasets: false,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, displayMode, searchTag, dataset) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.displayMode = displayMode
        spiedInit.searchTag = searchTag
        spiedInit.dataset = dataset
      },
      dispatchFetchDataset,
    }

    shallow(<URLManagementContainer {...props} />, { context })
    // URL should not be updated
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated at initialization')
    // state should be initialized from URL parts (and some propeties)
    assert.isTrue(spiedInit.called, 'The module state must be computed from URL at initialization')
    assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATAOBJECT_RESULTS, 'DATASET view object type must be blocked when modules does not display datasets')
  })

  it('Should update URL on redux state change', () => {
    // mocking router browser history to spy pushed data
    const spiedHistoryPush = { called: false }
    const spiedInit = { called: false }
    router.browserHistory = {
      push: ({ pathname, query }) => {
        spiedHistoryPush.called = true
        spiedHistoryPush.pathname = pathname
        spiedHistoryPush.query = query
      },
    }

    const props = {
      initialContextLabel: 'any',
      initialViewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: { ds: 'ip1', tag: 'find:cookies', t: SearchResultsTargetsEnum.DATASET_RESULTS },
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      displayDatasets: true,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, displayMode, searchTag, dataset) => {
        spiedInit.called = true
      },
      dispatchFetchDataset,
    }

    const enzymeWrapper = shallow(<URLManagementContainer {...props} />, { context })
    // re init
    spiedInit.called = false
    spiedHistoryPush.called = false

    // change properties like mapStateToProps would
    enzymeWrapper.setProps({
      ...props,
      levels: [
        NavigationLevel.buildSearchTagLevel('find:chocolate'),
        // remove the dataset level
      ],
    })
    // verify redux state is unchanged (no initialization called)
    assert.isFalse(spiedInit.called, 'The state initialization should not be peformed on inner module updates')
    // Verify URL is updated from properties
    assert.isTrue(spiedHistoryPush.called, 'URL should be update on navigation context changes')
    assert.equal(spiedHistoryPush.pathname, 'hello/world', 'The URL path should not change')
    assert.equal(spiedHistoryPush.query.t, SearchResultsTargetsEnum.DATAOBJECT_RESULTS, 'The object view type should remain unchanged (from properties)')
    assert.equal(spiedHistoryPush.query.tag, 'find:chocolate', 'The search tag should be updated in URL')
    assert.isUndefined(spiedHistoryPush.query.dataset, 'Dataset context should not be in URL anymore')
  })
  it('should report URL changes to redux state', () => {
    // mocking router browser history to spy pushed data
    const spiedHistoryPush = { called: false }
    const spiedInit = { called: false }
    router.browserHistory = {
      push: ({ pathname, query }) => {
        spiedHistoryPush.called = true
      },
    }

    const props = {
      initialContextLabel: 'any',
      initialViewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: {},
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      displayDatasets: true,
      initialize: (viewObjectType, displayMode, searchTag, dataset) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.displayMode = displayMode
        spiedInit.searchTag = searchTag
        spiedInit.dataset = dataset
      },
      dispatchFetchDataset,
    }

    const enzymeWrapper = shallow(<URLManagementContainer {...props} />, { context })

    // re init
    spiedInit.called = false
    spiedHistoryPush.called = false

    enzymeWrapper.setProps({
      ...props,
      currentQuery: { ds: 'ip2', tag: 'find:soda', t: SearchResultsTargetsEnum.DATASET_RESULTS },
    })
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated')
    assert.isTrue(spiedInit.called)

    assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATASET_RESULTS, 'The URL view object type change should be reported to redux state')
    assert.equal(spiedInit.searchTag, 'find:soda', 'The URL search tag should be reported to redux state')
    // dataset cannot be tested here (asynchronous resolution)
  })
})
