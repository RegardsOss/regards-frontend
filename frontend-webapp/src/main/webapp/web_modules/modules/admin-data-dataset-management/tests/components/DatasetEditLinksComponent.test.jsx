/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import { DatasetEditLinksComponent } from '../../src/components/DatasetEditLinksComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditLinksComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditLinksComponent)
    assert.isDefined(ListItem)
  })
  it('Render properly', () => {
    const props = {
      linkedCollections: [
        DumpProvider.getNthEntity('DataManagementClient', 'Collection', 1),
        DumpProvider.getNthEntity('DataManagementClient', 'Collection', 2),
      ],
      remainingCollections: [DumpProvider.getNthEntity('DataManagementClient', 'Collection', 0)],
      datasetStringTags: ['some tag', 'another tag', '42'],
      handleAdd: () => {},
      handleDelete: () => {},
      handleSearch: () => {},
      backUrl: '#',
      doneUrl: '#',
    }

    const enzymeWrapper = shallow(<DatasetEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(9)
  })
})
