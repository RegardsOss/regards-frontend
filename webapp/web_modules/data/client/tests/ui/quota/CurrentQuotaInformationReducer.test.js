/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CurrentQuotaInformationActions } from '../../../src/ui/quota/CurrentQuotaInformationActions'
import { getCurrentQuotaInformationReducer, CurrentQuotaInformationReducer } from '../../../src/ui/quota/CurrentQuotaInformationReducer'

const actions = new CurrentQuotaInformationActions('test-namespace')
const reduce = getCurrentQuotaInformationReducer('test-namespace')

describe('[Search Results] Test CurrentQuotaInformationReducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), CurrentQuotaInformationReducer.DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non related actions', () => {
    assert.deepEqual(reduce(CurrentQuotaInformationReducer.DEFAULT_STATE, {
      type: 'anythingElse',
    }), CurrentQuotaInformationReducer.DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('should reduce set quota information action', () => {
    let currentState = CurrentQuotaInformationReducer.DEFAULT_STATE
    let reduced = reduce(currentState, actions.setQuotaInformation(1, 50, 10, 15))
    assert.deepEqual(reduced, {
      currentQuota: 1,
      maxQuota: 50,
      currentRate: 10,
      rateLimit: 15,
    }, '1-action should be correctly reduced')
    currentState = reduced
    reduced = reduce(currentState, actions.setQuotaInformation(25, 20, 15, 15))
    assert.deepEqual(reduced, {
      currentQuota: 25,
      maxQuota: 20,
      currentRate: 15,
      rateLimit: 15,
    }, '2-action should be correctly reduced')
  })
})
