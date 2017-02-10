/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import AccountRequestFormComponent, { requestFormIds } from '../../src/components/AccountRequestFormComponent'
import { AccountRequestFormContainer } from '../../src/containers/AccountRequestFormContainer'

describe('[AUTHENTICATION] Testing AccountRequestFormContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AccountRequestFormContainer)
  })
  const context = {
    intl: IntlStub,
  }
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
