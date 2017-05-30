/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ChangePasswordFormComponent } from '../../src/components/ChangePasswordFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing ChangePasswordFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ChangePasswordFormComponent)
  })

  const context = buildTestContext(styles)

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
