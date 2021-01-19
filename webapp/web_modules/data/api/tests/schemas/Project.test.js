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
import { normalize } from 'normalizr'
import { PROJECT_ARRAY } from '../../src/main'

describe('[API NORMALIZR] Testing schemas', () => {
  it('should handle project list', () => {
    const response = [{
      content: {
        id: 1,
        name: 'project1',
        description: '',
        icon: '',
        isPublic: true,
        isDeleted: false,
      },
      links: [],
    }]
    const expectedResult = {
      entities: {
        projects: {
          project1: {
            content: {
              id: 1,
              name: 'project1',
              description: '',
              icon: '',
              isPublic: true,
              isDeleted: false,
            },
            links: [],
          },
        },
      },
      result: ['project1'],
    }
    const result = normalize(response, PROJECT_ARRAY)

    assert.deepEqual(result, expectedResult)
  })
})
