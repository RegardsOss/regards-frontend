/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { getMetadataArray } from '@regardsoss/user-metadata-common'
import { AskProjectAccessFormComponent } from '../../src/components/AskProjectAccessFormComponent'
import styles from '../../src/styles/styles'

const options = {
  context: buildTestContext(styles),
}

describe('[AUTHENTICATION] Testing AskProjectAccessFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(AskProjectAccessFormComponent)
  })
  const props = {
    passwordRules: 'The password should have two legs, three eyes and one egg, turning around a planet',
    fetchPasswordValidity: () => { },
    onRequestAction: () => { },
    onBack: () => { },
    project: 'any',
    projectMetadata: getMetadataArray(),
    handleSubmit: () => { },
    initialize: () => { },
    submitting: false,
  }
  it('should render properly', () => {
    // render disconnected
    shallow(<AskProjectAccessFormComponent {...props} />, options)
  })

  it('should show create user fields when "use existing account" is unticked, and hide it otherwise', () => {
    // render disconnected
    const existingAccountRender = shallow(<AskProjectAccessFormComponent useExistingAccount {...props} />, options)
    const newAccountRender = shallow(<AskProjectAccessFormComponent useExistingAccount={false} {...props} />, options)
    assert.isBelow(existingAccountRender.find(Field).length, newAccountRender.find(Field).length, 'There should be less fields in existing account case than in the new one!')
  })
})
