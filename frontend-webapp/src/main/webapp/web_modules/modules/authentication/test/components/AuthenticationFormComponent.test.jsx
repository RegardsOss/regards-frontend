/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import { AuthenticationFormComponent } from '../../src/components/AuthenticationFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AuthenticationFormComponent', () => {
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
      onLogin: () => { },
      errorMessage: undefined,
      showAskProjectAccess: true,
      onGotoResetPassword: () => { },
      onGotoUnlockAccount: () => { },
      onGotoCreateAccount: () => { },
      // redux forms
      handleSubmit: () => { },
      showCancel: true,
      onCancelAction: () => { },
      initialize: () => { },
    }
    const enzymeShallow = shallow(<AuthenticationFormComponent {...props} />, { context })
    assert(enzymeShallow.find(Card).length, 1, 'There should be one and only material-ui Card in component')
  })
})
