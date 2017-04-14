/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import graphContextActions from '../../src/model/graph/GraphContextActions'
import reduce from '../../src/model/graph/GraphContextReducers'


describe('[Search Graph] Test graph context reducer', () => {
  const defaultState = {
    selectionPath: [],
    datasetsAttributesVisible: false,
    moduleCollapsed: false,
  }
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), defaultState, 'Reducer should return an empty initial state')
  })

  it('Should reduce successive selection levels consistently ', () => {
    // Test : valid selection level 1
    let currentState = defaultState
    let reduced = reduce(currentState, graphContextActions.selectEntity(0, {
      content: { ipId: 'ip1', type: 'COLLECTION' },
    }))
    let nextState = {
      ...currentState,
      selectionPath: [{ ipId: 'ip1', type: 'COLLECTION' }],
    }
    assert.deepEqual(reduced, nextState, 'First level selection should be correctly reduced')
    currentState = reduced

    // Test : valid selection level 2
    reduced = reduce(currentState, graphContextActions.selectEntity(1, {
      content: { ipId: 'ip2', type: 'COLLECTION' },
    }))
    nextState = {
      ...currentState,
      selectionPath: [
        { ipId: 'ip1', type: 'COLLECTION' },
        { ipId: 'ip2', type: 'COLLECTION' },
      ],
    }
    assert.deepEqual(reduced, nextState, 'Second level selection should be correctly reduced')
    currentState = reduced

    // Tests : valid selection level 3
    reduced = reduce(currentState, graphContextActions.selectEntity(2, {
      content: { ipId: 'ip3', type: 'COLLECTION' },
    }))
    nextState = {
      ...currentState,
      selectionPath: [
        { ipId: 'ip1', type: 'COLLECTION' },
        { ipId: 'ip2', type: 'COLLECTION' },
        { ipId: 'ip3', type: 'COLLECTION' },
      ],
    }
    assert.deepEqual(reduced, nextState, 'Third level selection should be correctly reduced')
    currentState = reduced

    // Test : 'jumping over' levels should be forbidden: Attempting a level 5 selection
    assert.throws(() => reduce(currentState, graphContextActions.selectEntity(4, {
      content: { ipId: 'ip4', type: 'COLLECTION' },
    })))

    // Test: reset level 2 selection (selection must now contain only level 1)
    reduced = reduce(currentState, graphContextActions.selectEntity(1, null))
    nextState = {
      ...currentState,
      selectionPath: [
        { ipId: 'ip1', type: 'COLLECTION' },
      ],
    }
    assert.deepEqual(reduced, nextState, 'Reset selection at level 2 should result in a selection path with only level 1 ')
    currentState = reduced

    // Test: reset level 1 selection (selection must now empty)
    reduced = reduce(currentState, graphContextActions.selectEntity(0, null))
    nextState = {
      ...currentState,
      selectionPath: [],
    }
    assert.deepEqual(reduced, nextState, 'Reset selection at level 1 should result in an empty selection path')
    currentState = reduced
  })

  it('Should reduce module collapsed state changing', () => {
    let currentState = defaultState
    let reduced = reduce(currentState, graphContextActions.setModuleCollapsed(true))
    assert.deepEqual(reduced, {
      ...currentState,
      moduleCollapsed: true,
    }, 'Set module collapsed should be correctly reduced')

    currentState = reduced
    reduced = reduce(currentState, graphContextActions.setModuleCollapsed(false))
    assert.deepEqual(reduced, {
      ...currentState,
      moduleCollapsed: false,
    }, 'Set module uncollapsed should be correctly reduced')
  })

  it('Should reduce module collapsed state changing', () => {
    let currentState = defaultState
    let reduced = reduce(currentState, graphContextActions.setDatasetAttributesVisible(true))
    assert.deepEqual(reduced, {
      ...currentState,
      datasetsAttributesVisible: true,
    }, 'Set data attributes visible should be correctly reduced')

    currentState = reduced
    reduced = reduce(currentState, graphContextActions.setDatasetAttributesVisible(false))
    assert.deepEqual(reduced, {
      ...currentState,
      datasetsAttributesVisible: false,
    }, 'Set dataset attributes hidden should be correctly reduced')
  })
})
