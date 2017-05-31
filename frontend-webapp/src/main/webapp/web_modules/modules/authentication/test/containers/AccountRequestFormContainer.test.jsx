/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AccountRequestFormComponent, { requestFormIds } from '../../src/components/AccountRequestFormComponent'
import { AccountRequestFormContainer } from '../../src/containers/AccountRequestFormContainer'

describe('[AUTHENTICATION] Testing AccountRequestFormContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountRequestFormContainer)
  })

  const context = buildTestContext()

  it('should render properly', () => {
    const props = {
      onBack: () => {},
      // done callback
      onDone: () => {},
      // request form ID (used internally)
      requestFormId: requestFormIds.resetPasswordRequest,
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<AccountRequestFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(AccountRequestFormComponent).length, 1, 'There should be the rendered component!')
  })
})
