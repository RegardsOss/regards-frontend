/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoginButton from '../../src/components/LoginButton'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing LoginButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoginButton)
  })
  it('should render properly', () => {
    const props = {
      onLoginAction: () => {},
    }
    shallow(<LoginButton {...props} />, { context })
  })
})
