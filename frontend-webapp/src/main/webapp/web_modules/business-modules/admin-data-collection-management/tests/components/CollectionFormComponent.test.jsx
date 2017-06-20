/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import MenuItem from 'material-ui/MenuItem'
import { CollectionFormComponent } from '../../src/components/CollectionFormComponent'
import CollectionStepperComponent from '../../src/components/CollectionStepperComponent'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionFormComponent)
  })
  const context = buildTestContext()
  it('Render properly', () => {
    const props = {
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      onSubmit: () => {},
      backUrl: '#',
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      isDuplicating: false,
      handleUpdateModel: () => {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<CollectionFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(5)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(1)
    expect(enzymeWrapper.find(CollectionStepperComponent)).to.have.length(1)
  })
})
