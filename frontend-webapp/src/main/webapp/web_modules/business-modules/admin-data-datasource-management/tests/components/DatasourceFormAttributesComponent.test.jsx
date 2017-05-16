/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { DatasourceFormAttributesComponent } from '../../src/components/DatasourceFormAttributesComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormAttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormAttributesComponent)
    assert.isDefined(Field)
  })
  it('Render properly', () => {
    const props = {
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      currentConnection: DumpProvider.getFirstEntity('DataManagementClient', 'Connection'),
      onSubmit: () => {},
      backUrl: '#',
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormAttributesComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(3)
  })
})
