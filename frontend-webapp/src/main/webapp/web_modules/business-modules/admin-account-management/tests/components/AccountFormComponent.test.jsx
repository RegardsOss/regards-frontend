import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { AccountFormComponent } from '../../src/components/AccountFormComponent'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account form component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountFormComponent)
  })
  it('should render edit form', () => {
    const props = {
      currentAccount: DumpProvider.getFirstEntity('AdminClient', 'Account'),
      backUrl: '/some/url',
      onSubmit: () => { },
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<AccountFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(3)
  })
})
