/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import DatasourceListComponent from '../../src/components/DatasourceListComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceListComponent)
  })
  it('Render properly', () => {
    const props = {
      datasourceList: DumpProvider.get('DataManagementClient', 'Datasource'),
      handleDelete: () => {},
      handleEdit: () => {},
      createUrl: '#',
      backUrl: '#',
    }

    const enzymeWrapper = shallow(<DatasourceListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
  })
})
