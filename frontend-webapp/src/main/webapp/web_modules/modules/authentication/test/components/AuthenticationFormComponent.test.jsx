/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { AuthenticationFormComponent } from '../../src/components/AuthenticationFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AuthenticationFormComponent', () => {
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
    assert.isDefined(AuthenticationFormComponent)
  })
  const muiTheme = {
    palette: {},
  }
  const context = {
    intl: IntlStub,
    muiTheme,
    moduleTheme: styles(muiTheme),
  }
  it('Render properly', () => {
    const props = {
      title: 'A title',
      onLogin: () => {},
      errorMessage: undefined,
      showCreateAccount: true,
      onGotoResetPassword: () => {},
      onGotoUnlockAccount: () => {},
      onGotoCreateAccount: () => {},
      // redux forms
      handleSubmit: () => {},
      showCancel: true,
      onCancelAction: () => {},
      initialize: () => {},
    }
    const enzymeShallow = shallow(<AuthenticationFormComponent {...props} />, { context })
    // check it uses one connected form component from regards
    assert(enzymeShallow.find(ReduxConnectedForm).length, 1, 'There should be one and only redux connected form in component')
  })
})
