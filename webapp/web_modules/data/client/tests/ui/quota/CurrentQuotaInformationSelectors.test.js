/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { getCurrentQuotaInformationSelectors } from '../../../src/ui/quota/CurrentQuotaInformationSelectors'

const actions = new CurrentQuotaInformationActions('test-namespace')
const reduce = getCurrentQuotaInformationReducer('test-namespace')
const selectors = getCurrentQuotaInformationSelectors(['test', 'quotaInformation'])

const buildMockStore = (initState = CurrentQuotaInformationReducer.DEFAULT_STATE) => ({
  test: {
    quotaInformation: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store.test.runPluginService, action))

describe('[Search Results] Test CurrentQuotaInformationSelectors', () => {
  it('Should select the running service and its target', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(selectors.getQuotaInformation(fakeStore), CurrentQuotaInformationReducer.DEFAULT_STATE,
      '1-Should return default quota information')
    assert.equal(selectors.getCurrentQuota(fakeStore), 0, '1-Should return default current quota')
    assert.equal(selectors.getMaxQuota(fakeStore), 0, '1-Should return default max quota')
    assert.equal(selectors.getCurrentRate(fakeStore), 0, '1-Should return default current rate')
    assert.equal(selectors.getRateLimit(fakeStore), 0, '1-Should return default rate limit')

    fakeStore = mockReduce(fakeStore, actions.setQuotaInformation(10, 150, 5, 20))
    assert.deepEqual(selectors.getQuotaInformation(fakeStore), {
      currentQuota: 10,
      maxQuota: 150,
      currentRate: 5,
      rateLimit: 20,
    }, '2-Should return quota information')
    assert.equal(selectors.getCurrentQuota(fakeStore), 10, '2-Should return current quota')
    assert.equal(selectors.getMaxQuota(fakeStore), 150, '2-Should return max quota')
    assert.equal(selectors.getCurrentRate(fakeStore), 5, '2-Should return current rate')
    assert.equal(selectors.getRateLimit(fakeStore), 20, '2-Should return rate limit')
  })
})
