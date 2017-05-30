/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AuthenticationFormComponent from '../../src/components/AuthenticationFormComponent'
import { AuthenticationFormContainer } from '../../src/containers/AuthenticationFormContainer'

describe('[AUTHENTICATION] Testing AuthenticationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(AuthenticationFormContainer)
  })

  const context = buildTestContext()

  it('should render properly', () => {
    const props = {
      project: 'any',
      // form title
      title: 'any',
      // show create account link?
      showAskProjectAccess: true,
      showCancel: true,
      onGotoCreateAccount: () => { },
      onGotoResetPassword: () => { },
      onGotoUnlockAccount: () => { },
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<AuthenticationFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(AuthenticationFormComponent).length, 1, 'There should be the rendered component!')
  })
})
