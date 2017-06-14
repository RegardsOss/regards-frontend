/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import CollectionListComponent from '../../src/components/CollectionListComponent'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionListComponent)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      collectionList: DumpProvider.get('DataManagementClient', 'Collection'),
      handleDelete: () => {},
      handleEdit: () => {},
      handleDuplicate: () => {},
      createUrl: '#',
      backUrl: '#',
    }

    const enzymeWrapper = shallow(<CollectionListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(4)
  })
})
