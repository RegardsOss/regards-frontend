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
import {
  Field,
} from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SettingsComponent } from '../../src/components/SettingsComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SettingsComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing SettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SettingsComponent)
  })
  it('should render correctly', () => {
    const props = {
      settings: {
        0: {
          content: {
            name: 'active_notifications',
            description: '',
            value: true,
            defaultValue: true,
          },
        },
        1: {
          content: {
            name: 'last_dump_req_date',
            description: '',
            value: '24/02/2021',
            defaultValue: '24/02/2021',
          },
        },
        2: {
          content: {
            name: 'dump_parameters',
            description: '',
            value: {
              isActiveModule: true,
              cronTrigger: '',
              dumpLocation: '',
            },
            defaultValue: {
              isActiveModule: true,
              cronTrigger: '',
              dumpLocation: '',
            },
          },
        },
      },
      onBack: () => { },
      onSubmit: () => { },
      // from redux form
      submitting: false,
      pristine: false,
      invalid: false,
      initialize: () => { },
      handleSubmit: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<SettingsComponent {...props} />, { context })
    const fieldsWrapper = enzymeWrapper.find(Field)
    assert.lengthOf(fieldsWrapper, 5, 'There should be 5 Fields')
  })
})
