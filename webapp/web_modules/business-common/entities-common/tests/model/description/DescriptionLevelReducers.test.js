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
    let reduced = reduce(currentState, descriptionLevelActions.show('test1', DescriptionLevelActions.TABS_ENUM.DESCRIPTION))
    let nextState = { currentDescriptionPath: ['test1'], tab: DescriptionLevelActions.TABS_ENUM.DESCRIPTION }
    assert.deepEqual(reduced, nextState, 'First show action should be correctly reduced')

    currentState = nextState
    reduced = reduce(currentState, descriptionLevelActions.show('test2', DescriptionLevelActions.TABS_ENUM.FILES))
    nextState = { currentDescriptionPath: ['test2'], tab: DescriptionLevelActions.TABS_ENUM.FILES }
    assert.deepEqual(reduced, nextState, 'Second show action should be correctly reduce')
    currentState = reduced
  })

  it('Should fail reducing show related entity when there is no current path', () => {
    assert.throws(reduce.bind(null, DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.showRelatedEntity('err1')))
  })

  it('Should reduce show related entity when there is a parent path', () => {
    const reduced = reduce(
      reduce(
        reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1', DescriptionLevelActions.TABS_ENUM.PROPERTIES)),
        descriptionLevelActions.showRelatedEntity('test2'),
      ),
      descriptionLevelActions.showRelatedEntity('test3'),
    )
    assert.deepEqual(reduced, { currentDescriptionPath: ['test1', 'test2', 'test3'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'The reduced path is invalid')
  })

  it('Should block reducing show related entity when entity is already in path', () => {
    const reduced = reduce(
      reduce(
        reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1', DescriptionLevelActions.TABS_ENUM.PROPERTIES)),
        descriptionLevelActions.showRelatedEntity('test2'),
      ),
      descriptionLevelActions.showRelatedEntity('test2'),
    )
    assert.deepEqual(reduced, { currentDescriptionPath: ['test1', 'test2'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'The reduced path is invalid')
  })

  it('Should fail reducing jump to level action when there is no path', () => {
    assert.throws(reduce.bind(null, DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.jumpToLevel(0)))
  })

  it('Should fail reducing jump to level action when level index is invalid', () => {
    const initialState = reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test', DescriptionLevelActions.TABS_ENUM.PROPERTIES))
    assert.throws(reduce.bind(null, initialState, descriptionLevelActions.jumpToLevel(1)))
    assert.throws(reduce.bind(null, initialState, descriptionLevelActions.jumpToLevel(-1)))
  })

  it('Should reduce jump to level action', () => {
    // prepare some levels
    const state =
      reduce(
        reduce(
          reduce(
            reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1', DescriptionLevelActions.TABS_ENUM.PROPERTIES)),
            descriptionLevelActions.showRelatedEntity('test2'),
          ),
          descriptionLevelActions.showRelatedEntity('test3'),
        ),
        descriptionLevelActions.showRelatedEntity('test4'),
      )

    assert.deepEqual(state, { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid')
    // check that jump to last level (current), does'nt change anything
    assert.deepEqual(
      reduce(state, descriptionLevelActions.jumpToLevel(3)),
      { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid',
    )
    // check that jump to second level clears levels after
    assert.deepEqual(
      reduce(state, descriptionLevelActions.jumpToLevel(1)), { currentDescriptionPath: ['test1', 'test2'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES },
      'Jump to level 2 reducing is wrong',
    )
    // check that jump to first level clears levels after
    assert.deepEqual(
      reduce(state, descriptionLevelActions.jumpToLevel(0)), { currentDescriptionPath: ['test1'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES },
      'Jump to level 1 reducing is wrong',
    )
  })
  it('Should reduce hide action', () => {
    // prepare some levels
    const state =
      reduce(
        reduce(
          reduce(
            reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1', DescriptionLevelActions.TABS_ENUM.PROPERTIES)),
            descriptionLevelActions.showRelatedEntity('test2'),
          ),
          descriptionLevelActions.showRelatedEntity('test3'),
        ),
        descriptionLevelActions.showRelatedEntity('test4'),
      )

    assert.deepEqual(state, { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid')
    // check that hide clears the path
    assert.deepEqual(reduce(state, descriptionLevelActions.hide(3)), { currentDescriptionPath: null, tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'Hide action reducing is invalid')
  })
  it('should reduce change tab action', () => {
    const state = reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.show('test1', DescriptionLevelActions.TABS_ENUM.PROPERTIES))


    assert.deepEqual(state, { currentDescriptionPath: ['test1'], tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid')
    // check that hide clears the path
    assert.deepEqual(reduce(state, descriptionLevelActions.changeTab(DescriptionLevelActions.TABS_ENUM.FILES)), { currentDescriptionPath: ['test1'], tab: DescriptionLevelActions.TABS_ENUM.FILES }, 'Change tab action reducing is invalid')
  })
})
