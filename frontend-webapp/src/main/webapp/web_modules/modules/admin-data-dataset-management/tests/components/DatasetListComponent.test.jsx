/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import DatasetListComponent from '../../src/components/DatasetListComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetListComponent)
    assert.isDefined(TableRow)
  })
  it('Render properly', () => {
    const props = {
      datasetList: DumpProvider.get('DataManagementClient', 'Dataset'),
      handleDelete: () => {},
      handleEdit: () => {},
      createUrl: '#',
      backUrl: '#',
    }
    const enzymeWrapper = shallow(<DatasetListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(2)
  })
})
