/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import DatasourceFormMappingCustomComponent from '../../src/components/DatasourceFormMappingCustomComponent'
import DatasourceFormMappingLineComponent from '../../src/components/DatasourceFormMappingLineComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingCustomComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormMappingCustomComponent)
    assert.isDefined(DatasourceFormMappingLineComponent)
  })
  it('Render properly', () => {
    const props = {
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      table: DumpProvider.getFirstEntity('DataManagementClient', 'ConnectionTable'),
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      isEditing: false,
      change: () => {},
    }


    const enzymeWrapper = shallow(<DatasourceFormMappingCustomComponent {...props} />, { context })
    expect(enzymeWrapper.find(DatasourceFormMappingLineComponent)).to.have.length(2)
  })
})
