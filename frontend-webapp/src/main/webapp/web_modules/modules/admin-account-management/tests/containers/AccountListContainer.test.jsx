import { pickBy } from 'lodash'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
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
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
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
