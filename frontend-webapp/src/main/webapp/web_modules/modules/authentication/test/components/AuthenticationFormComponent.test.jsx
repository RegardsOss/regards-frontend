/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import { AuthenticationFormComponent } from '../../src/components/AuthenticationFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AuthenticationFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AuthenticationFormComponent)
  })

  const context = buildTestContext(styles)

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
