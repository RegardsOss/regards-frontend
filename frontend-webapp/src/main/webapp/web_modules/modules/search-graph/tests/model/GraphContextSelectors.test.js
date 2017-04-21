/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import graphContextActions from '../../src/model/graph/GraphContextActions'
import reduce, { REDUCER_PATH } from '../../src/model/graph/GraphContextReducers'
import graphContextSelectors from '../../src/model/graph/GraphContextSelectors'

const buildMockStore = (initState = reduce(undefined, {})) => ({
  'modules.search-graph': {
    [REDUCER_PATH]: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-graph'][REDUCER_PATH], action))

describe('[Search Graph] Test graph context selectors', () => {
  it('Should select correctly selection path', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(graphContextSelectors.getSelectionPath(fakeStore), [], 'Should return initial selection')
    assert.isNotOk(graphContextSelectors.getSelectionForLevel(fakeStore, 0), 'No selection should be defined')
    // reduce selection and check it is correctly selected by level
    fakeStore = mockReduce(fakeStore, graphContextActions.selectEntity(0, { content: { ipId: 'ipId1', label: 'label', type: 'COLLECTION' } }))
    assert.deepEqual(graphContextSelectors.getSelectionPath(fakeStore), [{ ipId: 'ipId1', label: 'label',type: 'COLLECTION' }], 'Should return initial selection')
    assert.isOk(graphContextSelectors.getSelectionForLevel(fakeStore, 0), 'No selection should be defined')
    assert.isNotOk(graphContextSelectors.getSelectionForLevel(fakeStore, 1), 'No selection should be defined')
  })
  it('Should select collapsed state', () => {
    let fakeStore = buildMockStore()
    assert.isFalse(graphContextSelectors.isModuleCollapsed(fakeStore), [], 'Should select false for module collapsed')
    fakeStore = mockReduce(fakeStore, graphContextActions.setModuleCollapsed(true))
    assert.isTrue(graphContextSelectors.isModuleCollapsed(fakeStore), [], 'Should select true for module collapsed')
  })
  it('Should select dataset attributes visible state', () => {
    let fakeStore = buildMockStore()
    assert.isFalse(graphContextSelectors.areDatasetAttributesVisible(fakeStore), [], 'Should select false for module collapsed')
    fakeStore = mockReduce(fakeStore, graphContextActions.setDatasetAttributesVisible(true))
    assert.isTrue(graphContextSelectors.areDatasetAttributesVisible(fakeStore), [], 'Should select true for module collapsed')
  })
})
