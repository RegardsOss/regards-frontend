import { assert, expect } from 'chai'
import ProjectSelectors from '../../src/model/ProjectSelectors'

describe('[ADMIN PROJECT MANAGEMENT] Testing project selectors', () => {
  it('should return the correct value', () => {
    assert.isNotNull(ProjectSelectors)
    const someStore = {
      'admin': {
        'project-management': {
          'project': {
            items: {
              'myproject number 4': 'some content'
            }
          }
        },
      },
    }
    const expectedResult = {
      'myproject number 4': 'some content'
    }
    expect(ProjectSelectors.getList(someStore)).to.eql(expectedResult)

    const expectedResultById = 'some content'
    expect(ProjectSelectors.getById(someStore, 'myproject number 4')).to.eql(expectedResultById)
  })
})
