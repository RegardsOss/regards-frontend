/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
      displayOldPasswordField: false,
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onChangePassword: () => { },
      onCancel: () => { },
      handleSubmit: () => { },
    }
    const render = shallow(<ChangePasswordFormComponent {...props} />, { context })
    // 2 fields for password and password confirmation
    assert.equal(render.find(Field).length, 2, 'There should be 2 field for new password and confirm password')
  })
})
