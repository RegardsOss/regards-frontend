import { assert, expect } from 'chai'
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
