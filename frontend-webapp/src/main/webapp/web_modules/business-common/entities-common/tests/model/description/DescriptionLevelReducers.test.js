/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'
import getReducer, { DescriptionLevelReducer } from '../../../src/model/description/DescriptionLevelReducer'

const descriptionLevelActions = new DescriptionLevelActions('test')
const reduce = getReducer('test')


describe('[Entities Common] Test description level reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DescriptionLevelReducer.DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non realted actions', () => {
    assert.deepEqual(reduce(DescriptionLevelReducer.DEFAULT_STATE, {
      type: 'anythingElse',
    }), DescriptionLevelReducer.DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('Should reduce show entity', () => {
    let currentState = DescriptionLevelReducer.DEFAULT_STATE
    let reduced = reduce(currentState, descriptionLevelActions.show('test1'))
    let nextState = { currentDescriptionPath: ['test1'] }
    assert.deepEqual(reduced, nextState, 'First show action should be correctly reduced')

    currentState = nextState
    reduced = reduce(currentState, descriptionLevelActions.show('test2'))
    nextState = { currentDescriptionPath: ['test2'] }
    assert.deepEqual(reduced, nextState, 'Second show action should be correctly reduce')
    currentState = reduced
  })


  it('Should fail reducing show related entity when there is no current path', () => {
    assert.throws(reduce.bind(null, DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.showRelatedEntity('err1')))
  })

  it('Should reduce show related entity when there is a parent path', () => {
    const reduced = reduce(
      reduce(
        reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1')),
        descriptionLevelActions.showRelatedEntity('test2')),
      descriptionLevelActions.showRelatedEntity('test3'))
    assert.deepEqual(reduced, { currentDescriptionPath: ['test1', 'test2', 'test3'] }, 'The reduced path is invalid')
  })

  it('Should fail reducing jump to level action when there is no path', () => {
    assert.throws(reduce.bind(null, DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.jumpToLevel(0)))
  })

  it('Should fail reducing jump to level action when level index is invalid', () => {
    const initialState = reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test'))
    assert.throws(reduce.bind(null, initialState, descriptionLevelActions.jumpToLevel(1)))
    assert.throws(reduce.bind(null, initialState, descriptionLevelActions.jumpToLevel(-1)))
  })

  it('Should reduce jump to level action', () => {
    // prepare some levels
    const state =
      reduce(
        reduce(
          reduce(
            reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1')),
            descriptionLevelActions.showRelatedEntity('test2')),
          descriptionLevelActions.showRelatedEntity('test3')),
        descriptionLevelActions.showRelatedEntity('test4'))

    assert.deepEqual(state, { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'] }, 'Initially reduced path is invalid')
    // check that jump to last level (current), does'nt change anything
    assert.deepEqual(reduce(state, descriptionLevelActions.jumpToLevel(3)),
      { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'] }, 'Initially reduced path is invalid')
    // check that jump to second level clears levels after
    assert.deepEqual(reduce(state, descriptionLevelActions.jumpToLevel(1)), { currentDescriptionPath: ['test1', 'test2'] },
      'Jump to level 2 reducing is wrong')
    // check that jump to first level clears levels after
    assert.deepEqual(reduce(state, descriptionLevelActions.jumpToLevel(0)), { currentDescriptionPath: ['test1'] },
      'Jump to level 1 reducing is wrong')
  })
  it('Should reduce hide action', () => {
    // prepare some levels
    const state =
      reduce(
        reduce(
          reduce(
            reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1')),
            descriptionLevelActions.showRelatedEntity('test2')),
          descriptionLevelActions.showRelatedEntity('test3')),
        descriptionLevelActions.showRelatedEntity('test4'))

    assert.deepEqual(state, { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'] }, 'Initially reduced path is invalid')
    // check that hide clears the path
    assert.deepEqual(reduce(state, descriptionLevelActions.hide(3)), { currentDescriptionPath: null }, 'Hide action reducing is invalid')
  })
})
