/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AuthenticationDialogComponent from '../../src/components/AuthenticationDialogComponent'
import styles from '../../src/styles/styles'

/**
 * Tests for AuthenticationDialogComponent
 * @author Sébastien binda
 */
describe('[AUTHENTICATION] Testing AuthenticationDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AuthenticationDialogComponent)
  })

  const context = buildTestContext(styles)

  it('Should render properly', () => {
    // quick test: just checking if render is done without error
    shallow(<AuthenticationDialogComponent open><div /></AuthenticationDialogComponent>, { context })
  })
})
