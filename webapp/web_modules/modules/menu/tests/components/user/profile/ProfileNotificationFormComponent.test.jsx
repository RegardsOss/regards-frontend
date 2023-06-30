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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import { ProfileNotificationFormComponent } from '../../../../src/components/user/profile/ProfileNotificationFormComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ProfileNotificationFormComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing ProfileNotificationFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileNotificationFormComponent)
  })

  const testCases = [{
    label: 'with common frequency: DAILY',
    frequency: 'DAILY',
    expectCustomFields: false,
  }, {
    label: 'with common frequency: WEEKLY',
    frequency: 'WEEKLY',
    expectCustomFields: false,
  }, {
    label: 'with common frequency: MONTHLY',
    frequency: 'MONTHLY',
    expectCustomFields: false,
  }, {
    label: 'with parametrized frequency: CUSTOM',
    frequency: 'CUSTOM',
    expectCustomFields: true,
  }]

  testCases.forEach(({ label, frequency, expectCustomFields }) => it(`should render correctly ${label}`, () => {
    const props = {
      // submit function
      onEdit: () => {},
      notificationSettings: {
        id: 1,
        days: 22,
        hours: 10,
        frequency,
      },
      pristine: true,
      submitting: false,
      invalid: true,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<ProfileNotificationFormComponent {...props} />, { context })
    const fields = enzymeWrapper.find(Field)
    // Fields: always displayed (parent showable controls display)
    assert.lengthOf(fields.findWhere((n) => n.props().name === 'frequency'), 1, 'Frequency field should be displayed')
    assert.lengthOf(fields.findWhere((n) => n.props().name === 'days'), 1, 'Days field should be displayed')
    assert.lengthOf(fields.findWhere((n) => n.props().name === 'hours'), 1, 'hours field should be displayed')
    // Check days and hours are shown only when in custom frequency
    const showable = enzymeWrapper.find(ShowableAtRender)
    if (expectCustomFields) {
      assert.isTrue(showable.props().show, 'Custom fields should be displayed')
    } else {
      assert.isFalse(showable.props().show, 'Custom fields should be hidden')
    }
  }))
})
