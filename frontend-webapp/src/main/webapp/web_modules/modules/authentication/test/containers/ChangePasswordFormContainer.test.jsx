/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import ChangePasswordFormComponent from '../../src/components/ChangePasswordFormComponent'
import { ChangePasswordFormContainer } from '../../src/containers/ChangePasswordFormContainer'

describe('[AUTHENTICATION] Testing ChangePasswordFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ChangePasswordFormContainer)
  })
  const context = buildTestContext()

  it('should render properly', () => {
    const props = {
      mail: 'tiki@tokyo.jp',
      token: '1',
      onDone: () => {},
      onTokenExpired: () => {},
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<ChangePasswordFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(ChangePasswordFormComponent).length, 1, 'There should be the rendered component!')
  })
})
