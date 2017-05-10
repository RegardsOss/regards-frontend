/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { DatasetFormSubsettingComponent } from '../../src/components/DatasetFormSubsettingComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormSubsettingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFormSubsettingComponent)
    assert.isDefined(Field)
  })
  it('Render properly', () => {
    const props = {
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      onSubmit: () => {},
      handleTestSubsetting: () => {},
      handleBack: () => {},
      isEditing: false,

      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormSubsettingComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(1)
  })
})
