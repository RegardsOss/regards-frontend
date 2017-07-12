/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FieldArray } from '@regardsoss/form-utils'
import ModuleForm from '../../../src/components/admin/ModuleForm'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'
import SelectedLevelFormRender from '../../../src/components/admin/SelectedLevelFormRender'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ModuleForm', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleForm)
  })

  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      adminForm: {
        changeField: () => { },
        form: {
          conf: {
            graphDatasetAttributes: [],
          },
        },
      },
      collectionModels: {},
      selectableAttributes: {},
    }
    const enzymeWrapper = shallow(<ModuleForm {...props} />, { context })
    assert.equal(enzymeWrapper.find(SearchResultForm).length, 1, 'The search result configuration form should be used to configure search results')
    // test render component in array
    const field = enzymeWrapper.find(FieldArray)
    assert.equal(field.length, 1, 'There should be a field for levels')
    assert.equal(field.at(0).props().component, SelectedLevelFormRender, 'The render used should be the specific levels render')
  })
})
