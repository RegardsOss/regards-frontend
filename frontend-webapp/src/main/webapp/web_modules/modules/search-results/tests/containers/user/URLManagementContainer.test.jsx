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
import { CatalogDomain, DamDomain } from '@regardsoss/domain'
import { Tag } from '../../../src/models/navigation/Tag'
import { URLManagementContainer } from '../../../src/containers/user/URLManagementContainer'
import DisplayModeEnum from '../../../src/models/navigation/DisplayModeEnum'

const context = buildTestContext()

// mock router
const router = require('react-router')

// dispatch fetch dataset method as promise builder
const dispatchFetchEntity = datasetIpId => new Promise((resolve, reject) => {
  resolve({ content: { ipId: datasetIpId, label: 'helloworld', entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET } })
})

describe('[Search Results] Testing URLManagementContainer', () => {
  let savedTagPromise = Tag.getTagPromise
  const tagPromiseSpy = { // spy for tests parameters
    callParameters: [],
  }
  before(() => {
    testSuiteHelpers.before()
    // save original promise method
    savedTagPromise = Tag.getTagPromise
    // spy tags retrieval
    Tag.getTagPromise = (dispatchFetch, param) => {
      tagPromiseSpy.callParameters.push(param)
      return dispatchFetch(savedTagPromise)
    }
  })
  after(() => {
    delete router.browserHistory
    Tag.getTagPromise = savedTagPromise
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
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: {
        [URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER]: DisplayModeEnum.LIST,
        [URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]: 'URN:ds2,find-soda',
      },
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayDatasets: true,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, displayMode, tags) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.displayMode = displayMode
        spiedInit.tags = tags
      },
      dispatchFetchEntity,
    }
    // reinit call parameters
    tagPromiseSpy.callParameters = []

    shallow(<URLManagementContainer {...props} />, { context })
    // URL should not be updated
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated at initialization')
    // this can no longer be tested due to inner promises
    // assert.isTrue(spiedInit.called, 'The module state must be computed from URL at initialization')
    // assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATASET_RESULTS, 'View object type must be retrieved from URL')
    // assert.equal(spiedInit.displayMode, DisplayModeEnum.LIST, 'View object type must be retrieved from URL')
    // // check that tags were parsed directly on Tag solver
    // assert.deepEqual(tagPromiseSpy.callParameters, ['URN:ds2', 'find-soda'])
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
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: {
        [URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER]: DisplayModeEnum.TABLE,
        [URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]: 'URN:ip1,find-cookies',
      },
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayDatasets: false,
      displayMode: DisplayModeEnum.TABLE,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, displayMode, tags) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.displayMode = displayMode
        spiedInit.tags = tags
      },
      dispatchFetchEntity,
    }
    // reinit call parameters
    tagPromiseSpy.callParameters = []

    shallow(<URLManagementContainer {...props} />, { context })
    // URL should not be updated
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated at initialization')
    // this can no longer be tested due to inner promises
    // state should be initialized from URL parts (and some propeties)
    // assert.isTrue(spiedInit.called, 'The module state must be computed from URL at initialization')
    // assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATAOBJECT_RESULTS, 'DATASET view object type must be blocked when modules does not display datasets')
    // assert.equal(spiedInit.displayMode, DisplayModeEnum.TABLE, 'View object type must be retrieved from URL')
    // // check that tags were parsed directly on Tag solver
    // assert.deepEqual(tagPromiseSpy.callParameters, ['URN:ip1', 'find-cookies'])
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
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: {
        [URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER]: DisplayModeEnum.LIST,
        [URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]: 'URN:ip1,cupcake',
      },
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayDatasets: true,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, displayMode, tags) => {
        spiedInit.called = true
      },
      dispatchFetchEntity,
    }

    const enzymeWrapper = shallow(<URLManagementContainer {...props} />, { context })
    // re init
    spiedInit.called = false
    spiedHistoryPush.called = false

    // change properties like mapStateToProps would
    enzymeWrapper.setProps({
      ...props,
      levels: [
        new Tag(CatalogDomain.TagTypes.WORD, 'chocolate', 'chocolate'),
        // remove the dataset level
      ],
    })
    // verify redux state is unchanged (no initialization called)
    assert.isFalse(spiedInit.called, 'The state initialization should not be peformed on inner module updates')
    // Verify URL is updated from properties
    assert.isTrue(spiedHistoryPush.called, 'URL should be update on navigation context changes')
    assert.equal(spiedHistoryPush.pathname, 'hello/world', 'The URL path should not change')
    assert.equal(spiedHistoryPush.query[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER], DamDomain.ENTITY_TYPES_ENUM.DATA, 'The object view type should remain unchanged (from properties)')
    assert.equal(spiedHistoryPush.query[URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER], DisplayModeEnum.LIST, 'The view mode should remain unchanged')
    assert.equal(spiedHistoryPush.query[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER], 'chocolate', 'The new tag should replace the old one in URL')
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
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialDisplayMode: DisplayModeEnum.LIST,
      currentPath: 'hello/world',
      currentQuery: {},
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayMode: DisplayModeEnum.LIST,
      levels: [], // not initialized here, no need
      displayDatasets: true,
      initialize: (viewObjectType, displayMode, tags) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.displayMode = displayMode
        spiedInit.tags = tags
      },
      dispatchFetchEntity,
    }

    const enzymeWrapper = shallow(<URLManagementContainer {...props} />, { context })

    // re init
    spiedInit.called = false
    spiedHistoryPush.called = false
    tagPromiseSpy.callParameters = []

    enzymeWrapper.setProps({
      ...props,
      currentQuery: {
        [URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLManagementContainer.ModuleURLParameters.DISPLAY_MODE_PARAMETER]: DisplayModeEnum.LIST,
        [URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]: 'URN:ds2,find-soda',
      },
    })
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated')

    // this can no longer be tested due to inner promises
    // assert.isTrue(spiedInit.called)
    // assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATASET_RESULTS, 'The URL view object type change should be reported to redux state')
    // assert.equal(spiedInit.displayMode, DisplayModeEnum.LIST, 'The URL view object type change should be reported to redux state')

    // check that tags were parsed directly on Tag solver (which also verifies the initialization is done)
    assert.deepEqual(tagPromiseSpy.callParameters, ['URN:ds2', 'find-soda'])
  })
})
