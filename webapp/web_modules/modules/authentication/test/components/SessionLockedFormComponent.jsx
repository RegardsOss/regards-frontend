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
import { FormErrorMessage } from '@regardsoss/components'
import { Field } from '@regardsoss/form-utils'
import { SessionLockedFormComponent } from '../../src/components/SessionLockedFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing SessionLockedFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionLockedFormComponent)
  })

  const context = buildTestContext(styles)

  it('Renders properly without error', () => {
    const props = {
      hasUnlockingError: false,
      onUnlock: () => { },
    }
    const render = shallow(<SessionLockedFormComponent {...props} />, { context })
    assert.equal(render.find(Field).length, 1, 'There should be 1 field for password')
    assert.equal(render.find(FormErrorMessage).length, 0, 'There should be no error text')
  })
  it('Renders error', () => {
    const props = {
      hasUnlockingError: true,
      onUnlock: () => { },
    }
    const render = shallow(<SessionLockedFormComponent {...props} />, { context })
    assert.equal(render.find(Field).length, 1, 'There should be 1 field for password')
    assert.equal(render.find(FormErrorMessage).length, 1, 'There should be an error text')
  })
})
