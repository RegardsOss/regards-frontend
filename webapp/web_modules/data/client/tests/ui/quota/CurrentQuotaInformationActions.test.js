/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const testActions = new CurrentQuotaInformationActions('test-namespace')

describe('[Search Results] Test CurrentQuotaInformationActions', () => {
  it('should return a set quota action', () => {
    assert.deepEqual(testActions.setQuotaInformation(8, 100, 2, 10), {
      type: testActions.SET_QUOTA_INFORMATION,
      currentQuota: 8,
      maxQuota: 100,
      currentRate: 2,
      rateLimit: 10,
    }, 'action to dispatch should have the expected shape and values')
  })
})
