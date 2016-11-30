import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { AccountListContainer } from '../../src/containers/AccountListContainer'
import AccountListComponent from '../../src/components/AccountListComponent'

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing project list container', () => {
  it('should exists', () => {
    assert.isNotNull(AccountListContainer)
    assert.isNotNull(AccountListComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      accountList: {
        1: {
          content: {
            id: '1',
            lastName: 'last name',
            email: 'em@il.com',
            firstName: 'first icon',
            status: 'PENDING',
          },
        },
      },
      // from mapDispatchToProps
      fetchAccountList: () => {},
      deleteAccount: () => {},
    }

    const enzymeWrapper = shallow(<AccountListContainer {...props} />)
    const subComponent = enzymeWrapper.find(AccountListComponent)
    expect(subComponent).to.have.length(1)
  })
})
