/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { DatasourceFormMappingComponent } from '../../src/components/DatasourceFormMappingComponent'
import DatasourceFormMappingFromTableComponent from '../../src/components/DatasourceFormMappingFromTableComponent'
import DatasourceFormMappingCustomComponent from '../../src/components/DatasourceFormMappingCustomComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormMappingComponent)
    assert.isDefined(DatasourceFormMappingFromTableComponent)
    assert.isDefined(DatasourceFormMappingCustomComponent)
  })
  it('Render properly', () => {
    const props = {
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      isEditing: true,
      isCreating: false,
      handleBack: () => {},
      onSubmit: () => {},
      onTableSelected: () => {},
      tableList: DumpProvider.get('DataManagementClient', 'ConnectionTable'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingComponent {...props} />, { context })
    expect(enzymeWrapper.find(DatasourceFormMappingFromTableComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DatasourceFormMappingCustomComponent)).to.have.length(1)
  })
})
