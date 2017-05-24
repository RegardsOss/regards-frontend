import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { AccountFormContainer } from '../../src/containers/AccountFormContainer'
import AccountFormComponent from '../../src/components/AccountFormComponent'

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

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
      account: DumpProvider.getFirstEntity('AdminClient', 'Account'),
      isFetching: false,
      // from mapDispatchToProps
      fetchAccount: () => { },
      updateAccount: () => { },
    }

    const enzymeWrapper = shallow(<AccountFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(AccountFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
