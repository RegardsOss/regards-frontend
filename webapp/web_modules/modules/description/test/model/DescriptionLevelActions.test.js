/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DescriptionLevelActions from '../../src/model/DescriptionLevelActions'

const actions = new DescriptionLevelActions()

describe('[Description] Test description level actions', () => {
  it('It should build initialize action', () => {
    assert.deepEqual(actions.initializeContext('my.entity'), {
      type: actions.INITIALIZE_CONTEXT,
      entity: 'my.entity',
    })
  })
  it('It should build show related entity action', () => {
    assert.deepEqual(actions.showRelatedEntity('my.entity2'), {
      type: actions.SHOW_RELATED_ENTITY,
      entity: 'my.entity2',
    })
  })
  it('It should build jump to level action', () => {
    assert.deepEqual(actions.jumpToLevel(3), {
      type: actions.JUMP_TO_LEVEL,
      levelIndex: 3,
    })
  })
  it('It should build change tab action', () => {
    assert.deepEqual(actions.changeTab('some.tab.id'), {
      type: actions.CHANGE_TAB,
      tab: 'some.tab.id',
    })
  })
  it('It should build close action', () => {
    assert.deepEqual(actions.closeDescription(), {
      type: actions.CLOSE,
    })
  })
})
