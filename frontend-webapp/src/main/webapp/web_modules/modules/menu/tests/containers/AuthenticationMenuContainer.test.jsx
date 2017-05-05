/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AuthenticationMenuContainer } from '../../src/containers/AuthenticationMenuContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

const router = require('react-router')

describe('[Menu] Testing AuthenticationMenuContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {} }),
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(AuthenticationMenuContainer)
  })
  it('should render properly', () => {
    shallow(<AuthenticationMenuContainer
      project="any"
      appName="any"
      isAuthenticated={false}
    />, { context })
    shallow(<AuthenticationMenuContainer
      project="any"
      appName="any"
      isAuthenticated
    />, { context })
  })
})
