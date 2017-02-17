/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { values } from 'lodash'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import AuthenticationFormContainer from '../../src/containers/AuthenticationFormContainer'
import ChangePasswordFormContainer from '../../src/containers/ChangePasswordFormContainer'
import FinishAccountUnlockingContainer from '../../src/containers/FinishAccountUnlockingContainer'
import FinishAccountValidationContainer from '../../src/containers/FinishAccountValidationContainer'
import AuthenticationWorkflowsComponent, { initialModes } from '../../src/components/AuthenticationWorkflowsComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AuthenticationWorkflowsComponent', () => {
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
    assert.isDefined(AuthenticationWorkflowsComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
    moduleTheme: styles({ palette: {} }),
  }
  // TODO test some rendering
  it('should render properly in every initial mode', () => {
    values(initialModes).forEach((mode) => {
      const props = {
        project: 'any',
        actionToken: '1',
        loginTitle: 'any',
        showAskProjectAccess: false,
        showCancel: false,
        initialMode: mode,
      }

      const render = shallow(<AuthenticationWorkflowsComponent {...props} />, { context })
      switch (mode) {
        case initialModes.loginForm:
          assert.equal(render.find(AuthenticationFormContainer).length, 1, 'Inner component matching the initial mode "loginForm" should be rendered!')
          break
        case initialModes.finishChangePassword:
          assert.equal(render.find(ChangePasswordFormContainer).length, 1, 'Inner component matching the initial mode "finishChangePassword" should be rendered!')
          break
        case initialModes.finishAccountUnlocking:
          assert.equal(render.find(FinishAccountUnlockingContainer).length, 1, 'Inner component matching the initial mode "finishAccountUnlocking" should be rendered!')
          break
        case initialModes.validateCreatedAccount:
          assert.equal(render.find(FinishAccountValidationContainer).length, 1, 'Inner component matching the initial mode "validateCreatedAccount" should be rendered!')
          break
        default:
          throw new Error('unknown mode')
      }
    })
  })
})
