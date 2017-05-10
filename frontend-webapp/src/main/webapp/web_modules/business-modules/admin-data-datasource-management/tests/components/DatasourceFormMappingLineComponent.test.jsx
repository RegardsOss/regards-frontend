/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import { Field } from '@regardsoss/form-utils'
import DatasourceFormMappingLineComponent from '../../src/components/DatasourceFormMappingLineComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingLineComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormMappingLineComponent)
    assert.isDefined(Field)
  })
  it('Render properly', () => {
    const props = {
      modelAttribute: DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttribute'),
      handleDelete: () => {},
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      table: DumpProvider.getFirstEntity('DataManagementClient', 'ConnectionTable'),
      onlyAdvancedConfiguration: false,
      isEditingSQL: false,
      change: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingLineComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(1)
    expect(enzymeWrapper.find(Field)).to.have.length(3)
  })
})
