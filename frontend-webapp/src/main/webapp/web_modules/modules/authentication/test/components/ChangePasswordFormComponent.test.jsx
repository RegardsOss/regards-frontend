/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ChangePasswordFormComponent } from '../../src/components/ChangePasswordFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing ChangePasswordFormComponent', () => {
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
    assert.isDefined(ChangePasswordFormComponent)
  })
  const muiTheme = {
    palette: {},
  }
  const context = {
    intl: IntlStub,
    muiTheme,
    moduleTheme: styles(muiTheme),
  }
  it('Renders properly', () => {
    const props = {
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onChangePassword: () => { },
      handleSubmit: () => { },
    }
    const render = shallow(<ChangePasswordFormComponent {...props} />, { context })
    // 2 fields for password and password confirmation
    assert.equal(render.find(Field).length, 2, 'There should be 2 field for new password and confirm password')
  })
})
