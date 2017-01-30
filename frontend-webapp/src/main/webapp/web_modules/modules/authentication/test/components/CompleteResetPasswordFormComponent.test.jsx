/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { CompleteResetPasswordFormComponent } from '../../src/components/CompleteResetPasswordFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing CompleteResetPasswordFormComponent', () => {
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
    assert.isDefined(CompleteResetPasswordFormComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
    moduleTheme: styles({}),
  }
  it('Renders properly', () => {
    const props = {
      onUpdatePassword: () => {},
      handleSubmit: () => {},
    }
    const render = shallow(<CompleteResetPasswordFormComponent {...props} />, { context })
    // 2 fields for password and password confirmation
    assert.equal(render.find(Field), 2, 'There should be 2 field for new password and confirm password')
  })
})
