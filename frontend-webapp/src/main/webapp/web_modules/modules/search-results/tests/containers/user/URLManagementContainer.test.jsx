/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from '../../../src/models/navigation/NavigationLevel'
import { URLManagementContainer } from '../../../src/containers/user/URLManagementContainer'

const context = buildTestContext()

// mock router
const router = require('react-router')


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
      initialContextLabel: 'any',
      initialViewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      currentPath: 'hello/world',
      currentQuery: { ds: 'ip1', tag: 'find:cookies', t: SearchResultsTargetsEnum.DATASET_RESULTS },
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, rootContextLabel, searchTag, dataset) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.rootContextLabel = rootContextLabel
        spiedInit.searchTag = searchTag
        spiedInit.dataset = dataset
      },
    }

    shallow(<URLManagementContainer {...props} />, { context })
    // URL should not be updated
    assert.isFalse(spiedHistoryPush.called, 'URL should not be updated at initialization')
    // state should be initialized from URL parts (and some propeties)
    assert.isTrue(spiedInit.called, 'The module state must be computed from URL at initialization')
    assert.equal(spiedInit.viewObjectType, SearchResultsTargetsEnum.DATASET_RESULTS, 'View object type must be retrieved from URL')
    assert.equal(spiedInit.rootContextLabel, props.initialContextLabel, 'Context label must be retrieved from properties')
    assert.equal(spiedInit.searchTag, 'find:cookies', 'Search tag must be retrieved from URL')
    assert.isDefined(spiedInit.dataset, 'Dataset must be retrieved from URL (with fake rebuild)')
    assert.equal(spiedInit.dataset.content.ipId, 'ip1', 'Dataset ipID must be retrieved from URL')
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
      currentPath: 'hello/world',
      currentQuery: { ds: 'ip1', tag: 'find:cookies', t: SearchResultsTargetsEnum.DATASET_RESULTS },
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, rootContextLabel, searchTag, dataset) => {
        spiedInit.called = true
      },
    }

    const enzymeWrapper = shallow(<URLManagementContainer {...props} />, { context })
    // re init
    spiedInit.called = false
    spiedHistoryPush.called = false

    // change properties like mapStateToProps would
    enzymeWrapper.setProps({
      ...props,
      levels: [
        NavigationLevel.buildRootLevel('any'),
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
      currentPath: 'hello/world',
      currentQuery: {},
      viewObjectType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
      levels: [], // not initialized here, no need
      initialize: (viewObjectType, rootContextLabel, searchTag, dataset) => {
        spiedInit.called = true
        spiedInit.viewObjectType = viewObjectType
        spiedInit.rootContextLabel = rootContextLabel
        spiedInit.searchTag = searchTag
        spiedInit.dataset = dataset
      },
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
    assert.isDefined(spiedInit.dataset)
    assert.equal(spiedInit.dataset.content.ipId, 'ip2', 'The URL dataset change should be reported to redux state')


    //   // TODO something like that
    //   assert.lengthOf(enzymeWrapper.find(URLManagementComponent), 1, 'The corresponding component should be rendered')
  })
})
