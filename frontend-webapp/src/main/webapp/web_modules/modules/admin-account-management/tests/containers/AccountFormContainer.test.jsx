import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { AccountFormContainer } from '../../src/containers/AccountFormContainer'
import AccountFormComponent from '../../src/components/AccountFormComponent'

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing form container', () => {
  it('should exists', () => {
    assert.isDefined(AccountFormContainer)
    assert.isDefined(AccountFormComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        account_id: '1',
      },
      // from mapStateToProps
      account: {
        content: {
          id: '1',
          lastName: 'last name',
          email: 'em@il.com',
          firstName: 'first icon',
          status: 'PENDING',
        },
      },
      isFetching: false,
      // from mapDispatchToProps
      createAccount: () => {},
      fetchAccount: () => {},
      updateAccount: () => {},
    }

    const enzymeWrapper = shallow(<AccountFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(AccountFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
