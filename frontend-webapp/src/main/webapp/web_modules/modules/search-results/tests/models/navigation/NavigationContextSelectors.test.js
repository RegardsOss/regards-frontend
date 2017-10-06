/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { TagTypes } from '@regardsoss/domain/catalog'
import { Tag } from '../../../src/models/navigation/Tag'
import navigationContextActions from '../../../src/models/navigation/NavigationContextActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/navigation/NavigationContextReducer'
import navigationContextSelectors from '../../../src/models/navigation/NavigationContextSelectors'

const buildMockStore = (initState = DEFAULT_STATE) => ({
  'modules.search-results': {
    navigationContext: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-results'].navigationContext, action))

describe('[Search Results] Test graph context selectors', () => {
  it('Should select correctly the view object mode', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getViewObjectType(fakeStore), DEFAULT_STATE.viewObjectType, 'Should return initial view object type')
    fakeStore = mockReduce(fakeStore, navigationContextActions.changeViewObjectType('kikou'))
    assert.deepEqual(navigationContextSelectors.getViewObjectType(fakeStore), 'kikou', 'Should return the updated view object type')
  })

  it('Should select correctly the levels', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), DEFAULT_STATE.levels, 'Should return default levels')

    const tag = new Tag(TagTypes.WORD, 'Alibaba', 'Alibaba')
    fakeStore = mockReduce(fakeStore, navigationContextActions.addSearchTag(tag))
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), [tag])
  })
})
