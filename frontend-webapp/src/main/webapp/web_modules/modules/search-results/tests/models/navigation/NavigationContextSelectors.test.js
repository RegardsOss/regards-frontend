/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import navigationContextActions from '../../../src/models/navigation/NavigationContextActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/navigation/NavigationContextReducer'
import navigationContextSelectors from '../../../src/models/navigation/NavigationContextSelectors'
import NavigationLevel from '../../../src/models/navigation/NavigationLevel'

const buildMockStore = (initState = DEFAULT_STATE) => ({
  'modules.search-results': {
    navigationContext: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-results'].navigationContext, action))

describe('[Search Graph] Test graph context selectors', () => {
  it('Should select correctly the view object mode', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getViewObjectType(fakeStore), DEFAULT_STATE.viewObjectType, 'Should return initial view object type')
    fakeStore = mockReduce(fakeStore, navigationContextActions.changeViewObjectType('kikou'))
    assert.deepEqual(navigationContextSelectors.getViewObjectType(fakeStore), 'kikou', 'Should return the updated view object type')
  })

  it('Should select correctly the levels', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), DEFAULT_STATE.levels, 'Should return default levels')

    fakeStore = mockReduce(fakeStore, navigationContextActions.changeSearchTag('Alibaba'))
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), [NavigationLevel.buildSearchTagLevel('Alibaba')])
  })
})
