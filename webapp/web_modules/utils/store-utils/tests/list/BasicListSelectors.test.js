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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import BasicListSelectors from '../../src/list/BasicListSelectors'

const basicListSelectors = new BasicListSelectors(['admin', 'project-management', 'project'])

const currentStore = {
  admin: {
    'project-management': {
      project: {
        items: {
          'myproject number 4': 'some content',
        },
      },
    },
  },
}

describe('[STORE UTILS] Testing project selectors', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(basicListSelectors)
  })
  describe('Testing selectors', () => {
    it('getList', () => {
      const expectedResult = {
        'myproject number 4': 'some content',
      }
      expect(basicListSelectors.getList(currentStore)).to.eql(expectedResult)
    })

    it('getById', () => {
      const expectedResultById = 'some content'
      expect(basicListSelectors.getById(currentStore, 'myproject number 4')).to.eql(expectedResultById)
    })
  })
})
