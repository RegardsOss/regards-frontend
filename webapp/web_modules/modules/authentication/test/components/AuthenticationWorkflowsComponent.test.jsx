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
import values from 'lodash/values'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AuthenticationFormContainer from '../../src/containers/AuthenticationFormContainer'
import ChangePasswordFormContainer from '../../src/containers/ChangePasswordFormContainer'
import FinishAccountUnlockingContainer from '../../src/containers/FinishAccountUnlockingContainer'
import FinishAccountValidationContainer from '../../src/containers/FinishAccountValidationContainer'
import AuthenticationWorkflowsComponent, { initialModes } from '../../src/components/AuthenticationWorkflowsComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AuthenticationWorkflowsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AuthenticationWorkflowsComponent)
  })

  const context = buildTestContext(styles)

  it('should render properly in every initial mode', () => {
    values(initialModes).forEach((mode) => {
      const props = {
        project: 'any',
        actionToken: '1',
        loginTitle: 'any',
        showAskProjectAccess: false,
        showCancel: false,
        initialMode: mode,
        enableServiceProviders: true,
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
