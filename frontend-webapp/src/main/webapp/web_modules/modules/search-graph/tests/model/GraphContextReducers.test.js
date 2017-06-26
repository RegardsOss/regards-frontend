/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { TagTypes } from '@regardsoss/domain/catalog'
import graphContextActions from '../../src/model/graph/GraphContextActions'
import reduce, { DEFAULT_STATE } from '../../src/model/graph/GraphContextReducers'


describe('[Search Graph] Test graph context reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non realted actions', () => {
    assert.deepEqual(reduce(DEFAULT_STATE, {
      type: 'anythingElse',
    }), DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('Should reduce successive selection levels consistently ', () => {
    // Test : valid selection level 1
    let currentState = DEFAULT_STATE
    let reduced = reduce(currentState, graphContextActions.selectEntity(0, {
      content: { ipId: 'ip1', label: 'label', entityType: 'COLLECTION' },
    }))
    let nextState = {
      ...currentState,
      selectionPath: [{ ipId: 'ip1', label: 'label', entityType: 'COLLECTION' }],
    }
    assert.deepEqual(reduced, nextState, 'First level selection should be correctly reduced')
    currentState = reduced

    // Test : valid selection level 2
    reduced = reduce(currentState, graphContextActions.selectEntity(1, {
      content: { ipId: 'ip2', label: 'label', entityType: 'COLLECTION' },
    }))
    nextState = {
      ...currentState,
      selectionPath: [
        { ipId: 'ip1', label: 'label', entityType: 'COLLECTION' },
        { ipId: 'ip2', label: 'label', entityType: 'COLLECTION' },
      ],
    }
    assert.deepEqual(reduced, nextState, 'Second level selection should be correctly reduced')
    currentState = reduced

    // Tests : valid selection level 3
    reduced = reduce(currentState, graphContextActions.selectEntity(2, {
      content: { ipId: 'ip3', label: 'label', entityType: 'COLLECTION' },
    }))
    nextState = {
      ...currentState,
      selectionPath: [
        { ipId: 'ip1', label: 'label', entityType: 'COLLECTION' },
        { ipId: 'ip2', label: 'label', entityType: 'COLLECTION' },
        { ipId: 'ip3', label: 'label', entityType: 'COLLECTION' },
      ],
    }
    assert.deepEqual(reduced, nextState, 'Third level selection should be correctly reduced')
    currentState = reduced

    // Test : 'jumping over' levels should be forbidden: Attempting a level 5 selection
    assert.throws(() => reduce(currentState, graphContextActions.selectEntity(4, {
      content: { ipId: 'ip4', label: 'label', entityType: 'COLLECTION' },
    })))

    // Test: reset level 2 selection (selection must now contain only level 1)
    reduced = reduce(currentState, graphContextActions.selectEntity(1, null))
    nextState = {
      ...currentState,
      selectionPath: [
        { ipId: 'ip1', label: 'label', entityType: 'COLLECTION' },
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
    let currentState = DEFAULT_STATE
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

  it('Should reduce dataset attributes visible state changing', () => {
    let currentState = DEFAULT_STATE
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

  it('Should reduce search tag', () => {
    const currentState = DEFAULT_STATE
    const reduced = reduce(currentState, graphContextActions.setSearchTag({ type: TagTypes.WORD, data: 'xxx' }))
    assert.deepEqual(reduced, {
      ...currentState,
      searchTag: {
        type: TagTypes.WORD,
        data: 'xxx',
      },
      moduleCollapsed: true,
    }, 'Set search tag should be correctly reduced and module should be collapsed')
  })
})
