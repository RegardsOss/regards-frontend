/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoggedUserComponent from '../../src/components/LoggedUserComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing LoggedUserComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoggedUserComponent)
  })
  it('should render properly', () => {
    const props = {
      name: 'Oui-oui',
      currentRole: 'Universe administrator',
      borrowableRoles: {},
      onBorrowRole: () => { },
      onLogout: () => { },
      showProfileEdition: true,
      onShowProfileEdition: () => { },
    }
    shallow(<LoggedUserComponent {...props} />, { context })
  })
})
