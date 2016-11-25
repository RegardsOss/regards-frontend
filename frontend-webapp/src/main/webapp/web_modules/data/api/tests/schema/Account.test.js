import { assert } from 'chai'
import { normalize } from 'normalizr'
import Schemas from '../../src/main'

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
          1: {
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
      result: [1],
    }
    const result = normalize(response, Schemas.PROJECT_ARRAY)

    assert.deepEqual(result, expectedResult)
  })
})
