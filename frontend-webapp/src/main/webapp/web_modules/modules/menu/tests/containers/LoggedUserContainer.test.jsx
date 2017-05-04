/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoggedUserComponent from '../../src/components/LoggedUserComponent'
import { LoggedUserContainer } from '../../src/containers/LoggedUserContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing LoggedUserContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoggedUserContainer)
  })
  it('should render properly', () => {
    const props = {
      // from mapStateToProps
      authenticationName: 'hellooo',
      currentRole: 'Peon',
      borrowableRoles: {},
      isSendingBorrowRole: false,
      isInstance: false,
      onLogout: () => { },
      fetchBorrowableRoles: () => { },
      sendBorrowRole: () => { },
      dispatchRoleBorrowed: () => { },
      showProfileEdition: () => { },
    }
    const enzymeWrapper = shallow(<LoggedUserContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(LoggedUserComponent), 1, 'The corresponding component should be rendered')
  })
})
