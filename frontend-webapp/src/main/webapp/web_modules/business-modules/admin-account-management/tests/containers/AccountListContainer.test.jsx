import pickBy from 'lodash/pickBy'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccountListContainer } from '../../src/containers/AccountListContainer'
import AccountListComponent from '../../src/components/AccountListComponent'

const allAccounts = {
  1: {
    content: {
      id: 1,
      lastName: 'last name',
      email: 'em@il.com',
      firstName: 'first icon',
      status: 'PENDING',
    },
  },
}
const waitingAccounts = pickBy(allAccounts, account => account.content.status === 'PENDING')

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountListContainer)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      allAccounts,
      waitingAccounts,
      isFetchingContent: false,
      // from mapDispatchToProps
      fetchAccountList: () => { },
      fetchWaitingAccountList: () => { },
      sendAcceptUser: () => { },
      deleteAccount: () => { },
    }

    const enzymeWrapper = shallow(<AccountListContainer {...props} />)
    const subComponent = enzymeWrapper.find(AccountListComponent)
    expect(subComponent).to.have.length(1)
  })
})
