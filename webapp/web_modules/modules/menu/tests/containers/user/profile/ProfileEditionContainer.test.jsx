/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ProfileEditionDialogComponent from '../../../../src/components/user/profile/ProfileEditionDialogComponent'
import { ProfileEditionContainer } from '../../../../src/containers/user/profile/ProfileEditionContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileEditionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionContainer)
  })
  it('should render properly', () => {
    const props = {
      visible: true,
      myUser: null,
      hideDialog: () => { },
      fetchMyUser: () => { },
      updateMyUser: () => { },
      fetchNotificationSettings: () => { },
      updateNotificationSettings: () => { },
    }
    const enzymeWrapper = shallow(<ProfileEditionContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ProfileEditionDialogComponent), 1, 'The corresponding component should be rendered')

    // child should be unmounted when not visible
    enzymeWrapper.setProps({
      ...props,
      visible: false,
    })
    assert.lengthOf(enzymeWrapper.find(ProfileEditionDialogComponent), 0, 'The child should be unmounted for fields to reset')
  })
})
