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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CatalogDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { Tag } from '../../../src/models/navigation/Tag'
import { URLManagementContainer } from '../../../src/containers/user/URLManagementContainer'

const context = buildTestContext()

// mock router
const router = require('react-router')

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

  it('Should initialize redux state from URL when in standalone mode', () => {
    // mocking router browser history to spy pushed data
    router.browserHistory = {
      getCurrentLocation: () => ({
        query: {
          [URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER]: 'a',
          [URLManagementContainer.ModuleURLParameters.TABLE_DISPLAY_MODE_PARAMETER]: 'b',
          [URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER]: 'c,d',
        },
        pathname: 'hello/world',
      }),
    }

    const props = {
      isExternallyDriven: false,
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialResultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayDatasets: true,
      resultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      initialContextTags: [],
      levels: [], // not initialized here, no need
      initialize: testSuiteHelpers.getSuccessDispatchStub({}),
      dispatchFetchEntity: testSuiteHelpers.getSuccessDispatchStub({}),
    }
    // reinit call parameters
    tagPromiseSpy.callParameters = []

    shallow(<URLManagementContainer {...props} />, { context })
    // check wrapper called tag promise to resolve tags from URL
    assert.deepEqual(tagPromiseSpy.callParameters, ['c', 'd'])
    // asynchronous calls cannot be easily tested
  })

  it('Should initialize redux state from initial configuration when externally driven', () => {
    // mocking router browser history to spy pushed data
    const spiedHistoryReplace = { count: 0 }
    router.browserHistory = {
      getCurrentLocation: () => ({ pathname: 'hello/world', query: {} }),
      replace: ({ pathname, query }) => {
        spiedHistoryReplace.count += 1
        spiedHistoryReplace.pathname = pathname
        spiedHistoryReplace.query = query
      },
    }

    const props = {
      isExternallyDriven: true,
      initialContextLabel: 'any',
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialResultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayDatasets: true,
      resultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      initialContextTags: [
        { type: CatalogDomain.TAG_TYPES_ENUM.WORD, label: 'b1', searchKey: 'c1' },
        { type: CatalogDomain.TAG_TYPES_ENUM.WORD, label: 'b2', searchKey: 'c2' }],
      levels: [], // not initialized here, no need
      initialize: testSuiteHelpers.getSuccessDispatchStub({}),
      dispatchFetchEntity: testSuiteHelpers.getSuccessDispatchStub({}),
    }

    // reinit call parameters
    tagPromiseSpy.callParameters = []
    shallow(<URLManagementContainer {...props} />, { context })
    assert.lengthOf(tagPromiseSpy.callParameters, 0, 'When externally driven, the content should not be resolved from URL')
  })

  it('Should update URL on redux state change', () => {
    // mocking router browser history to spy pushed data
    const spiedHistoryReplace = { called: false }
    router.browserHistory = {
      getCurrentLocation: () => ({ pathname: 'hello/world', query: {} }),
      replace: ({ pathname, query }) => {
        spiedHistoryReplace.called = true
        spiedHistoryReplace.pathname = pathname
        spiedHistoryReplace.query = query
      },
    }

    const props = {
      isExternallyDriven: false,
      initialContextLabel: 'any',
      initialViewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      initialResultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      displayDatasets: true,
      resultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      levels: [], // not initialized here, no need
      initialize: testSuiteHelpers.getSuccessDispatchStub({}),
      dispatchFetchEntity: testSuiteHelpers.getSuccessDispatchStub({}),
    }

    const enzymeWrapper = shallow(<URLManagementContainer {...props} />, { context })
    assert.isFalse(spiedHistoryReplace.called, 'URL Cannot be updated while redux state hasn\'t changed')

    // change properties like mapStateToProps would
    spiedHistoryReplace.called = false
    enzymeWrapper.setProps({
      ...props,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      resultsViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      levels: [
        new Tag(CatalogDomain.TAG_TYPES_ENUM.WORD, 'chocolate', 'chocolate'),
        // remove the dataset level
      ],
    })
    // Verify URL is updated from properties
    assert.isTrue(spiedHistoryReplace.called, 'URL should be update on navigation context changes')
    assert.equal(spiedHistoryReplace.pathname, 'hello/world', 'The URL path should not change')
    assert.equal(spiedHistoryReplace.query[URLManagementContainer.ModuleURLParameters.TARGET_PARAMETER], DamDomain.ENTITY_TYPES_ENUM.DATASET, 'The object view type should be updated (from properties)')
    assert.equal(spiedHistoryReplace.query[URLManagementContainer.ModuleURLParameters.TABLE_DISPLAY_MODE_PARAMETER], UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE, 'The view mode should be updated (from properties)')
    assert.equal(spiedHistoryReplace.query[URLManagementContainer.ModuleURLParameters.SEARCH_TAGS_PARAMETER], 'chocolate', 'The new tag should should be updated (from properties)')
  })
})
