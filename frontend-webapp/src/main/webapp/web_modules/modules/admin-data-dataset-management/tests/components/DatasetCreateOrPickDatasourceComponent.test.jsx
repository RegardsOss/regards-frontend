/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import MenuItem from 'material-ui/MenuItem'
import { DatasetCreateOrPickDatasourceComponent } from '../../src/components/DatasetCreateOrPickDatasourceComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetCreateOrPickDatasourceComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetCreateOrPickDatasourceComponent)
    assert.isDefined(MenuItem)
  })
  it('Render properly', () => {
    const props = {
      datasourceList: DumpProvider.get('DataManagementClient', 'Datasource'),
      createDatasourceUrl: '#',
      backUrl: '#',
      handleDone: () => {},
    }
    const enzymeWrapper = shallow(<DatasetCreateOrPickDatasourceComponent {...props} />, { context })
    expect(enzymeWrapper.find(MenuItem)).to.have.length(2)
  })
})
