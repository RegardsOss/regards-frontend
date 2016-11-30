import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { AccountFormComponent } from '../../src/components/AccountFormComponent'

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing form container', () => {
  it('should exists', () => {
    assert.isDefined(AccountFormComponent)
  })
  it('should render edit form', () => {
    const props = {
      currentAccount: {
        content: {
          id: '1',
          lastName: 'last name',
          email: 'em@il.com',
          firstName: 'first icon',
          status: 'PENDING',
        },
      },
      backUrl: '/some/url',
      onSubmit: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<AccountFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(3)
  })

  it('should render create form', () => {
    const props = {
      backUrl: '/some/url',
      onSubmit: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<AccountFormComponent {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(3)
  })
})
