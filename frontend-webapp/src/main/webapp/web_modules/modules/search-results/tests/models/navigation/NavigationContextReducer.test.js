/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { TagTypes } from '@regardsoss/domain/catalog'
import { Tag } from '../../../src/models/navigation/Tag'
import navigationContextActions from '../../../src/models/navigation/NavigationContextActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/navigation/NavigationContextReducer'
import { TableDisplayModeEnum } from '../../../src/models/navigation/TableDisplayModeEnum'


describe('[Search Results] Test navigation context reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non related actions', () => {
    assert.deepEqual(reduce(DEFAULT_STATE, {
      type: 'anythingElse',
    }), DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('should reduce initialization navigation context and levels', () => {
    // 1 - without any optional information
    let currentState = DEFAULT_STATE
    let reduced = reduce(currentState, navigationContextActions.initialize('aType', TableDisplayModeEnum.LIST))
    let expected = {
      viewObjectType: 'aType',
      displayMode: TableDisplayModeEnum.LIST,
      initialLevels: [],
      levels: [],
    }
    assert.deepEqual(reduced, expected, 'Initialization should be correctly reduced without optional parameters')

    // 2 - with option informations and a previous context (to verify it is context independent)
    currentState = expected
    const initialTags = [
      new Tag(TagTypes.DATASET, 'label1', 'URN:ip1'),
      new Tag(TagTypes.WORD, 'fries', 'fries'),
    ]
    const tag = new Tag(TagTypes.WORD, 'one more tag', 'on more tag')
    reduced = reduce(currentState, navigationContextActions.initialize('anotherType', TableDisplayModeEnum.LIST, initialTags, [tag]))
    expected = {
      viewObjectType: 'anotherType',
      displayMode: TableDisplayModeEnum.LIST,
      initialLevels: initialTags,
      levels: [...initialTags, tag],
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

  it('should reduce add search tag', () => {
    // check search tag is append
    let currentState = {
      ...DEFAULT_STATE,
    }
    const tag1 = new Tag(TagTypes.DATASET, 'label1', 'URN:ip1')
    let reduced = reduce(currentState, navigationContextActions.addSearchTag(tag1))
    let expected = {
      ...DEFAULT_STATE,
      levels: [tag1],
    }
    assert.deepEqual(reduced, expected, 'Change search tags should be correctly reduced in default navigation context')

    // also verify a search tag replaces the current search tag and following context
    const tag2 = new Tag(TagTypes.WORD, 'fries', 'fries')
    currentState = reduced
    reduced = reduce(currentState, navigationContextActions.addSearchTag(tag2))
    expected = {
      ...DEFAULT_STATE,
      levels: [tag1, tag2],
    }
    assert.deepEqual(reduced, expected, 'Change search tags should be correctly reduced with a navigation context')
  })

  it('should avoid adding twice the same tag', () => {
    // check dataset is append
    let currentState = {
      ...DEFAULT_STATE,
      levels: [],
    }
    const tag1 = new Tag(TagTypes.DATASET, 'a label1', 'URN:DS1')
    let reduced = reduce(currentState, navigationContextActions.addSearchTag(new Tag(TagTypes.DATASET, 'a label1', 'URN:DS1')))
    let expected = {
      ...DEFAULT_STATE,
      levels: [tag1],
    }
    assert.deepEqual(reduced, expected, 'Change dataset should be correctly reduced in default navigation context')

    currentState = reduced
    reduced = reduce(currentState, navigationContextActions.addSearchTag(new Tag(TagTypes.DATASET, 'another label1', 'URN:DS1')))
    expected = {
      ...DEFAULT_STATE,
      levels: [tag1], // the second tag should be ignored as only the label differs
    }
    assert.deepEqual(reduced, expected, 'Change dataset should preserve the tag currently selected')

    // verify another tag can still be added
    currentState = reduced
    const tag2 = new Tag(TagTypes.DATASET, 'a label1', 'URN:DS2') // a different URN means a different object
    reduced = reduce(currentState, navigationContextActions.addSearchTag(tag2))
    expected = {
      ...DEFAULT_STATE,
      levels: [tag1, tag2], // the second tag should be ignored as only the label differs
    }
    assert.deepEqual(reduced, expected, 'Change dataset should preserve the tag currently selected')
  })

  it('should reduce a level change', () => {
    // 1 - test noop
    let currentState = {
      ...DEFAULT_STATE,
      levels: [],
    }
    let reduced = reduce(currentState, navigationContextActions.gotoLevel(0))
    let expected = {
      ...DEFAULT_STATE,
      levels: [],
    }
    assert.deepEqual(reduced, expected, 'Goto last index should keep the state unchanged (1)')
    const t1 = new Tag(TagTypes.DATASET, 'label1', 'URN:ip1')
    const t2 = new Tag(TagTypes.WORD, 'fries', 'fries')
    currentState = {
      ...DEFAULT_STATE,
      levels: [t1, t2],
    }
    reduced = reduce(currentState, navigationContextActions.gotoLevel(2))
    expected = {
      ...DEFAULT_STATE,
      levels: [t1, t2],
    }
    assert.deepEqual(reduced, expected, 'Goto last index should keep the state unchanged (2)')

    // 2 - test move from last to previous level (keep using the initial state defined above)
    reduced = reduce(currentState, navigationContextActions.gotoLevel(1))
    expected = {
      ...DEFAULT_STATE,
      levels: [t1],
    }
    assert.deepEqual(reduced, expected, 'Should reduce correctly a parent level browsing')

    // 3 - test a move to root
    reduced = reduce(currentState, navigationContextActions.gotoLevel(0))
    expected = {
      ...DEFAULT_STATE,
      levels: [],
    }
    assert.deepEqual(reduced, expected, 'Should reduce correctly a root level browsing')
  })
  it('should prevent user removing or adding again a tag from externally driven context tags', () => {
    // 1 - test noop
    let currentState = {
      ...DEFAULT_STATE,
    }
    const initialTags = [
      new Tag(TagTypes.DATASET, 'label1', 'URN:ip1'),
      new Tag(TagTypes.WORD, 'fries', 'fries'),
    ]
    let reduced = reduce(currentState, navigationContextActions.initialize('a', 'b', initialTags))
    let expected = {
      viewObjectType: 'a',
      displayMode: 'b',
      initialLevels: initialTags,
      levels: initialTags, // levels should contain the initial tags
    }
    assert.deepEqual(reduced, expected, 'Initialization should be performed correctly')
    // 1 - test adding an already known tag from initial tags
    currentState = reduced
    reduced = reduce(currentState, navigationContextActions.addSearchTag(new Tag(TagTypes.DATASET, 'label1', 'URN:ip1')))
    expected = currentState
    assert.deepEqual(reduced, expected, 'Adding a known initial tag should be rejected')

    // 2 - Add some levels that can be added and verify we can remove them BUT NOT the initial context tags
    const userAddedTag1 = new Tag(TagTypes.COLLECTION, 'col1', 'URN:COL:ip1')
    const userAddedTag2 = new Tag(TagTypes.COLLECTION, 'col2', 'URN:COL:ip2')
    reduced = reduce(
      reduce(currentState, navigationContextActions.addSearchTag(userAddedTag1)),
      navigationContextActions.addSearchTag(userAddedTag2))
    expected = {
      ...currentState,
      levels: [...initialTags, userAddedTag1, userAddedTag2],
    }
    assert.deepEqual(reduced, expected, 'Adding tags should be performed correctly')

    currentState = reduced
    reduced = reduce(currentState, navigationContextActions.gotoLevel(0))
    expected = {
      ...currentState,
      levels: initialTags,
    }
    assert.deepEqual(reduced, expected, 'The reducer should always keep initial tags in levels list')
  })
})
