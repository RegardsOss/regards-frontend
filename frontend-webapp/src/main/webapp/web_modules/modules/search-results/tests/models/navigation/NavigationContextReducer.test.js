/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import navigationContextActions from '../../../src/models/navigation/NavigationContextActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/navigation/NavigationContextReducer'
import DisplayModeEnum from '../../../src/models/navigation/DisplayModeEnum'
import NavigationLevel from '../../../src/models/navigation/NavigationLevel'


describe('[Search Graph] Test navigation context reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non related actions', () => {
    assert.deepEqual(reduce(DEFAULT_STATE, {
      type: 'anythingElse',
    }), DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('should reduce initialization from URL parameters to navigation context and levels', () => {
    // 1 - without any optional information
    let currentState = DEFAULT_STATE
    let reduced = reduce(currentState, navigationContextActions.initialize('aType', DisplayModeEnum.LIST))
    let expected = {
      viewObjectType: 'aType',
      displayMode: DisplayModeEnum.LIST,
      levels: [NavigationLevel.buildRootLevel()],
    }
    assert.deepEqual(reduced, expected, 'Initialization should be correctly reduced without optional parameters')

    // 2 - with option informations and a previous context (to verify it is context independent)
    currentState = expected
    reduced = reduce(currentState, navigationContextActions.initialize('anotherType', DisplayModeEnum.LIST,'homeLabel', 'find:fries', {
      content: {
        label: 'name1',
        ipId: 'IPID1',
      },
    }))
    expected = {
      viewObjectType: 'anotherType',
      displayMode: DisplayModeEnum.LIST,
      levels: [ // we expect here to retrieve the levels as: ROOT, SEARCH_TAG, DATASET
        NavigationLevel.buildRootLevel('homeLabel'),
        NavigationLevel.buildSearchTagLevel('find:fries'),
        NavigationLevel.buildDatasetLevel('IPID1', 'name1'),
      ],
    }

    assert.deepEqual(reduced, expected, 'Initialization should be correctly reduced with optional parameters')
  })

  it('should reduce change view object type', () => {
    const currentState = DEFAULT_STATE
    const reduced = reduce(currentState, navigationContextActions.changeViewObjectType('aType'))
    const expected = {
      ...DEFAULT_STATE,
      viewObjectType: 'aType',
    }
    assert.deepEqual(reduced, expected, 'Change view object type should be correctly reduced')
  })

  it('should reduce change search tag', () => {
    // check search tag is append
    let currentState = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel()],
    }
    let reduced = reduce(currentState, navigationContextActions.changeSearchTag('find:frogs'))
    let expected = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel(), NavigationLevel.buildSearchTagLevel('find:frogs')],
    }
    assert.deepEqual(reduced, expected, 'Change search tags should be correctly reduced in default navigation context')

    // also verify a search tag replaces the current search tag and following context
    currentState = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel(),
        NavigationLevel.buildSearchTagLevel('find:butterflies'),
        NavigationLevel.buildDatasetLevel('any', 'any')],
    }
    reduced = reduce(currentState, navigationContextActions.changeSearchTag('find:frogs'))
    expected = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel(), NavigationLevel.buildSearchTagLevel('find:frogs')],
    }
    assert.deepEqual(reduced, expected, 'Change search tags should be correctly reduced with a navigation context')
  })

  it('should reduce change dataset', () => {
    // check dataset is append
    let currentState = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel()],
    }
    let reduced = reduce(currentState, navigationContextActions.changeDataset({
      content: {
        label: 'name1',
        ipId: 'ip1',
      },
    }))
    let expected = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel(), NavigationLevel.buildDatasetLevel('ip1', 'name1')],
    }
    assert.deepEqual(reduced, expected, 'Change dataset should be correctly reduced in default navigation context')

    // also verify the search tag is not replaced when there is one
    currentState = {
      ...DEFAULT_STATE,
      levels: [
        NavigationLevel.buildRootLevel(),
        NavigationLevel.buildSearchTagLevel('find:frogs'),
        NavigationLevel.buildDatasetLevel('any', 'any'),
      ],
    }
    reduced = reduce(currentState, navigationContextActions.changeDataset({
      content: {
        label: 'name2',
        ipId: 'ip2',
      },
    }))
    expected = {
      ...DEFAULT_STATE,
      levels: [
        NavigationLevel.buildRootLevel(),
        NavigationLevel.buildSearchTagLevel('find:frogs'),
        NavigationLevel.buildDatasetLevel('ip2', 'name2'),
      ],
    }
    assert.deepEqual(reduced, expected, 'Change dataset should preserve the tag currently selected')
  })

  it('should reduce a level change', () => {
    // 1 - test noop
    let currentState = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel()],
    }
    let reduced = reduce(currentState, navigationContextActions.gotoLevel(0))
    let expected = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel()],
    }
    assert.deepEqual(reduced, expected, 'Goto last index should keep the state unchanged (1)')

    currentState = {
      ...DEFAULT_STATE,
      levels: [
        NavigationLevel.buildRootLevel(),
        NavigationLevel.buildSearchTagLevel('find:coffee'),
        NavigationLevel.buildDatasetLevel('ip', 'name'),
      ],
    }
    reduced = reduce(currentState, navigationContextActions.gotoLevel(2))
    expected = {
      ...DEFAULT_STATE,
      levels: [
        NavigationLevel.buildRootLevel(),
        NavigationLevel.buildSearchTagLevel('find:coffee'),
        NavigationLevel.buildDatasetLevel('ip', 'name'),
      ],
    }
    assert.deepEqual(reduced, expected, 'Goto last index should keep the state unchanged (2)')

    // 2 - test move from last to previous level (keep using the initial state defined above)
    reduced = reduce(currentState, navigationContextActions.gotoLevel(1))
    expected = {
      ...DEFAULT_STATE,
      levels: [
        NavigationLevel.buildRootLevel(),
        NavigationLevel.buildSearchTagLevel('find:coffee'),
      ],
    }
    assert.deepEqual(reduced, expected, 'Should reduce correctly a parent level browsing')

    // 3 - test a move to root
    reduced = reduce(currentState, navigationContextActions.gotoLevel(0))
    expected = {
      ...DEFAULT_STATE,
      levels: [NavigationLevel.buildRootLevel()],
    }
    assert.deepEqual(reduced, expected, 'Should reduce correctly a root level browsing')
  })
})
