/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StorageSettingsComponent } from '../../src/components/StorageSettingsComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageSettingsComponent
 * @author Théo Lasserre
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing StorageSettingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageSettingsComponent)
  })
  it('should render correctly', () => {
    const props = {
      settings: {
        0: {
          content: {
            name: 'store_files',
            description: '',
            value: false,
            defaultValue: false,
          },
        },
        1: {
          content: {
            name: 'storage_location',
            description: '',
            value: 'C:/dossier1/dossier2/',
            defaultValue: 'C:/dossier1/dossier2/',
          },
        },
        2: {
          content: {
            name: 'storage_sub_directory',
            description: '',
            value: 'test',
            defaultValue: 'test',
          },
        },
      },
      storages: [],
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
    const enzymeWrapper = shallow(<StorageSettingsComponent {...props} />, { context })
    const fieldsWrapper = enzymeWrapper.find(Field)
    assert.lengthOf(fieldsWrapper, 3, 'There should be 3 Field component')
  })
})
