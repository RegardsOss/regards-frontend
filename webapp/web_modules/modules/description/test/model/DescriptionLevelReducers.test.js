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
import { CommonDomain } from '@regardsoss/domain'
import { DESCRIPTION_TABS_ENUM } from '../../src/model/DescriptionTabsEnum'
import DescriptionLevelActions from '../../src/model/DescriptionLevelActions'
import getReducer, { DescriptionLevelReducer } from '../../src/model/DescriptionLevelReducer'

const descriptionLevelActions = new DescriptionLevelActions('test')
const reduce = getReducer('test')


describe('[Description] Test description level reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DescriptionLevelReducer.DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non related actions', () => {
    assert.deepEqual(reduce(DescriptionLevelReducer.DEFAULT_STATE, {
      type: 'anythingElse',
    }), DescriptionLevelReducer.DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('Should reduce show entity', () => {
    let currentState = DescriptionLevelReducer.DEFAULT_STATE
    // we create here an entity with files tab, to check that is is selected by default
    const entity = {
      content: {
        files: {
          [CommonDomain.DataTypesEnum.DOCUMENT]: [{ online: true }],
        },
      },
    }
    let reduced = reduce(currentState, descriptionLevelActions.initializeContext(entity))
    let nextState = { currentDescriptionPath: [entity], currentTab: DESCRIPTION_TABS_ENUM.FILES }
    assert.deepEqual(reduced, nextState, 'First show action should be correctly reduced')

    // we create an entity without any specific tab, to check PROPERTIES get selected by default
    const entity2 = {}
    currentState = nextState
    reduced = reduce(currentState, descriptionLevelActions.initializeContext(entity2))
    nextState = { currentDescriptionPath: [entity2], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES }
    assert.deepEqual(reduced, nextState, 'Second show action should be correctly reduce')
  })

  it('Should fail reducing show related entity when there is no current path', () => {
    assert.throws(reduce.bind(null, DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.showRelatedEntity('err1')))
  })

  it('Should reduce show related entity when there is a parent path', () => {
    const entity1 = { content: { id: 'IDK1' } }
    const entity2 = { content: { id: 'IDK2' } }
    const entity3 = { content: { id: 'IDK3', files: { [CommonDomain.DataTypesEnum.DESCRIPTION]: [{ online: true }] } } }
    const reduced = reduce(
      reduce(
        reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.initializeContext(entity1)),
        descriptionLevelActions.showRelatedEntity(entity2),
      ),
      descriptionLevelActions.showRelatedEntity(entity3),
    )
    assert.deepEqual(reduced, {
      currentDescriptionPath: [entity1, entity2, entity3],
      currentTab: DESCRIPTION_TABS_ENUM.DESCRIPTION, // the description tab should have been selected (as entity has an online description file)
    }, 'The reduced path is invalid')
  })

  it('Should block reducing show related entity when entity is already in path', () => {
    const reduced = reduce(
      reduce(
        reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.initializeContext('test1', DESCRIPTION_TABS_ENUM.PROPERTIES)),
        descriptionLevelActions.showRelatedEntity('test2'),
      ),
      descriptionLevelActions.showRelatedEntity('test2'),
    )
    assert.deepEqual(reduced, { currentDescriptionPath: ['test1', 'test2'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES }, 'The reduced path is invalid')
  })

  it('Should fail reducing jump to level action when there is no path', () => {
    assert.throws(reduce.bind(null, DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.jumpToLevel(0)))
  })

  it('Should fail reducing jump to level action when level index is invalid', () => {
    const initialState = reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.initializeContext('test', DESCRIPTION_TABS_ENUM.PROPERTIES))
    assert.throws(reduce.bind(null, initialState, descriptionLevelActions.jumpToLevel(1)))
    assert.throws(reduce.bind(null, initialState, descriptionLevelActions.jumpToLevel(-1)))
  })

  it('Should reduce jump to level action', () => {
    // prepare some levels
    const state = reduce(
      reduce(
        reduce(
          reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.initializeContext('test1', DESCRIPTION_TABS_ENUM.PROPERTIES)),
          descriptionLevelActions.showRelatedEntity('test2'),
        ),
        descriptionLevelActions.showRelatedEntity('test3'),
      ),
      descriptionLevelActions.showRelatedEntity('test4'),
    )

    assert.deepEqual(state, { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid')
    // check that jump to last level (current), does'nt change anything
    assert.deepEqual(
      reduce(state, descriptionLevelActions.jumpToLevel(3)),
      { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid',
    )
    // check that jump to second level clears levels after
    assert.deepEqual(
      reduce(state, descriptionLevelActions.jumpToLevel(1)), { currentDescriptionPath: ['test1', 'test2'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES },
      'Jump to level 2 reducing is wrong',
    )
    // check that jump to first level clears levels after
    assert.deepEqual(
      reduce(state, descriptionLevelActions.jumpToLevel(0)), { currentDescriptionPath: ['test1'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES },
      'Jump to level 1 reducing is wrong',
    )
  })
  it('Should reduce close action by disposing current context', () => {
    // prepare some levels
    const state = reduce(
      reduce(
        reduce(
          reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.initializeContext('test1', DESCRIPTION_TABS_ENUM.PROPERTIES)),
          descriptionLevelActions.showRelatedEntity('test2'),
        ),
        descriptionLevelActions.showRelatedEntity('test3'),
      ),
      descriptionLevelActions.showRelatedEntity('test4'),
    )

    assert.deepEqual(state, { currentDescriptionPath: ['test1', 'test2', 'test3', 'test4'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid')
    // check that hide clears the path
    assert.deepEqual(reduce(state, descriptionLevelActions.closeDescription()), DescriptionLevelReducer.DEFAULT_STATE, 'Close action reducing is invalid')
  })
  it('should reduce change tab action', () => {
    const state = reduce(DescriptionLevelReducer.DEFAULT_STATE, descriptionLevelActions.initializeContext('test1', DESCRIPTION_TABS_ENUM.PROPERTIES))

    assert.deepEqual(state, { currentDescriptionPath: ['test1'], currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES }, 'Initially reduced path is invalid')
    // check that hide clears the path
    assert.deepEqual(reduce(state, descriptionLevelActions.changeTab(DESCRIPTION_TABS_ENUM.FILES)), { currentDescriptionPath: ['test1'], currentTab: DESCRIPTION_TABS_ENUM.FILES }, 'Change tab action reducing is invalid')
  })
})
