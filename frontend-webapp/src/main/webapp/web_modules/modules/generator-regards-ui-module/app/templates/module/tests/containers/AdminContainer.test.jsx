/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AdminContainer from '../../src/containers/AdminContainer'
import styles from '../../src/styles/styles'

/**
 * AdminContainer tests
 * @author <%= author %>
 */

const context = buildTestContext(styles)

describe('[Menu] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render properly', () => {
    const props = {}
    shallow(<AdminContainer {...props} />, { context })
  })
})
