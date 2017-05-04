/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import { Field } from '@regardsoss/form-utils'
import { DatasetFormAttributesComponent } from '../../src/components/DatasetFormAttributesComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormAttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFormAttributesComponent)
    assert.isDefined(TableRow)
    assert.isDefined(Field)
  })
  it('Render properly', () => {
    const props = {
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      handleUpdateModel: () => {},
      onSubmit: () => {},
      backUrl: '#',
      isEditing: false,


      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormAttributesComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
    expect(enzymeWrapper.find(Field)).to.have.length(6)
  })
})
