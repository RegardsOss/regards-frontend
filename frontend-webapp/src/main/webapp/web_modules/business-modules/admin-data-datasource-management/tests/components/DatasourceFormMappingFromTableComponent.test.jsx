/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import DatasourceFormMappingFromTableComponent from '../../src/components/DatasourceFormMappingFromTableComponent'
import DatasourceFormMappingLineComponent from '../../src/components/DatasourceFormMappingLineComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingLineComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormMappingFromTableComponent)
    assert.isDefined(DatasourceFormMappingLineComponent)
  })
  it('Render properly', () => {
    const props = {
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      table: DumpProvider.get('DataManagementClient', 'ConnectionTable').t_fragment,
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      isEditing: false,
      change: () => {},
    }
    const enzymeWrapper = shallow(<DatasourceFormMappingFromTableComponent {...props} />, { context })
    expect(enzymeWrapper.find(DatasourceFormMappingLineComponent)).to.have.length(8)
  })
})
