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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { SettingsTextField, SettingsArrayField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SettingsComponent } from '../../src/components/SettingsComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SettingsComponent
 * @author Théo Lasserre
 */
describe('[ADMIN LTA MANAGEMENT] Testing SettingsComponent', () => {
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
            name: 'success_expiration_in_hours',
            description: '',
            value: 1,
            defaultValue: 24,
          },
        },
        1: {
          content: {
            name: 'storage',
            description: '',
            value: 'LTA',
            defaultValue: 'LTA',
          },
        },
        2: {
          content: {
            name: 'datatypes',
            description: '',
            value: [
              {
                name: 'DATA',
                model: 'testModel',
                storePath: 'testPath',
              },
            ],
            defaultValue: [],
          },
        },
      },
      onBack: () => { },
      onSubmit: () => { },
      modelList: {},
      // from redux form
      submitting: false,
      pristine: false,
      invalid: false,
      initialize: () => { },
      handleSubmit: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<SettingsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SettingsTextField), 2, 'There should be 2 SettingsTextField')
    assert.lengthOf(enzymeWrapper.find(SettingsArrayField), 1, 'There should be 1 SettingsArrayField')
  })
})
