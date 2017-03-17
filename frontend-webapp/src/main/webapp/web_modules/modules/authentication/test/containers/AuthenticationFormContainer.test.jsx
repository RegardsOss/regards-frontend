/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import AuthenticationFormComponent from '../../src/components/AuthenticationFormComponent'
import { AuthenticationFormContainer } from '../../src/containers/AuthenticationFormContainer'

describe('[AUTHENTICATION] Testing AuthenticationFormContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AuthenticationFormContainer)
  })
  const context = {
    intl: IntlStub,
  }
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
